# Gia phả Việt

Ứng dụng React để xem và khám phá sơ đồ gia phả nhiều thế hệ.

## Chạy ứng dụng

```bash
npm install
npm run dev
```

## Tính năng

- Xem sơ đồ gia phả tổng thể hoặc nhánh gia đình liên quan đến một thành viên.
- Tìm kiếm thành viên, chọn một người trên sơ đồ để xem hồ sơ và các mối quan hệ.
- Thêm thành viên mới và liên kết với thân phụ, thân mẫu.
- Tải sơ đồ dưới dạng SVG vector hoặc dùng chức năng in của trình duyệt để lưu thành PDF.
- Dữ liệu mẫu lấy từ tệp Excel nằm trong `src/data/family.json`; các thành viên thêm mới được lưu trong trình duyệt.

Các thành phần giao diện được tách thành module trong `src/components`; hàm xác định nhánh quan hệ nằm trong `src/utils/family.js`.
