// src/extension.ts

import * as vscode from 'vscode';
import { GoogleGenerativeAI } from '@google/generative-ai';

//--- BIẾN TOÀN CỤC (GLOBAL VARIABLES) ---
let genAI: GoogleGenerativeAI | undefined;
let model: any | null = null;
let dashboardPanel: vscode.WebviewPanel | undefined = undefined;

//--- GIAO DIỆN VÀ CÁC HÀM HỖ TRỢ QUẢN LÝ TASK ---
interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'inprogress' | 'done';
    priority: 'low' | 'medium' | 'high';
}

/**
 * Lấy danh sách task và đảm bảo mọi task đều có giá trị mặc định.
 */
function getTasks(context: vscode.ExtensionContext): Task[] {
    const tasks = context.workspaceState.get<Task[]>('geminiTasks', []);
    
    return tasks.map(task => {
        const defaults = {
            description: '',
            priority: 'medium',
            status: 'todo'
        };
        return { ...defaults, ...task };
    });
}


/**
 * Chỉ chịu trách nhiệm lưu trữ task vào workspaceState.
 */
function saveTasks(context: vscode.ExtensionContext, tasks: Task[]) {
    tasks.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        const priorityA = a.priority || 'medium';
        const priorityB = b.priority || 'medium';
        return priorityOrder[priorityA] - priorityOrder[priorityB];
    });
    context.workspaceState.update('geminiTasks', tasks);
}

//--- HÀM KÍCH HOẠT EXTENSION ---
export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "gemini-code-assistant" is now active!');

    // Khởi tạo Gemini API
    const apiKey = vscode.workspace.getConfiguration('geminiCodeAssistant').get<string>('apiKey');
    if (apiKey) {
        try {
            genAI = new GoogleGenerativeAI(apiKey);
            model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        } catch (error) {
            console.error("Error initializing GoogleGenerativeAI:", error);
            vscode.window.showErrorMessage(`Failed to initialize Gemini API. Check your API Key.`);
        }
    } else {
        vscode.window.showErrorMessage('Gemini API Key not set. Please go to VS Code Settings to set it.');
    }
    
    const disposables = [
        vscode.commands.registerCommand('gemini-code-assistant.generateCode', async () => {
            if (!model) { return vscode.window.showErrorMessage('Gemini API is not initialized.'); }
            const editor = vscode.window.activeTextEditor;
            if (!editor) { return vscode.window.showInformationMessage('No active text editor found.'); }
            const selectedText = editor.document.getText(editor.selection);
            if (!selectedText) { return vscode.window.showInformationMessage('Please select some text to generate code from.'); }

            await vscode.window.withProgress({ location: vscode.ProgressLocation.Notification, title: "Generating code with Gemini..." }, async () => {
                try {
                    const prompt = `Generate code based on the following context/description:\n\n${selectedText}\n\nProvide only the code block.`;
                    const result = await model.generateContent(prompt);
                    const response = await result.response;
                    const generatedText = response.text();
                    const codeMatch = generatedText.match(/```(?:\w+)?\n([\s\S]*?)\n```/);
                    const codeToInsert = codeMatch ? codeMatch[1] : generatedText;
                    editor.edit(editBuilder => editBuilder.replace(editor.selection, codeToInsert));
                } catch (error: any) {
                    vscode.window.showErrorMessage(`Failed to generate code: ${error.message}`);
                    console.error("Gemini API Call Error:", error);
                }
            });
        }),

        vscode.commands.registerCommand('gemini-code-assistant.showDashboard', () => {
            if (dashboardPanel) {
                return dashboardPanel.reveal(vscode.ViewColumn.Two);
            }

            dashboardPanel = vscode.window.createWebviewPanel('taskDashboard', 'Project Dashboard', vscode.ViewColumn.Two, { enableScripts: true, retainContextWhenHidden: true });
            dashboardPanel.onDidDispose(() => { dashboardPanel = undefined; }, null, context.subscriptions);
            dashboardPanel.webview.html = getWebviewContent(dashboardPanel.webview);
            dashboardPanel.webview.postMessage({ command: 'loadTasks', tasks: getTasks(context) });

            dashboardPanel.webview.onDidReceiveMessage(message => {
                const tasks = getTasks(context);
                let updatedTasks = [...tasks];

                switch (message.command) {
                    case 'addTask':
                        const newTask: Task = { id: `task-${Date.now()}`, title: message.title, description: '', status: 'todo', priority: 'medium' };
                        updatedTasks.push(newTask);
                        break;
                    case 'updateTaskStatus':
                        const taskToUpdateStatus = updatedTasks.find(t => t.id === message.taskId);
                        if (taskToUpdateStatus) { taskToUpdateStatus.status = message.newStatus; }
                        break;
                    case 'deleteTask':
                        updatedTasks = updatedTasks.filter(t => t.id !== message.taskId);
                        break;
                    case 'updateTaskPriority':
                        const taskToUpdatePriority = updatedTasks.find(t => t.id === message.taskId);
                        if (taskToUpdatePriority) { taskToUpdatePriority.priority = message.newPriority; }
                        break;
                }
                
                saveTasks(context, updatedTasks);
                if (dashboardPanel) {
                    dashboardPanel.webview.postMessage({ command: 'loadTasks', tasks: updatedTasks });
                }
            }, undefined, context.subscriptions);
        }),

        vscode.commands.registerCommand('gemini-code-assistant.generateTasksFromOverview', async () => {
            if (!model) { return vscode.window.showErrorMessage('Gemini API is not initialized.'); }
            const editor = vscode.window.activeTextEditor;
            let overviewText = editor?.document.getText(editor.selection);
            if (!overviewText) {
                overviewText = await vscode.window.showInputBox({ prompt: "Enter a project overview or a feature description", placeHolder: "e.g., Build a user login feature with email and password" });
            }
            if (!overviewText) { return; }

            await vscode.window.withProgress({ location: vscode.ProgressLocation.Notification, title: "Gemini is creating tasks..." }, async () => {
                try {
                    const prompt = `Based on the following project overview, break it down into smaller, actionable tasks. Return the result as a JSON array of objects, where each object has a "title" and a "description". Provide ONLY the JSON array, without any other text or markdown formatting. Overview: "${overviewText}"\nJSON Output:`;
                    const result = await model.generateContent(prompt);
                    const responseText = result.response.text();
                    const jsonMatch = responseText.match(/\[\s*\{[\s\S]*\}\s*\]/);
                    if (!jsonMatch) { throw new Error("Could not find a valid JSON array in the Gemini response."); }
                    
                    const newTasks: { title: string, description: string }[] = JSON.parse(jsonMatch[0]);
                    const currentTasks = getTasks(context);
                    const tasksToAdd: Task[] = newTasks.map(t => ({ id: `task-${Date.now()}-${Math.random()}`, title: t.title, description: t.description || '', status: 'todo', priority: 'medium' }));
                    const allTasks = [...currentTasks, ...tasksToAdd];

                    saveTasks(context, allTasks);
                    vscode.window.showInformationMessage(`${tasksToAdd.length} new tasks have been added.`);
                    if (dashboardPanel) {
                        dashboardPanel.webview.postMessage({ command: 'loadTasks', tasks: allTasks });
                    }
                } catch (error: any) {
                    vscode.window.showErrorMessage(`Failed to generate tasks: ${error.message}`);
                    console.error("Error generating tasks with Gemini:", error);
                }
            });
        })
    ];

    context.subscriptions.push(...disposables);
}

export function deactivate() {}

function getWebviewContent(webview: vscode.Webview): string {
    const nonce = Array.from({ length: 32 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('');
    
    const csp = `default-src 'none'; script-src 'nonce-${nonce}' https://cdn.tailwindcss.com; style-src ${webview.cspSource} 'unsafe-inline'; font-src ${webview.cspSource}; img-src ${webview.cspSource} https:;`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="${csp}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Project Dashboard</title>
    <style>
        body { background-color: var(--vscode-editor-background); color: var(--vscode-editor-foreground); font-family: var(--vscode-font-family); }
        .kanban-column { background-color: var(--vscode-side-bar-background); }
        .task-card { background-color: var(--vscode-editor-widget-background); border: 1px solid var(--vscode-widget-border, transparent); }
        .task-card:hover { background-color: var(--vscode-list-hover-background); }
        input[type="text"] { background-color: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border); }
        button, select { background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); border: 1px solid var(--vscode-button-border, transparent); }
        button:hover, select:hover { background-color: var(--vscode-button-hover-background); }
    </style>
</head>
<body class="p-4">
    <div class="dashboard-container space-y-4">
        <div class="header p-4 rounded-lg shadow-md">
            <h1 class="text-2xl font-bold mb-4">Project Kanban</h1>
            <div class="add-task-form flex gap-2">
                <input type="text" id="newTaskInput" class="flex-grow p-2 rounded-md" placeholder="Add a new task and press Enter...">
                <button id="addTaskBtn" class="px-4 py-2 rounded-md font-semibold">Add Task</button>
            </div>
        </div>
        <div id="kanban-board" class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="kanban-column rounded-lg p-3" data-status="todo"><h2 class="text-lg font-bold mb-3 px-1">To Do</h2><div class="column-tasks space-y-3 min-h-[200px]"></div></div>
            <div class="kanban-column rounded-lg p-3" data-status="inprogress"><h2 class="text-lg font-bold mb-3 px-1">In Progress</h2><div class="column-tasks space-y-3 min-h-[200px]"></div></div>
            <div class="kanban-column rounded-lg p-3" data-status="done"><h2 class="text-lg font-bold mb-3 px-1">Done</h2><div class="column-tasks space-y-3 min-h-[200px]"></div></div>
        </div>
    </div>
    <script nonce="${nonce}">
        (function() {
            const vscode = acquireVsCodeApi();
            
            // **FIXED: Sửa lại CSS selector để tìm đúng phần tử**
            const columns = {
                todo: document.querySelector('[data-status="todo"] .column-tasks'),
                inprogress: document.querySelector('[data-status="inprogress"] .column-tasks'),
                done: document.querySelector('[data-status="done"] .column-tasks')
            };

            const priorityStyles = {
                high: { badge: 'bg-red-500 text-white', border: 'border-red-500' },
                medium: { badge: 'bg-yellow-500 text-black', border: 'border-yellow-500' },
                low: { badge: 'bg-green-500 text-white', border: 'border-green-500' }
            };

            function createTaskElement(task) {
                const card = document.createElement('div');
                const pStyles = priorityStyles[task.priority] || priorityStyles.medium;
                card.className = \`task-card p-3 rounded-lg shadow-sm cursor-grab flex flex-col gap-2 border-l-4 \${pStyles.border}\`;
                card.dataset.taskId = task.id;
                card.draggable = true;
                card.innerHTML = \`
                    <div class="flex justify-between items-start">
                        <p class="font-semibold break-words pr-2">\${task.title || 'Untitled Task'}</p>
                        <button class="delete-task-btn text-gray-400 hover:text-red-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" /></svg></button>
                    </div>
                    <div class="flex items-center justify-between text-xs">
                        <span class="px-2 py-0.5 rounded-full font-medium \${pStyles.badge}">\${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
                        <select class="priority-select p-1 rounded-md">
                            <option value="low" \${task.priority === 'low' ? 'selected' : ''}>Low</option>
                            <option value="medium" \${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="high" \${task.priority === 'high' ? 'selected' : ''}>High</option>
                        </select>
                    </div>\`;
                return card;
            }

            function renderTasks(tasks) {
                Object.values(columns).forEach(col => {
                    if (col) { col.innerHTML = ''; }
                });

                if (!tasks) return;
                
                tasks.forEach(task => {
                    if (task && task.status && columns[task.status]) {
                        try {
                            const taskElement = createTaskElement(task);
                            columns[task.status].appendChild(taskElement);
                        } catch(e) {
                            console.error('Failed to create task element for:', task, e);
                        }
                    }
                });
            }
            
            window.addEventListener('message', event => {
                if (event.data.command === 'loadTasks') {
                    renderTasks(event.data.tasks);
                }
            });

            const addTaskBtn = document.getElementById('addTaskBtn');
            const newTaskInput = document.getElementById('newTaskInput');
            function handleAddTask() {
                if (newTaskInput.value) {
                    vscode.postMessage({ command: 'addTask', title: newTaskInput.value });
                    newTaskInput.value = '';
                }
            }
            addTaskBtn.addEventListener('click', handleAddTask);
            newTaskInput.addEventListener('keypress', (e) => e.key === 'Enter' && handleAddTask());

            const board = document.getElementById('kanban-board');
            board.addEventListener('click', (e) => {
                const target = e.target.closest('.delete-task-btn');
                if (target) {
                    const taskCard = target.closest('.task-card');
                    if (taskCard) vscode.postMessage({ command: 'deleteTask', taskId: taskCard.dataset.taskId });
                }
            });
            board.addEventListener('change', (e) => {
                const target = e.target.closest('.priority-select');
                if (target) {
                    const taskCard = target.closest('.task-card');
                    if (taskCard) vscode.postMessage({ command: 'updateTaskPriority', taskId: taskCard.dataset.taskId, newPriority: target.value });
                }
            });
            
            let draggedTaskId = null;
            board.addEventListener('dragstart', e => {
                const card = e.target.closest('.task-card');
                if (card) { draggedTaskId = card.dataset.taskId; e.target.classList.add('opacity-50'); }
            });
            board.addEventListener('dragend', e => {
                const card = e.target.closest('.task-card');
                if(card) { card.classList.remove('opacity-50'); }
                draggedTaskId = null; 
            });
            Object.values(columns).forEach(column => {
                if (!column) return; // Thêm kiểm tra null ở đây
                const colEl = column.parentElement;
                colEl.addEventListener('dragover', e => { e.preventDefault(); colEl.classList.add('bg-blue-500', 'bg-opacity-20'); });
                colEl.addEventListener('dragleave', e => { colEl.classList.remove('bg-blue-500', 'bg-opacity-20'); });
                colEl.addEventListener('drop', e => {
                    e.preventDefault();
                    colEl.classList.remove('bg-blue-500', 'bg-opacity-20');
                    if (draggedTaskId) {
                        vscode.postMessage({ command: 'updateTaskStatus', taskId: draggedTaskId, newStatus: colEl.dataset.status });
                    }
                });
});
        }());
    </script>
</body>
</html>`;
}