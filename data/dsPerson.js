var dsPerson = [
    new Person({id: 0, hoVaTenDem: "PHẠM VĂN", ten: "SÁCH", gioiTinh: 1, diaChi: "", dienThoai: "", ngheNghiep: "",
        ngaySinh: 0, thangSinh: 0, namSinh: 0, ngayMat: 0, thangMat: 0, namMat: 0, 
        idVoChong: 0, idCha: 0, idMe: 0}),
    new Person({id: 0, hoVaTenDem: "PHẠM VĂN", ten: "NGŨ", gioiTinh: 1, diaChi: "", dienThoai: "", ngheNghiep: "",
        ngaySinh: 0, thangSinh: 0, namSinh: 0, ngayMat: 0, thangMat: 0, namMat: 0, 
        idVoChong: 0, idCha: 0, idMe: 0})
    ];


function getPersonById(id) {
    for (var i = 0; i < dsPerson.length; i++) {
        if (dsPerson[i].thongTinCaNhan.id === id) {
            return dsPerson[i];
        }
    }
    return null;
}

function findPersonsByName(name) {
    return dsPerson.filter(function(person) {
        return person.thongTinCaNhan.hoVaTenDem.includes(name) || person.thongTinCaNhan.ten.includes(name);
    });
}


function showDsPersonTomTat()
{
    let htmlkq = document.createElement('table');
    htmlkq.innerHTML = "<tr><th>ID</th><th>Họ và Tên Đệm</th><th>Tên</th></tr>";
    dsPerson.forEach(function(person) {
        htmlkq.innerHTML += "<tr><td>" + person.thongTinCaNhan.id + "</td><td>" + person.thongTinCaNhan.hoVaTenDem + "</td><td>" + person.thongTinCaNhan.ten + "</td></tr>";
    });
    return htmlkq;
}


