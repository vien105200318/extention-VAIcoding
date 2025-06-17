"use strict";
// src/extension.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const generative_ai_1 = require("@google/generative-ai");
//--- GLOBAL VARIABLES ---
let genAI;
let model = null;
let dashboardPanel = undefined;
function getTasks(context) {
    return context.workspaceState.get('geminiTasks', []);
}
function saveTasks(context, tasks) {
    context.workspaceState.update('geminiTasks', tasks);
    // If the dashboard is open, send it the updated list of tasks
    if (dashboardPanel) {
        dashboardPanel.webview.postMessage({ command: 'loadTasks', tasks: tasks });
    }
}
//--- EXTENSION ACTIVATION ---
function activate(context) {
    console.log('Congratulations, your extension "gemini-code-assistant" is now active!');
    // Initialize Gemini API
    const apiKey = vscode.workspace.getConfiguration('geminiCodeAssistant').get('apiKey');
    if (apiKey) {
        try {
            genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
            model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            console.log("Gemini API and model initialized successfully.");
        }
        catch (error) {
            console.error("Error initializing GoogleGenerativeAI:", error);
            vscode.window.showErrorMessage(`Failed to initialize Gemini API. Check your API Key.`);
        }
    }
    else {
        vscode.window.showErrorMessage('Gemini API Key not set. Please go to VS Code Settings to set it.');
    }
    //--- COMMAND 1: GENERATE CODE ---
    const generateCodeDisposable = vscode.commands.registerCommand('gemini-code-assistant.generateCode', async () => {
        // ... (Nội dung hàm này không thay đổi)
        if (!model) {
            vscode.window.showErrorMessage('Gemini API is not initialized.');
            return;
        }
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No active text editor found.');
            return;
        }
        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);
        if (!selectedText) {
            vscode.window.showInformationMessage('Please select some text to generate code from.');
            return;
        }
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Generating code with Gemini...",
            cancellable: false
        }, async () => {
            try {
                const prompt = `Generate code based on the following context/description:\n\n${selectedText}\n\nProvide only the code block.`;
                const result = await model.generateContent(prompt);
                const response = await result.response;
                const generatedText = response.text();
                const codeMatch = generatedText.match(/```(?:\w+)?\n([\s\S]*?)\n```/);
                const codeToInsert = codeMatch ? codeMatch[1] : generatedText;
                editor.edit(editBuilder => {
                    editBuilder.replace(selection, codeToInsert);
                });
            }
            catch (error) {
                vscode.window.showErrorMessage(`Failed to generate code: ${error.message}`);
                console.error("Gemini API Call Error:", error);
            }
        });
    });
    //--- COMMAND 2: SHOW TASK DASHBOARD ---
    const showDashboardDisposable = vscode.commands.registerCommand('gemini-code-assistant.showDashboard', () => {
        // ... (Nội dung hàm này không thay đổi)
        if (dashboardPanel) {
            dashboardPanel.reveal(vscode.ViewColumn.Two);
            return;
        }
        dashboardPanel = vscode.window.createWebviewPanel('taskDashboard', 'Project Dashboard', vscode.ViewColumn.Two, { enableScripts: true, retainContextWhenHidden: true });
        dashboardPanel.onDidDispose(() => { dashboardPanel = undefined; }, null, context.subscriptions);
        dashboardPanel.webview.html = getWebviewContent();
        dashboardPanel.webview.postMessage({ command: 'loadTasks', tasks: getTasks(context) });
        dashboardPanel.webview.onDidReceiveMessage(message => {
            const tasks = getTasks(context);
            switch (message.command) {
                case 'addTask':
                    const newTask = {
                        id: `task-${Date.now()}`,
                        title: message.title,
                        description: '',
                        status: 'todo'
                    };
                    saveTasks(context, [...tasks, newTask]);
                    break;
                case 'updateTaskStatus':
                    const taskToUpdate = tasks.find(t => t.id === message.taskId);
                    if (taskToUpdate) {
                        taskToUpdate.status = message.newStatus;
                        saveTasks(context, tasks);
                    }
                    break;
            }
        }, undefined, context.subscriptions);
    });
    //--- COMMAND 3: GENERATE TASKS FROM OVERVIEW (ĐÃ SỬA LỖI) ---
    const generateTasksDisposable = vscode.commands.registerCommand('gemini-code-assistant.generateTasksFromOverview', async () => {
        if (!model) {
            vscode.window.showErrorMessage('Gemini API is not initialized.');
            return;
        }
        const editor = vscode.window.activeTextEditor;
        let overviewText = editor?.document.getText(editor.selection);
        if (!overviewText) {
            overviewText = await vscode.window.showInputBox({
                prompt: "Enter a project overview or a feature description",
                placeHolder: "e.g., Build a user login feature with email and password"
            });
        }
        if (!overviewText) {
            return;
        }
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Gemini is creating tasks...",
            cancellable: false
        }, async () => {
            try {
                const prompt = `
                    Based on the following project overview, break it down into smaller, actionable tasks.
                    Return the result as a JSON array of objects, where each object has a "title" and a "description".
                    Provide ONLY the JSON array, without any other text or markdown formatting.
                    Overview: "${overviewText}"
                    JSON Output:
                `;
                const result = await model.generateContent(prompt);
                const responseText = result.response.text();
                // --- FIX: Cải thiện xử lý JSON từ Gemini ---
                let newTasks;
                try {
                    // 1. Dùng Regex để tìm và trích xuất chuỗi JSON từ response
                    const jsonMatch = responseText.match(/\[\s*\{[\s\S]*\}\s*\]/);
                    if (!jsonMatch || jsonMatch.length === 0) {
                        throw new Error("Could not find a valid JSON array in the Gemini response.");
                    }
                    const jsonString = jsonMatch[0];
                    // 2. Parse chuỗi JSON đã được trích xuất
                    newTasks = JSON.parse(jsonString);
                }
                catch (e) {
                    console.error("Failed to parse Gemini response:", responseText);
                    vscode.window.showErrorMessage("Gemini returned an invalid format. Please try again.");
                    return;
                }
                // --- KẾT THÚC PHẦN FIX ---
                const currentTasks = getTasks(context);
                const tasksToAdd = newTasks.map(t => ({
                    id: `task-${Date.now()}-${Math.random()}`,
                    title: t.title,
                    description: t.description || '',
                    status: 'todo'
                }));
                saveTasks(context, [...currentTasks, ...tasksToAdd]);
                vscode.window.showInformationMessage(`${tasksToAdd.length} new tasks have been added.`);
            }
            catch (error) {
                console.error("Error generating tasks with Gemini:", error);
                vscode.window.showErrorMessage(`Failed to generate tasks: ${error.message}`);
            }
        });
    });
    context.subscriptions.push(generateCodeDisposable, showDashboardDisposable, generateTasksDisposable);
}
function deactivate() { }
//--- WEBVIEW CONTENT (Không thay đổi) ---
function getWebviewContent() {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Project Dashboard</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                background-color: var(--vscode-editor-background);
                color: var(--vscode-editor-foreground);
                margin: 0;
                padding: 0;
            }
            .dashboard-container { display: flex; flex-direction: column; height: 100vh; }
            .header { padding: 10px 20px; border-bottom: 1px solid var(--vscode-side-bar-border, #ccc); }
            .header h1 { margin: 0; font-size: 18px; }
            .kanban-board { display: flex; flex-grow: 1; padding: 15px; gap: 15px; overflow-x: auto; }
            .kanban-column { flex: 1 0 280px; min-width: 280px; background-color: var(--vscode-side-bar-background); border-radius: 5px; display: flex; flex-direction: column; }
            .column-header { padding: 10px; font-weight: bold; border-bottom: 1px solid var(--vscode-side-bar-border, #ccc); }
            .column-tasks { padding: 10px; flex-grow: 1; min-height: 100px; }
            .task-card { background-color: var(--vscode-editor-widget-background); border: 1px solid var(--vscode-widget-border, #ccc); border-radius: 4px; padding: 10px; margin-bottom: 8px; cursor: grab; }
            .task-card:hover { background-color: var(--vscode-list-hover-background); }
            .task-card.dragging { opacity: 0.5; }
            .add-task-form { display: flex; padding: 10px; gap: 8px; }
            .add-task-form input { width: 100%; background-color: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border); border-radius: 3px; padding: 5px; }
            .add-task-form button { white-space: nowrap; background-color: var(--vscode-button-background); color: var(--vscode-button-foreground); border: none; border-radius: 3px; padding: 5px 10px; cursor: pointer; }
            .add-task-form button:hover { background-color: var(--vscode-button-hover-background); }
        </style>
    </head>
    <body>
        <div class="dashboard-container">
            <div class="header">
                <h1>Project Kanban</h1>
                <div class="add-task-form">
                    <input type="text" id="newTaskInput" placeholder="Add a new task...">
                    <button id="addTaskBtn">Add Task</button>
                </div>
            </div>
            <div class="kanban-board">
                <div class="kanban-column" id="col-todo">
                    <div class="column-header">To Do</div>
                    <div class="column-tasks" data-status="todo"></div>
                </div>
                <div class="kanban-column" id="col-inprogress">
                    <div class="column-header">In Progress</div>
                    <div class="column-tasks" data-status="inprogress"></div>
                </div>
                <div class="kanban-column" id="col-done">
                    <div class="column-header">Done</div>
                    <div class="column-tasks" data-status="done"></div>
                </div>
            </div>
        </div>
        <script>
            const vscode = acquireVsCodeApi();
            const columns = {
                todo: document.querySelector('.column-tasks[data-status="todo"]'),
                inprogress: document.querySelector('.column-tasks[data-status="inprogress"]'),
                done: document.querySelector('.column-tasks[data-status="done"]')
            };

            function renderTasks(tasks) {
                Object.values(columns).forEach(col => col.innerHTML = '');
                tasks.forEach(task => {
                    const taskCard = document.createElement('div');
                    taskCard.className = 'task-card';
                    taskCard.textContent = task.title;
                    taskCard.draggable = true;
                    taskCard.dataset.taskId = task.id;
                    columns[task.status].appendChild(taskCard);
                });
            }

            window.addEventListener('message', event => {
                if (event.data.command === 'loadTasks') {
                    renderTasks(event.data.tasks);
                }
            });
            
            document.getElementById('addTaskBtn').addEventListener('click', () => {
                const input = document.getElementById('newTaskInput');
                if (input.value) {
                    vscode.postMessage({ command: 'addTask', title: input.value });
                    input.value = '';
                }
            });

            let draggedTaskId = null;
            document.addEventListener('dragstart', e => {
                if (e.target.classList.contains('task-card')) {
                    draggedTaskId = e.target.dataset.taskId;
                    e.target.classList.add('dragging');
                }
            });
            document.addEventListener('dragend', e => {
                e.target.classList.remove('dragging');
                draggedTaskId = null;
            });
            Object.values(columns).forEach(column => {
                column.addEventListener('dragover', e => e.preventDefault());
                column.addEventListener('drop', e => {
                    e.preventDefault();
                    if (draggedTaskId) {
                         vscode.postMessage({
                            command: 'updateTaskStatus',
                            taskId: draggedTaskId,
                            newStatus: column.dataset.status
                         });
                    }
                });
            });
        </script>
    </body>
    </html>`;
}
//# sourceMappingURL=extension.js.map