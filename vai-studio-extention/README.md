Gemini Code Assistant for VS Code
Được phát triển bởi Vai-studio

🚀 Giới thiệu chung
Gemini Code Assistant là tiện ích mở rộng (extension) dành cho Visual Studio Code, tích hợp sức mạnh của mô hình ngôn ngữ lớn Google Gemini trực tiếp vào quy trình lập trình của bạn. Được phát triển bởi Vai-studio, extension này cung cấp một trợ lý AI đắc lực, giúp bạn tăng tốc quá trình phát triển, tạo mã thông minh, nhận gợi ý tức thì và quản lý dự án, tác vụ cùng các thành viên ngay trong trình soạn thảo, loại bỏ nhu cầu chuyển đổi ngữ cảnh liên tục.

✨ Tính năng nổi bật

Tạo mã thông minh theo ngữ cảnh: Sinh mã tự động từ các mô tả hoặc yêu cầu của bạn, tiết kiệm thời gian viết boilerplate code.
Hỗ trợ đa ngôn ngữ lập trình: Hoạt động linh hoạt với nhiều ngôn ngữ như JavaScript, Python, Java, C#, v.v.
Tích hợp liền mạch với VS Code: Dễ dàng gọi lệnh từ Command Palette (Ctrl+Shift+P / Cmd+Shift+P), mang lại trải nghiệm mượt mà.
Quản lý dự án và tác vụ nâng cao:
Dashboard Dự án: Giao diện trực quan để xem, thêm, cập nhật trạng thái và mức độ ưu tiên của các tác vụ theo kiểu Kanban.
Tạo tác vụ tự động từ mô tả: Sử dụng Gemini để phân tách một tổng quan dự án hoặc tính năng thành các tác vụ nhỏ hơn, có thể hành động.
Chi tiết tác vụ và tài liệu: Gemini có thể tạo mô tả chi tiết và gợi ý các liên kết tài liệu liên quan cho từng tác vụ.
Quản lý thành viên dự án (qua Firebase):
Đăng ký/Đăng nhập người dùng: Xác thực người dùng thông qua Firebase Authentication.
Lưu trữ tác vụ trên Cloud: Các tác vụ và dự án được lưu trữ an toàn trên Firebase Firestore, cho phép truy cập từ bất cứ đâu.
Hỗ trợ đa người dùng (Coming Soon): Tính năng thêm/xóa thành viên vào dự án để làm việc nhóm sẽ được phát triển tiếp.
Cấu hình API Key dễ dàng và bảo mật: Nhập và lưu trữ Google Gemini API Key trực tiếp trên Dashboard tiện ích.
📥 Hướng dẫn Cài đặt

Mở VS Code.
Truy cập phần Extensions (Ctrl+Shift+X / Cmd+Shift+X).
Tìm kiếm "Gemini Code Assistant".
Nhấp vào nút Install.
Reload VS Code nếu được yêu cầu.
⚙️ Cấu hình & Bắt đầu sử dụng
Để sử dụng extension, bạn cần thực hiện các bước sau trên Project Dashboard:

Mở Dashboard: Mở Command Palette (Ctrl+Shift+P / Cmd+Shift+P) và tìm kiếm "Gemini: Show Task Dashboard".
Đăng ký / Đăng nhập:
Nếu bạn chưa có tài khoản, sử dụng form Authentication để Register (đăng ký) bằng email và mật khẩu.
Nếu đã có, chỉ cần Login (đăng nhập).
Giao diện quản lý dự án và tác vụ sẽ chỉ hiển thị sau khi đăng nhập thành công.
Thiết lập Google Gemini API Key:
Trong phần Gemini API Key trên Dashboard, dán API Key của bạn (bắt đầu bằng AIza...) vào ô nhập liệu.
Nhấn Save API Key. Bạn có thể lấy khóa tại Google AI Studio nếu chưa có.
Cảnh báo bảo mật: Không chia sẻ API Key công khai.
Tạo hoặc Chọn Dự án:
Sau khi đăng nhập, bạn có thể Create Project (tạo dự án mới) hoặc Select (chọn) một dự án hiện có từ danh sách thả xuống.
Mọi tác vụ bạn tạo sẽ được liên kết với dự án đang được chọn.
💡 Hướng dẫn Cách sử dụng (Sau khi cấu hình)

Tạo mã thông minh: Chọn đoạn code hoặc mô tả trong editor, mở Command Palette (Ctrl+Shift+P / Cmd+Shift+P) và chọn "Gemini: Generate Code".
Tạo tác vụ từ tổng quan: Chọn một đoạn văn bản mô tả dự án/tính năng trong editor hoặc nhập vào hộp thoại, sau đó chọn "Gemini: Generate Tasks from Overview" từ Command Palette. Các tác vụ sẽ xuất hiện trong Dashboard.
Quản lý tác vụ trên Dashboard: Kéo và thả các thẻ tác vụ giữa các cột "To Do", "In Progress", "Done" để cập nhật trạng thái. Thay đổi mức độ ưu tiên bằng menu thả xuống trên mỗi thẻ tác vụ. Nhấp vào một tác vụ để xem chi tiết do Gemini tạo.
🤝 Đóng góp và Hỗ trợ
Nhóm Vai-studio luôn hoan nghênh mọi đóng góp, báo cáo lỗi hoặc đề xuất tính năng.

Repository GitHub: https://github.com/vien105200318/extention-VAIcoding
Báo cáo lỗi / Đề xuất tính năng: Tạo Issue mới trên GitHub.
Đóng góp mã: Tạo Pull Request trên GitHub.
📄 Giấy phép
Extension này được phát hành dưới giấy phép MIT License.

Phát triển bởi Nhóm Vai-studio (Tháng 6, 2025)