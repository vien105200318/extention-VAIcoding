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
const generative_ai_1 = require("@google/generative-ai"); // Ví dụ, tên package có thể khác
let genAI;
function activate(context) {
    console.log('Congratulations, your extension "gemini-code-assistant" is now active!');
    const apiKey = vscode.workspace.getConfiguration('geminiCodeAssistant').get('AIzaSyCQqrSMmVZyKwwT8s0GEhPlWwgZSc2EotU');
    if (!apiKey) {
        vscode.window.showErrorMessage('Gemini API Key not set. Please go to VS Code Settings -> Extensions -> Gemini Code Assistant to set your API Key.');
        return;
    }
    genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    let disposable = vscode.commands.registerCommand('gemini-code-assistant.generateCode', async () => {
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
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Generating code with Gemini...",
            cancellable: false
        }, async (progress) => {
            try {
                const prompt = `Generate code based on the following context/description:\n\n${selectedText}\n\nProvide only the code block.`;
                const result = await model.generateContent(prompt);
                const response = await result.response;
                const generatedText = response.text();
                // Tìm kiếm và trích xuất khối code (nếu Gemini trả về markdown code block)
                const codeMatch = generatedText.match(/```(?:\w+)?\n([\s\S]*?)\n```/);
                const codeToInsert = codeMatch ? codeMatch[1] : generatedText;
                editor.edit(editBuilder => {
                    editBuilder.replace(selection, codeToInsert);
                });
                vscode.window.showInformationMessage('Code generated successfully!');
            }
            catch (error) {
                vscode.window.showErrorMessage(`Failed to generate code: ${error.message}`);
            }
        });
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map