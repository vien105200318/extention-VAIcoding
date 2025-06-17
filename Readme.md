Gemini Code Assistant for VS Code
Được phát triển bởi Vai-studio

🚀 Giới thiệu chung về dự án
Chào mừng bạn đến với Gemini Code Assistant, một tiện ích mở rộng (extension) mạnh mẽ được thiết kế đặc biệt cho Visual Studio Code. Dự án này được phát triển bởi nhóm Vai-studio với mục tiêu cốt lõi là cách mạng hóa quy trình lập trình của bạn bằng cách tích hợp trực tiếp sức mạnh và trí tuệ của mô hình ngôn ngữ lớn Google Gemini vào trình soạn thảo mã nguồn yêu thích của bạn.

Trong thế giới phát triển phần mềm hiện đại, việc tìm kiếm thông tin, viết mã lặp lại, hoặc đối mặt với các vấn đề phức tạp có thể tiêu tốn rất nhiều thời gian. Gemini Code Assistant ra đời để giải quyết những thách thức này, cung cấp một trợ lý AI đắc lực ngay trong tầm tay bạn. Dù bạn đang mắc kẹt với một đoạn mã phức tạp, cần một gợi ý nhanh, hay đơn giản là muốn tăng tốc quá trình phát triển, extension này sẽ hỗ trợ bạn một cách thông minh và hiệu quả.

Với Gemini Code Assistant, bạn không chỉ có thể tạo ra các đoạn mã mới một cách thông minh dựa trên mô tả bằng ngôn ngữ tự nhiên mà còn nhận được những gợi ý quý giá và sự hỗ trợ lập trình tức thì. Điều này giúp loại bỏ sự cần thiết phải liên tục chuyển đổi ngữ cảnh giữa trình duyệt web và trình soạn thảo của bạn, cho phép bạn tập trung hoàn toàn vào việc viết mã.

✨ Tính năng nổi bật của Extension
Tạo mã thông minh theo ngữ cảnh: Đây là tính năng cốt lõi. Bạn chỉ cần chọn một đoạn văn bản (có thể là một bình luận mô tả ý tưởng, một yêu cầu chức năng, hoặc một phần của mã hiện có) và Gemini sẽ phân tích ngữ cảnh đó để tự động sinh ra đoạn mã phù hợp. Tính năng này đặc biệt hữu ích cho việc tạo boilerplate code, các hàm tiện ích nhỏ, hoặc các đoạn mã phức tạp dựa trên mô tả.

Hỗ trợ đa ngôn ngữ lập trình: Gemini Code Assistant không bị giới hạn ở một ngôn ngữ cụ thể. Nhờ vào khả năng hiểu biết rộng lớn và linh hoạt của mô hình Gemini, extension có thể hỗ trợ bạn trong nhiều ngôn ngữ lập trình khác nhau, bao gồm nhưng không giới hạn ở JavaScript, Python, Java, C#, Go, Ruby, và nhiều ngôn ngữ khác.

Tích hợp liền mạch với VS Code: Các chức năng của extension được tích hợp sâu vào giao diện và quy trình làm việc quen thuộc của Visual Studio Code. Bạn có thể dễ dàng kích hoạt và gọi các lệnh của Gemini trực tiếp từ Command Palette (Ctrl+Shift+P hoặc Cmd+Shift+P), mang lại trải nghiệm sử dụng mượt mà và trực quan, không làm gián đoạn luồng công việc của bạn.

Cấu hình API Key dễ dàng và bảo mật: Chúng tôi ưu tiên sự an toàn và quyền riêng tư của người dùng. Extension cho phép bạn thiết lập Google Gemini API Key của mình một cách dễ dàng và an toàn thông qua hệ thống cài đặt tích hợp sẵn của VS Code. Điều này đảm bảo rằng khóa API của bạn không bị lộ ra ngoài và được quản lý một cách bảo mật.

⚙️ Công nghệ sử dụng
Ngôn ngữ lập trình: TypeScript

Môi trường phát triển: Node.js

Framework Extension: VS Code Extension API

Thư viện AI: @google/generative-ai (SDK chính thức của Google cho Gemini API)

Quản lý gói: npm

📥 Hướng dẫn Cài đặt & Bắt đầu
Để có thể sử dụng và chạy dự án này (nếu bạn muốn phát triển hoặc đóng góp) hoặc cài đặt extension từ file .vsix, hãy làm theo các bước sau:

1. Yêu cầu hệ thống
Node.js (phiên bản LTS được khuyến nghị)

npm (thường được cài đặt cùng Node.js)

Visual Studio Code

2. Thiết lập môi trường phát triển (Nếu bạn muốn chỉnh sửa code)
Clone repository về máy:

git clone https://github.com/Vai-studio/gemini-code-assistant.git
cd gemini-code-assistant

Cài đặt các dependencies:

npm install

Mở dự án trong VS Code:

code .

Biên dịch TypeScript:

npm run compile

Hoặc sử dụng npm run watch để tự động biên dịch khi có thay đổi.

3. Cài đặt Extension vào VS Code (từ file .vsix)
Sau khi bạn đã đóng gói extension thành công (sử dụng vsce package), bạn có thể cài đặt nó vào VS Code:

Mở Visual Studio Code.

Đi tới phần Extensions (biểu tượng hình vuông ở thanh bên trái, hoặc nhấn Ctrl+Shift+X / Cmd+Shift+X).

Ở góc trên cùng bên phải của thanh bên Extensions, nhấp vào biểu tượng dấu ba chấm (...) hoặc bánh răng cưa (Manage).

Chọn "Install from VSIX..." (Cài đặt từ VSIX...).

Điều hướng đến file .vsix của bạn (thường là gemini-code-assistant-0.0.1.vsix trong thư mục gốc của dự án) và chọn nó.

VS Code sẽ cài đặt extension. Nhấp "Reload" (Tải lại) nếu được nhắc để kích hoạt extension.

⚙️ Cấu hình API Key (Bắt buộc)
Để Gemini Code Assistant có thể giao tiếp với các dịch vụ của Google Gemini, bạn cần cung cấp Google Gemini API Key của mình. Hãy làm theo các bước sau để thiết lập:

Mở VS Code Settings (Cài đặt) bằng cách:

Nhấn Ctrl + , (dấu phẩy) trên Windows/Linux.

Hoặc nhấn Cmd + , (dấu phẩy) trên macOS.

Hoặc vào menu File > Preferences > Settings.

Trong thanh tìm kiếm ở đầu trang Cài đặt, gõ "Gemini Code Assistant" hoặc "apiKey".

Bạn sẽ thấy một tùy chọn cài đặt có tên là "Gemini Code Assistant: API Key".

Dán API Key của bạn (thường bắt đầu bằng AIza...) vào ô trống bên cạnh tùy chọn này.

Nếu bạn chưa có API Key, hãy truy cập trang hướng dẫn của Google AI Studio để lấy một khóa API mới.

Sau khi dán khóa, hãy đóng tab Cài đặt. VS Code sẽ tự động lưu thay đổi của bạn.

Cảnh báo bảo mật: API Key là thông tin nhạy cảm. Tuyệt đối không chia sẻ API Key này công khai hoặc đưa nó vào mã nguồn mà bạn chia sẻ lên các nền tảng như GitHub. API Key nên được giữ bí mật để tránh việc sử dụng trái phép tài khoản của bạn.

💡 Hướng dẫn Cách sử dụng Extension
Sau khi cài đặt và cấu hình API Key, bạn có thể bắt đầu tận dụng Gemini Code Assistant:

Mở bất kỳ file mã nào trong VS Code (ví dụ: .js, .ts, .py, v.v.).

Chọn một đoạn văn bản cụ thể trong trình soạn thảo. Đoạn văn bản này có thể là:

Một bình luận mô tả chức năng mà bạn muốn viết (ví dụ: // Function to reverse a string).

Một phần của mã hiện có mà bạn muốn Gemini giúp cải thiện hoặc mở rộng.

Một yêu cầu bằng văn bản rõ ràng về một đoạn mã cụ thể.

Mở Command Palette (Bảng lệnh) bằng cách nhấn Ctrl+Shift+P (Windows/Linux) hoặc Cmd+Shift+P (macOS).

Trong thanh tìm kiếm của Command Palette, gõ "Gemini: Generate Code" và chọn lệnh đó.

Extension sẽ gửi đoạn văn bản bạn đã chọn đến Google Gemini API. Sau khi nhận được phản hồi, mã được sinh ra sẽ tự động chèn vào vị trí mà bạn đã chọn trong trình soạn thảo của bạn.

⚠️ Lưu ý quan trọng và Giới hạn
Chi phí API: Việc sử dụng Google Gemini API có thể phát sinh chi phí. Mức phí phụ thuộc vào lượng token (dữ liệu) bạn gửi và nhận. Vui lòng tham khảo giá chính thức của Google Gemini API để biết thêm thông tin chi tiết.

Chất lượng mã sinh ra: Mặc dù Gemini là một mô hình rất mạnh mẽ, mã được sinh ra bởi AI có thể không phải lúc nào cũng hoàn hảo. Nó có thể cần được lập trình viên xem xét, kiểm tra kỹ lưỡng, điều chỉnh, tối ưu hóa hoặc gỡ lỗi thêm để phù hợp với yêu cầu cụ thể và quy tắc mã hóa của dự án bạn.

Giới hạn tốc độ (Rate Limiting): Giống như hầu hết các dịch vụ API, Google Gemini API có thể áp dụng giới hạn về số lượng yêu cầu bạn có thể gửi trong một khoảng thời gian nhất định (rate limits). Nếu bạn thực hiện quá nhiều yêu cầu trong thời gian ngắn, bạn có thể gặp lỗi tạm thời.

Kết nối Internet: Extension này yêu cầu kết nối Internet để giao tiếp với Google Gemini API.

🤝 Đóng góp và Hỗ trợ
Nhóm Vai-studio luôn hoan nghênh mọi đóng góp và phản hồi từ cộng đồng. Nếu bạn có ý tưởng cải tiến, đề xuất tính năng mới, hoặc phát hiện lỗi, xin đừng ngần ngại:

Truy cập Repository GitHub của dự án Vai-studio.

Tạo một Issue mới để báo cáo lỗi hoặc đề xuất tính năng.

Hoặc tạo một Pull Request nếu bạn đã có giải pháp hoặc cải tiến.

Phản hồi của bạn là vô cùng quý giá để chúng tôi tiếp tục cải thiện extension này!

📄 Giấy phép
Extension này được phát hành dưới giấy phép MIT License. Bạn có thể tự do sử dụng, chỉnh sửa và phân phối nó theo các điều khoản của giấy phép này.

Phát triển bởi Nhóm Vai-studio
(Tháng 6, 2025)