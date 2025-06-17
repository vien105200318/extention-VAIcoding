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
// Khai báo biến này ở phạm vi toàn cục hoặc ngoài hàm activate
// để nó có thể được gán giá trị và sử dụng trong hàm command
let genAI;
let model = null; // Dùng 'any' tạm thời cho đến khi có kiểu rõ ràng hơn
function activate(context) {
    // Dòng này phải xuất hiện trong Console khi extension được kích hoạt
    console.log('Congratulations, your extension "gemini-code-assistant" is now active!');
    // Lấy API Key từ cấu hình VS Code
    // Lỗi ở đây: .get() phải truyền vào TÊN CỦA THUỘC TÍNH CÀI ĐẶT ("apiKey"), không phải giá trị API Key.
    const apiKey = vscode.workspace.getConfiguration('geminiCodeAssistant').get('apiKey');
    // Kiểm tra và khởi tạo API chỉ khi có API Key
    if (apiKey) {
        try {
            genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
            model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Khởi tạo model khi có API Key
            console.log("Gemini API and model initialized successfully.");
        }
        catch (error) {
            console.error("Error initializing GoogleGenerativeAI:", error);
            vscode.window.showErrorMessage(`Failed to initialize Gemini API. Check your API Key and console for details: ${error}`);
            // Đặt genAI và model về undefined/null nếu có lỗi khởi tạo
            genAI = undefined;
            model = null;
        }
    }
    else {
        // Chỉ hiển thị thông báo lỗi, không return sớm để lệnh vẫn được đăng ký
        vscode.window.showErrorMessage('Gemini API Key not set. Please go to VS Code Settings -> Extensions -> Gemini Code Assistant to set your API Key.');
    }
    // Đăng ký lệnh VÔ ĐIỀU KIỆN - Lệnh này PHẢI được đăng ký để luôn xuất hiện trong Command Palette
    let disposable = vscode.commands.registerCommand('gemini-code-assistant.generateCode', async () => {
        // Logic kiểm tra API Key và model sẽ nằm BÊN TRONG hàm này
        // để đảm bảo lệnh luôn có thể được chọn từ Command Palette
        if (!apiKey) {
            vscode.window.showErrorMessage('Gemini API Key is missing. Please set it in VS Code Settings (Ctrl+,).');
            return; // Dừng thực thi lệnh nếu thiếu API Key
        }
        if (!genAI || !model) {
            vscode.window.showErrorMessage('Gemini API or model not initialized. Check your API Key and console for errors.');
            return; // Dừng thực thi lệnh nếu API không khởi tạo được
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
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Generating code with Gemini...",
            cancellable: false
        }, async (progress) => {
            try {
                // Thêm debug log trước khi gọi API
                console.log("Calling Gemini API with prompt:", selectedText);
                const prompt = `Generate code based on the following context/description:\n\n${selectedText}\n\nProvide only the code block.`;
                const result = await model.generateContent(prompt);
                const response = await result.response;
                const generatedText = response.text();
                // Kiểm tra và trích xuất khối code
                const codeMatch = generatedText.match(/```(?:\w+)?\n([\s\S]*?)\n```/);
                const codeToInsert = codeMatch ? codeMatch[1] : generatedText;
                editor.edit(editBuilder => {
                    editBuilder.replace(selection, codeToInsert);
                });
                vscode.window.showInformationMessage('Code generated successfully!');
                console.log("Code generated successfully!");
            }
            catch (error) {
                vscode.window.showErrorMessage(`Failed to generate code: ${error.message}`);
                console.error("Gemini API Call Error:", error); // Log lỗi chi tiết hơn
            }
        });
    });
    // Thêm disposable vào context để lệnh được quản lý đúng cách
    context.subscriptions.push(disposable);
}
function deactivate() {
    // Thực hiện dọn dẹp tài nguyên khi extension bị deactivate
    console.log('Gemini Code Assistant is deactivating.');
}
//# sourceMappingURL=extension.js.map