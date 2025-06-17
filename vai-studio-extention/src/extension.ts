// src/extension.ts

import * as vscode from 'vscode';
import { GoogleGenerativeAI } from '@google/generative-ai';

// --- PHẦN GEMINI API (Không thay đổi) ---
let genAI: GoogleGenerativeAI | undefined;
let model: any | null = null;

// --- PHẦN QUẢN LÝ TASK (Nâng cấp lớn) ---

// 1. Định nghĩa cấu trúc Task chi tiết hơn
interface Task {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'inprogress' | 'done';
}

// Hàm để lấy danh sách task từ storage
function getTasks(context: vscode.ExtensionContext): Task[] {
    return context.workspaceState.get<Task[]>('geminiTasks', []);
}

// Hàm để lưu danh sách task vào storage
function saveTasks(context: vscode.ExtensionContext, tasks: Task[]) {
    context.workspaceState.update('geminiTasks', tasks);
}


export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "gemini-code-assistant" is now active!');

    // --- Logic khởi tạo Gemini API (giữ nguyên) ---
    const apiKey = vscode.workspace.getConfiguration('geminiCodeAssistant').get<string>('apiKey');
    if (apiKey) {
        try {
            genAI = new GoogleGenerativeAI(apiKey);
            model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            console.log("Gemini API and model initialized successfully.");
        } catch (error) {
            // ... xử lý lỗi
        }
    } else {
        // ... thông báo lỗi
    }

    // --- Command `generateCode` (giữ nguyên) ---
    const generateCodeDisposable = vscode.commands.registerCommand('gemini-code-assistant.generateCode', async () => {
        // ... code của chức năng generate
    });


    // --- Command `showDashboard` (NÂNG CẤP TOÀN DIỆN) ---
    const showDashboardDisposable = vscode.commands.registerCommand('gemini-code-assistant.showDashboard', () => {
        const panel = vscode.window.createWebviewPanel(
            'taskDashboard',
            'Project Dashboard',
            vscode.ViewColumn.Two,
            {
                enableScripts: true,
                // Giữ lại state của webview ngay cả khi nó không hiển thị
                retainContextWhenHidden: true,
            }
        );

        // Render giao diện lần đầu
        panel.webview.html = getWebviewContent();

        // Gửi dữ liệu task ban đầu cho webview
        panel.webview.postMessage({ command: 'loadTasks', tasks: getTasks(context) });


        // Xử lý các thông điệp từ webview (dashboard)
        panel.webview.onDidReceiveMessage(
            message => {
                const tasks = getTasks(context);
                switch (message.command) {
                    case 'addTask':
                        const newTask: Task = {
                            id: `task-${Date.now()}`,
                            title: message.title,
                            description: '',
                            status: 'todo'
                        };
                        tasks.push(newTask);
                        saveTasks(context, tasks);
                        // Gửi lại danh sách đã cập nhật
                        panel.webview.postMessage({ command: 'loadTasks', tasks: tasks });
                        return;

                    case 'updateTaskStatus':
                        const { taskId, newStatus } = message;
                        const taskToUpdate = tasks.find(t => t.id === taskId);
                        if (taskToUpdate) {
                            taskToUpdate.status = newStatus;
                            saveTasks(context, tasks);
                            // Thông báo cho webview là đã cập nhật thành công (không cần gửi lại toàn bộ list)
                            // Nhưng để đơn giản, chúng ta vẫn gửi lại toàn bộ
                             panel.webview.postMessage({ command: 'loadTasks', tasks: tasks });
                        }
                        return;
                }
            },
            undefined,
            context.subscriptions
        );
    });

    context.subscriptions.push(generateCodeDisposable, showDashboardDisposable);
}

export function deactivate() {}

// 2. Hàm getWebviewContent được viết lại hoàn toàn cho giao diện Kanban
function getWebviewContent(): string {
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
            .dashboard-container {
                display: flex;
                flex-direction: column;
                height: 100vh;
            }
            .header {
                padding: 10px 20px;
                border-bottom: 1px solid var(--vscode-side-bar-border, #ccc);
            }
            .header h1 {
                margin: 0;
                font-size: 18px;
            }
            .kanban-board {
                display: flex;
                flex-grow: 1;
                padding: 15px;
                gap: 15px;
                overflow-x: auto;
            }
            .kanban-column {
                flex: 1 0 280px; /* flex-grow, flex-shrink, flex-basis */
                min-width: 280px;
                background-color: var(--vscode-side-bar-background);
                border-radius: 5px;
                display: flex;
                flex-direction: column;
            }
            .column-header {
                padding: 10px;
                font-weight: bold;
                border-bottom: 1px solid var(--vscode-side-bar-border, #ccc);
            }
            .column-tasks {
                padding: 10px;
                flex-grow: 1;
                min-height: 100px; /* Cho phép drop vào cột rỗng */
            }
            .task-card {
                background-color: var(--vscode-editor-widget-background);
                border: 1px solid var(--vscode-widget-border, #ccc);
                border-radius: 4px;
                padding: 10px;
                margin-bottom: 8px;
                cursor: grab;
            }
            .task-card:hover {
                background-color: var(--vscode-list-hover-background);
            }
            .task-card.dragging {
                opacity: 0.5;
            }
            .add-task-form {
                display: flex;
                padding: 10px;
                gap: 8px;
            }
            .add-task-form input {
                 width: 100%;
                 background-color: var(--vscode-input-background);
                 color: var(--vscode-input-foreground);
                 border: 1px solid var(--vscode-input-border);
                 border-radius: 3px;
                 padding: 5px;
            }
            .add-task-form button {
                 white-space: nowrap;
                 background-color: var(--vscode-button-background);
                 color: var(--vscode-button-foreground);
                 border: none;
                 border-radius: 3px;
                 padding: 5px 10px;
                 cursor: pointer;
            }
             .add-task-form button:hover {
                 background-color: var(--vscode-button-hover-background);
             }
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
                // Clear all columns
                Object.values(columns).forEach(col => col.innerHTML = '');
                // Repopulate with tasks
                tasks.forEach(task => {
                    const taskCard = document.createElement('div');
                    taskCard.className = 'task-card';
                    taskCard.textContent = task.title;
                    taskCard.draggable = true;
                    taskCard.dataset.taskId = task.id;

                    columns[task.status].appendChild(taskCard);
                });
            }

            // Listen for messages from the extension
            window.addEventListener('message', event => {
                const message = event.data;
                if (message.command === 'loadTasks') {
                    renderTasks(message.tasks);
                }
            });
            
            // Handle Add Task button
            document.getElementById('addTaskBtn').addEventListener('click', () => {
                const input = document.getElementById('newTaskInput');
                if (input.value) {
                    vscode.postMessage({ command: 'addTask', title: input.value });
                    input.value = '';
                }
            });

            // --- DRAG & DROP LOGIC ---
            let draggedTaskId = null;

            document.addEventListener('dragstart', (e) => {
                if (e.target.classList.contains('task-card')) {
                    draggedTaskId = e.target.dataset.taskId;
                    e.target.classList.add('dragging');
                }
            });

            document.addEventListener('dragend', (e) => {
                if (e.target.classList.contains('task-card')) {
                    e.target.classList.remove('dragging');
                }
                draggedTaskId = null;
            });
            
            Object.values(columns).forEach(column => {
                column.addEventListener('dragover', (e) => {
                    e.preventDefault(); // Necessary to allow dropping
                });

                column.addEventListener('drop', (e) => {
                    e.preventDefault();
                    const newStatus = column.dataset.status;
                    if (draggedTaskId && newStatus) {
                         vscode.postMessage({
                            command: 'updateTaskStatus',
                            taskId: draggedTaskId,
                            newStatus: newStatus
                         });
                    }
                });
            });

        </script>
    </body>
    </html>`;
}