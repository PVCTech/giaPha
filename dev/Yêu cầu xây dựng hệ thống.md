# Xây dựng 1 gia phả:
## 1. Tính năng:
- Có thể vẽ cây gia phả tổng thể từ cụ tổ xuống con cháu
- Có thể chọn 1 người và vẽ sơ đồ cây phả hệ liên quan tới người đó:
    +) Ông bà nội, bố mẹ 
    +) vợ chồng các bác chú
    +) Con của các bác chú
    +) Anh chị em ruột
    +) con và cháu ruột
- Có thể xuất bản đồ gia phả dưới dạng file vector (svg và pdf)

## 2. Mẫu dữ liệu:
    +) Gồm các cột có tiêu đề:
    id: ID,
    hoVaTen: Họ và tên *,
    gioiTinh: Giới tính *,: 
    doi: Đời,
    idBo: Thân phụ ID,
    idMe: Thân mẫu ID,
    idVoChon: ID Vợ/chồng,
    tenThuongGoi: Tên thường gọi,
    chucDanh: Chức danh / vai vế,
    ngaySinh: Ngày sinh,
    thangSinh: Tháng sinh,
    namSinh: Năm Sinh,
    daChet: Đã mất,
    ngayMatDuong: Ngày mất dương,
    thangMatDuong: Tháng mất dương,
    namMatDuong: Năm mất dương,
    ngayMatAm: Ngày mất âm,
    thangMatAm: Tháng mất âm,
    namMatAm: Năm mất âm,
    tinhTrangHonNhan: Tình trạng hôn nhân,
    nhomMau : Nhóm máu,
    hocVan: Học vấn,
    soDienThoai1: Số điện thoại,
    soDienThoai2: Số điện thoại 2,
    diaChi: Địa chỉ,
    tinh: Tỉnh,
    tonGiao: Tôn giáo,
    notShowOnTree: Không thị trên phả đồ,
    quanHeVoiChaMe: Quan hệ với cha mẹ,
    ghiChu: Ghi chú
    
 Dữ liệu mẫu trong file mau-nhap-thanh-vien.xlsx , 
 
 
 ## 3. xây dựng web app react 
 - Dữ liệu dựng sẵn trong file json
 - Phân nhỏ thành nhiểu file, mõi file là module riêng. Mỗi module nếu cần css thì có file riêng đi kèm. Module lớn thì tạo thư mục riêng chứa cá file