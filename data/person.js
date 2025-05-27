class Person
{
    /*
    var thongTinCaNhan = 
    {
        id: 0, hoVaTenDem: "", ten: "", gioiTinh: 1, diaChi: "", dienThoai: "", ngheNghiep: "",
        ngaySinh: 0, thangSinh: 0, namSinh: 0,
        ngayMat: 0, thangMat: 0, namMat: 0,
        idVoChong: 0, idCha: 0, idMe: 0  
    }; */

    constructor(thongTinCaNhan)
    {
        this.thongTinCaNhan.id = thongTinCaNhan.id || 0;
        this.thongTinCaNhan.hoVaTenDem = thongTinCaNhan.hoVaTenDem || "";  
        this.thongTinCaNhan.ten = thongTinCaNhan.ten || "";
        this.thongTinCaNhan.gioiTinh = thongTinCaNhan.gioiTinh || 1;
        this.thongTinCaNhan.diaChi = thongTinCaNhan.diaChi || "";
        this.thongTinCaNhan.dienThoai = thongTinCaNhan.dienThoai || "";
        this.thongTinCaNhan.ngheNghiep = thongTinCaNhan.ngheNghiep || "";
        this.thongTinCaNhan.ngaySinh = thongTinCaNhan.ngaySinh || 0;
        this.thongTinCaNhan.thangSinh = thongTinCaNhan.thangSinh || 0;
        this.thongTinCaNhan.namSinh = thongTinCaNhan.namSinh || 0;
        this.thongTinCaNhan.ngayMat = thongTinCaNhan.ngayMat || 0;
        this.thongTinCaNhan.thangMat = thongTinCaNhan.thangMat || 0;
        this.thongTinCaNhan.namMat = thongTinCaNhan.namMat || 0;
        this.thongTinCaNhan.idVoChong = thongTinCaNhan.idVoChong || 0;
        this.thongTinCaNhan.idCha = thongTinCaNhan.idCha || 0;
        this.thongTinCaNhan.idMe = thongTinCaNhan.idMe || 0;
    }
}