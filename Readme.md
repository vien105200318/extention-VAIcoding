<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>README - Gemini Code Assistant</title>
    <style>
        /* General Body Styles */
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f8f8;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
        }
        /* Container for content */
        .container {
            max-width: 960px;
            margin: 20px auto;
            padding: 20px 30px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        /* Headings */
        h1 {
            font-size: 2.2em;
            color: #2c3e50;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        h2 {
            font-size: 1.8em;
            color: #34495e;
            border-bottom: 1px solid #eee;
            padding-bottom: 8px;
            margin-top: 30px;
            margin-bottom: 15px;
        }
        h3 {
            font-size: 1.4em;
            color: #34495e;
            margin-top: 25px;
            margin-bottom: 10px;
        }
        /* Paragraphs */
        p {
            margin-bottom: 1em;
        }
        /* Lists */
        ul, ol {
            margin-bottom: 1em;
            padding-left: 25px;
        }
        ul li, ol li {
            margin-bottom: 0.5em;
        }
        /* Links */
        a {
            color: #3498db;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        /* Inline code */
        code {
            background-color: #eef2f5;
            padding: 2px 5px;
            border-radius: 4px;
            font-family: 'Consolas', 'Courier New', monospace;
            font-size: 0.9em;
        }
        /* Code blocks */
        pre {
            background-color: #2d3748; /* Dark background */
            color: #e2e8f0;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto; /* Enable horizontal scroll for long lines */
            margin-bottom: 1em;
            font-family: 'Consolas', 'Courier New', monospace;
            font-size: 0.9em;
        }
        pre code {
            background-color: transparent;
            padding: 0;
            border-radius: 0;
            color: #e2e8f0;
        }
        /* Section Separator */
        .section-separator {
            border-top: 1px solid #eee;
            margin: 40px 0;
        }
        /* Warning Box */
        .warning-box {
            background-color: #ffe0e0;
            border: 1px solid #ffb3b3;
            color: #cc0000;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .text-center {
            text-align: center;
        }
        .text-gray-600 {
            color: #666;
        }
        .text-blue-700 {
            color: #2a659a;
        }
        .text-lg {
            font-size: 1.125em;
        }
        .text-sm {
            font-size: 0.875em;
        }
        .italic {
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Gemini Code Assistant for VS Code</h1>
        <p class="text-lg text-gray-600">
            Được phát triển bởi <strong class="text-blue-700">Vai-studio</strong>
        </p>

        <!-- Placeholder for Marketplace Badges - Will not render without JS/External CSS -->
        <!--
        <div style="margin-top: 20px; margin-bottom: 20px;">
            <a href="https://marketplace.visualstudio.com/items?itemName=YourPublisher.GeminiCodeAssistant" target="_blank" style="display: inline-block; margin-right: 10px;">
                <img src="https://img.shields.io/visual-studio-marketplace/v/YourPublisher.GeminiCodeAssistant?label=Marketplace" alt="Phiên bản trên Marketplace" style="border-radius: 3px;">
            </a>
            <a href="https://marketplace.visualstudio.com/items?itemName=YourPublisher.GeminiCodeAssistant" target="_blank" style="display: inline-block;">
                <img src="https://img.shields.io/visual-studio-marketplace/i/YourPublisher.GeminiCodeAssistant" alt="Số lượt cài đặt" style="border-radius: 3px;">
            </a>
        </div>
        -->

        <div class="section-separator"></div>

        <h2>🚀 Giới thiệu chung về dự án</h2>
        <p>
            Chào mừng bạn đến với <strong>Gemini Code Assistant</strong>, một tiện ích mở rộng (extension) mạnh mẽ được thiết kế đặc biệt cho Visual Studio Code, do nhóm <strong>Vai-studio</strong> phát triển. Mục tiêu cốt lõi của chúng tôi là cách mạng hóa quy trình lập trình của bạn bằng cách tích hợp trực tiếp sức mạnh và trí tuệ của mô hình ngôn ngữ lớn <strong>Google Gemini</strong> vào trình soạn thảo mã nguồn yêu thích của bạn.
        </p>
        <p>
            Trong thế giới phát triển phần mềm hiện đại, việc tìm kiếm thông tin, viết mã lặp lại, hoặc đối mặt với các vấn đề phức tạp có thể tiêu tốn rất nhiều thời gian. Gemini Code Assistant ra đời để giải quyết những thách thức này, cung cấp một trợ lý AI đắc lực ngay trong tầm tay bạn. Dù bạn đang mắc kẹt với một đoạn mã phức tạp, cần một gợi ý nhanh, hay đơn giản là muốn tăng tốc quá trình phát triển, extension này sẽ hỗ trợ bạn một cách thông minh và hiệu quả.
        </p>
        <p>
            Với Gemini Code Assistant, bạn không chỉ có thể tạo ra các đoạn mã mới một cách thông minh dựa trên mô tả bằng ngôn ngữ tự nhiên mà còn nhận được những gợi ý quý giá và sự hỗ trợ lập trình tức thì. Điều này giúp loại bỏ sự cần thiết phải liên tục chuyển đổi ngữ cảnh giữa trình duyệt web và trình soạn thảo của bạn, cho phép bạn tập trung hoàn toàn vào việc viết mã.
        </p>

        <div class="section-separator"></div>

        <h2>✨ Tính năng nổi bật của Extension</h2>
        <ul>
            <li>
                <strong>Tạo mã thông minh theo ngữ cảnh:</strong> Đây là tính năng cốt lõi. Bạn chỉ cần chọn một đoạn văn bản (có thể là một bình luận mô tả ý tưởng, một yêu cầu chức năng, hoặc một phần của mã hiện có) và Gemini sẽ phân tích ngữ cảnh đó để tự động sinh ra đoạn mã phù hợp. Tính năng này đặc biệt hữu ích cho việc tạo boilerplate code, các hàm tiện ích nhỏ, hoặc các đoạn mã phức tạp dựa trên mô tả.
            </li>
            <li>
                <strong>Hỗ trợ đa ngôn ngữ lập trình:</strong> Gemini Code Assistant không bị giới hạn ở một ngôn ngữ cụ thể. Nhờ vào khả năng hiểu biết rộng lớn và linh hoạt của mô hình Gemini, extension có thể hỗ trợ bạn trong nhiều ngôn ngữ lập trình khác nhau, bao gồm nhưng không giới hạn ở JavaScript, Python, Java, C#, Go, Ruby, và nhiều ngôn ngữ khác.
            </li>
            <li>
                <strong>Tích hợp liền mạch với VS Code:</strong> Các chức năng của extension được tích hợp sâu vào giao diện và quy trình làm việc quen thuộc của Visual Studio Code. Bạn có thể dễ dàng kích hoạt và gọi các lệnh của Gemini trực tiếp từ Command Palette (thường là <code>Ctrl+Shift+P</code> hoặc <code>Cmd+Shift+P</code>), mang lại trải nghiệm sử dụng mượt mà và trực quan, không làm gián đoạn luồng công việc của bạn.
            </li>
            <li>
                <strong>Cấu hình API Key dễ dàng và bảo mật:</strong> Chúng tôi ưu tiên sự an toàn và quyền riêng tư của người dùng. Extension cho phép bạn thiết lập Google Gemini API Key của mình một cách dễ dàng và an toàn thông qua hệ thống cài đặt tích hợp sẵn của VS Code. Điều này đảm bảo rằng khóa API của bạn không bị lộ ra ngoài và được quản lý một cách bảo mật.
            </li>
        </ul>

        <div class="section-separator"></div>

        <h2>⚙️ Công nghệ sử dụng</h2>
        <ul>
            <li><strong>Ngôn ngữ lập trình:</strong> TypeScript</li>
            <li><strong>Môi trường phát triển:</strong> Node.js</li>
            <li><strong>Framework Extension:</strong> VS Code Extension API</li>
            <li><strong>Thư viện AI:</strong> <code>@google/generative-ai</code> (SDK chính thức của Google cho Gemini API)</li>
            <li><strong>Quản lý gói:</strong> npm</li>
        </ul>

        <div class="section-separator"></div>

        <h2>📥 Hướng dẫn Cài đặt & Bắt đầu</h2>
        <p>Để có thể sử dụng và chạy dự án này (nếu bạn muốn phát triển hoặc đóng góp) hoặc cài đặt extension từ file <code>.vsix</code>, hãy làm theo các bước sau:</p>

        <h3>1. Yêu cầu hệ thống</h3>
        <ul>
            <li>Node.js (phiên bản LTS được khuyến nghị)</li>
            <li>npm (thường được cài đặt cùng Node.js)</li>
            <li>Visual Studio Code</li>
        </ul>

        <h3>2. Thiết lập môi trường phát triển (Nếu bạn muốn chỉnh sửa code)</h3>
        <ol>
            <li><strong>Clone repository về máy:</strong>
                <pre><code>git clone https://github.com/Vai-studio/gemini-code-assistant.git
cd gemini-code-assistant</code></pre>
            </li>
            <li><strong>Cài đặt các dependencies:</strong>
                <pre><code>npm install</code></pre>
            </li>
            <li><strong>Mở dự án trong VS Code:</strong>
                <pre><code>code .</code></pre>
            </li>
            <li><strong>Biên dịch TypeScript:</strong>
                <pre><code>npm run compile</code></pre>
                Hoặc sử dụng <code>npm run watch</code> để tự động biên dịch khi có thay đổi.
            </li>
        </ol>

        <h3>3. Cài đặt Extension vào VS Code (từ file <code>.vsix</code>)</h3>
        <p>Sau khi bạn đã đóng gói extension thành công (sử dụng <code>vsce package</code>), bạn có thể cài đặt nó vào VS Code:</p>
        <ol>
            <li>Mở Visual Studio Code.</li>
            <li>Đi tới phần <strong>Extensions</strong> (biểu tượng hình vuông ở thanh bên trái, hoặc nhấn <code>Ctrl+Shift+X</code> / <code>Cmd+Shift+X</code>).</li>
            <li>Ở góc trên cùng bên phải của thanh bên Extensions, nhấp vào <strong>biểu tượng dấu ba chấm (...)</strong> hoặc <strong>bánh răng cưa (Manage)</strong>.</li>
            <li>Chọn <strong>"Install from VSIX..."</strong> (Cài đặt từ VSIX...).</li>
            <li>Điều hướng đến file <code>.vsix</code> của bạn (thường là <code>gemini-code-assistant-0.0.1.vsix</code> trong thư mục gốc của dự án) và chọn nó.</li>
            <li>VS Code sẽ cài đặt extension. Nhấp <strong>"Reload"</strong> (Tải lại) nếu được nhắc để kích hoạt extension.</li>
        </ol>

        <div class="section-separator"></div>

        <h2>⚙️ Cấu hình API Key (Bắt buộc)</h2>
        <p>
            Để Gemini Code Assistant có thể giao tiếp với các dịch vụ của Google Gemini, bạn cần cung cấp <strong>Google Gemini API Key</strong> của mình. Hãy làm theo các bước sau để thiết lập:
        </p>
        <ol>
            <li>Mở <strong>VS Code Settings</strong> (Cài đặt) bằng cách:
                <ul>
                    <li>Nhấn <code>Ctrl + ,</code> (dấu phẩy) trên Windows/Linux.</li>
                    <li>Hoặc nhấn <code>Cmd + ,</code> (dấu phẩy) trên macOS.</li>
                    <li>Hoặc vào menu <strong>File</strong> > <strong>Preferences</strong> > <strong>Settings</strong>.</li>
                </ul>
            </li>
            <li>Trong thanh tìm kiếm ở đầu trang Cài đặt, gõ "Gemini Code Assistant" hoặc "apiKey".</li>
            <li>Bạn sẽ thấy một tùy chọn cài đặt có tên là <strong>"Gemini Code Assistant: API Key"</strong>.</li>
            <li>
                Dán API Key của bạn (thường bắt đầu bằng <code>AIza...</code>) vào ô trống bên cạnh tùy chọn này.
                <p class="text-sm italic" style="color: #666; margin-top: 5px;">
                    Nếu bạn chưa có API Key, hãy truy cập <a href="https://ai.google.dev/gemini-api/docs/get-started/api-key" target="_blank">trang hướng dẫn của Google AI Studio</a> để lấy một khóa API mới.
                </p>
            </li>
            <li>Sau khi dán khóa, hãy đóng tab Cài đặt. VS Code sẽ tự động lưu thay đổi của bạn.</li>
        </ol>
        <div class="warning-box">
            <strong>Cảnh báo bảo mật:</strong> API Key là thông tin nhạy cảm. <strong>Tuyệt đối không chia sẻ API Key này công khai hoặc đưa nó vào mã nguồn mà bạn chia sẻ lên các nền tảng như GitHub.</strong> API Key nên được giữ bí mật để tránh việc sử dụng trái phép tài khoản của bạn.
        </div>

        <div class="section-separator"></div>

        <h2>💡 Hướng dẫn Cách sử dụng Extension</h2>
        <p>Sau khi cài đặt và cấu hình API Key, bạn có thể bắt đầu tận dụng Gemini Code Assistant:</p>
        <ol>
            <li>Mở bất kỳ file mã nào trong VS Code (ví dụ: <code>.js</code>, <code>.ts</code>, <code>.py</code>, v.v.).</li>
            <li>
                <strong>Chọn một đoạn văn bản cụ thể</strong> trong trình soạn thảo. Đoạn văn bản này có thể là:
                <ul>
                    <li>Một bình luận mô tả chức năng mà bạn muốn viết (ví dụ: <code>// Function to reverse a string</code>).</li>
                    <li>Một phần của mã hiện có mà bạn muốn Gemini giúp cải thiện hoặc mở rộng.</li>
                    <li>Một yêu cầu bằng văn bản rõ ràng về một đoạn mã cụ thể.</li>
                </ul>
            </li>
            <li>Mở <strong>Command Palette</strong> (Bảng lệnh) bằng cách nhấn <code>Ctrl+Shift+P</code> (Windows/Linux) hoặc <code>Cmd+Shift+P</code> (macOS).</li>
            <li>Trong thanh tìm kiếm của Command Palette, gõ "Gemini: Generate Code" và chọn lệnh đó.</li>
            <li>Extension sẽ gửi đoạn văn bản bạn đã chọn đến Google Gemini API. Sau khi nhận được phản hồi, mã được sinh ra sẽ tự động chèn vào vị trí mà bạn đã chọn trong trình soạn thảo của bạn.</li>
        </ol>

        <div class="section-separator"></div>

        <h2>⚠️ Lưu ý quan trọng và Giới hạn</h2>
        <ul>
            <li>
                <strong>Chi phí API:</strong> Việc sử dụng Google Gemini API có thể phát sinh chi phí. Mức phí phụ thuộc vào lượng token (dữ liệu) bạn gửi và nhận. Vui lòng tham khảo <a href="https://cloud.google.com/vertex-ai/generative-ai/pricing" target="_blank">giá chính thức của Google Gemini API</a> để biết thêm thông tin chi tiết.
            </li>
            <li>
                <strong>Chất lượng mã sinh ra:</strong> Mặc dù Gemini là một mô hình rất mạnh mẽ, mã được sinh ra bởi AI có thể không phải lúc nào cũng hoàn hảo. Nó có thể cần được lập trình viên xem xét, kiểm tra kỹ lưỡng, điều chỉnh, tối ưu hóa hoặc gỡ lỗi thêm để phù hợp với yêu cầu cụ thể và quy tắc mã hóa của dự án bạn.
            </li>
            <li>
                <strong>Giới hạn tốc độ (Rate Limiting):</strong> Giống như hầu hết các dịch vụ API, Google Gemini API có thể áp dụng giới hạn về số lượng yêu cầu bạn có thể gửi trong một khoảng thời gian nhất định (rate limits). Nếu bạn thực hiện quá nhiều yêu cầu trong thời gian ngắn, bạn có thể gặp lỗi tạm thời.
            </li>
            <li>
                <strong>Kết nối Internet:</strong> Extension này yêu cầu kết nối Internet để giao tiếp với Google Gemini API.
            </li>
        </ul>

        <div class="section-separator"></div>

        <h2>🤝 Đóng góp và Hỗ trợ</h2>
        <p>
            Nhóm <strong>Vai-studio</strong> luôn hoan nghênh mọi đóng góp và phản hồi từ cộng đồng. Nếu bạn có ý tưởng cải tiến, đề xuất tính năng mới, hoặc phát hiện lỗi, xin đừng ngần ngại:
        </p>
        <ul>
            <li>Truy cập <a href="https://github.com/Vai-studio/gemini-code-assistant" target="_blank">Repository GitHub của dự án Vai-studio</a>.</li>
            <li>Tạo một <strong>Issue</strong> mới để báo cáo lỗi hoặc đề xuất tính năng.</li>
            <li>Hoặc tạo một <strong>Pull Request</strong> nếu bạn đã có giải pháp hoặc cải tiến.</li>
        </ul>
        <p style="margin-top: 10px;">
            Phản hồi của bạn là vô cùng quý giá để chúng tôi tiếp tục cải thiện extension này!
        </p>

        <div class="section-separator"></div>

        <h2>📄 Giấy phép</h2>
        <p>
            Extension này được phát hành dưới giấy phép <a href="https://opensource.org/licenses/MIT" target="_blank">MIT License</a>. Bạn có thể tự do sử dụng, chỉnh sửa và phân phối nó theo các điều khoản của giấy phép này.
        </p>

        <div class="section-separator"></div>

        <p style="text-align: center; color: #666; font-size: 0.9em; margin-top: 30px;">
            Phát triển bởi <strong>Nhóm Vai-studio</strong><br>
            <i>(Tháng 6, 2025)</i>
        </p>
    </div>
</body>
</html>
