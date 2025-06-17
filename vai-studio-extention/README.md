Gemini Code Assistant for VS Code
Được phát triển bởi Vai-studio

🚀 Giới thiệu chung
Chào mừng bạn đến với Gemini Code Assistant, một tiện ích mở rộng (extension) được thiết kế đặc biệt cho Visual Studio Code, do nhóm Vai-studio phát triển. Mục tiêu của chúng tôi là cách mạng hóa quy trình lập trình của bạn bằng cách tích hợp trực tiếp sức mạnh của mô hình ngôn ngữ lớn Google Gemini vào trình soạn thảo yêu thích của bạn. Dù bạn đang mắc kẹt với một đoạn mã phức tạp hay đơn giản là muốn tăng tốc quá trình phát triển, Gemini Code Assistant sẽ là trợ lý AI đắc lực của bạn.

Với extension này, bạn không chỉ có thể tạo ra các đoạn mã mới một cách thông minh mà còn nhận được những gợi ý quý giá và sự hỗ trợ lập trình ngay tại chỗ. Tạm biệt những lần chuyển đổi ngữ cảnh liên tục giữa trình duyệt và trình soạn thảo – giờ đây mọi thứ đều nằm trong tầm tay bạn.

✨ Tính năng nổi bật
Tạo mã thông minh theo ngữ cảnh: Chọn một đoạn văn bản, một bình luận mô tả ý tưởng, hoặc một yêu cầu cụ thể, Gemini sẽ phân tích ngữ cảnh và tự động sinh ra đoạn mã phù hợp. Tính năng này giúp bạn tiết kiệm thời gian đáng kể trong việc viết boilerplate code hoặc các chức năng lặp lại.

Hỗ trợ đa ngôn ngữ lập trình: Gemini Code Assistant không giới hạn ở một ngôn ngữ. Nhờ khả năng hiểu biết đa dạng của Gemini, extension có thể hỗ trợ bạn trong nhiều ngôn ngữ lập trình khác nhau, từ JavaScript, Python, Java, C# cho đến các ngôn ngữ khác.

Tích hợp liền mạch với VS Code: Các chức năng của extension được tích hợp sâu vào quy trình làm việc của VS Code. Bạn có thể dễ dàng gọi các lệnh của Gemini trực tiếp từ Command Palette (Ctrl+Shift+P hoặc Cmd+Shift+P), giúp trải nghiệm sử dụng mượt mà và trực quan.

Cấu hình API Key dễ dàng và bảo mật: Chúng tôi hiểu tầm quan trọng của việc bảo mật thông tin cá nhân. Extension cho phép bạn thiết lập Google Gemini API Key của mình một cách dễ dàng và an toàn thông qua hệ thống cài đặt của VS Code, đảm bảo khóa API của bạn không bị lộ ra ngoài.

📥 Hướng dẫn Cài đặt
Để bắt đầu sử dụng Gemini Code Assistant, bạn chỉ cần làm theo các bước đơn giản sau:

Mở Visual Studio Code trên máy tính của bạn.

Đi tới phần Extensions trong thanh bên (biểu tượng hình vuông) hoặc sử dụng phím tắt Ctrl+Shift+X (Windows/Linux) / Cmd+Shift+X (macOS).

Trong thanh tìm kiếm Extensions, gõ "Gemini Code Assistant".

Nhấp vào nút Install màu xanh lá cây bên cạnh tên extension của chúng tôi.

Sau khi cài đặt xong, nếu VS Code yêu cầu, hãy nhấp vào nút Reload (Tải lại) để kích hoạt extension.

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

💡 Hướng dẫn Cách sử dụng
Sau khi cài đặt và cấu hình API Key, bạn có thể bắt đầu tận dụng Gemini Code Assistant:

Mở bất kỳ file mã nào trong VS Code (ví dụ: .js, .ts, .py, v.v.).

Chọn một đoạn văn bản cụ thể trong trình soạn thảo. Đoạn văn bản này có thể là:

Một bình luận mô tả chức năng mà bạn muốn viết (ví dụ: // Function to reverse a string).

Một phần của mã hiện có mà bạn muốn Gemini giúp cải thiện hoặc mở rộng.

Một yêu cầu bằng văn bản rõ ràng về một đoạn mã cụ thể.

Mở Command Palette (Bảng lệnh) bằng cách nhấn Ctrl+Shift+P (Windows/Linux) hoặc Cmd+Shift+P (macOS).

Trong thanh tìm kiếm của Command Palette, gõ "Gemini: Generate Code" và chọn lệnh đó.

Extension sẽ gửi đoạn văn bản bạn đã chọn đến Google Gemini API. Sau khi nhận được phản hồi, mã được sinh ra sẽ tự động chèn vào vị trí mà bạn đã chọn trong trình soạn thảo của mình.

⚠️ Lưu ý quan trọng và Giới hạn
Chi phí API: Việc sử dụng Google Gemini API có thể phát sinh chi phí. Mức phí phụ thuộc vào lượng token (dữ liệu) bạn gửi và nhận. Vui lòng tham khảo giá chính thức của Google Gemini API để biết thêm thông tin chi tiết.

Chất lượng mã sinh ra: Mặc dù Gemini là một mô hình rất mạnh mẽ, mã được sinh ra bởi AI có thể không phải lúc nào cũng hoàn hảo. Nó có thể cần được lập trình viên xem xét, kiểm tra kỹ lưỡng, điều chỉnh, tối ưu hóa hoặc gỡ lỗi thêm để phù hợp với yêu cầu cụ thể và quy tắc mã hóa của dự án bạn.

Giới hạn tốc độ (Rate Limiting): Giống như hầu hết các dịch vụ API, Google Gemini API có thể áp dụng giới hạn về số lượng yêu cầu bạn có thể gửi trong một khoảng thời gian nhất định (rate limits). Nếu bạn thực hiện quá nhiều yêu cầu trong thời gian ngắn, bạn có thể gặp lỗi tạm thời.

Kết nối Internet: Extension này yêu cầu kết nối Internet để giao tiếp với Google Gemini API.

🤝 Đóng góp và Hỗ trợ
Nhóm Vai-studio luôn hoan nghênh mọi đóng góp và phản hồi từ cộng đồng. Nếu bạn có ý tưởng cải tiến, đề xuất tính năng mới, hoặc phát hiện lỗi, xin đừng ngần ngại:

Truy cập Repository GitHub của dev: https://github.com/vien105200318

Tạo một Issue mới để báo cáo lỗi hoặc đề xuất tính năng.

Hoặc tạo một Pull Request nếu bạn đã có giải pháp hoặc cải tiến.

Phản hồi của bạn là vô cùng quý giá để chúng tôi tiếp tục cải thiện extension này!

📄 Giấy phép
Extension này được phát hành dưới giấy phép MIT License. Bạn có thể tự do sử dụng, chỉnh sửa và phân phối nó theo các điều khoản của giấy phép này.

Phát triển bởi Nhóm Vai-studio
(Tháng 6, 2025)