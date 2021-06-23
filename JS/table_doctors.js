
function start() {
    getDoctors(renderDoctors);

    handleCreateDoctors();

}

var Api = 'http://localhost:8080/bacsys';
// var Api = " http://localhost:3000/doctors";


start();

// Search

function search() {
    var valueSearch = document.querySelector("input[name='valueSearch']").value.trim();
    fetch(Api + "/search?ten=" + valueSearch)
        .then(function (response) {
            return response.json();
        })
        .then(function (datas) {
            console.log(datas);
            var htmls = datas.map(function (data) {
                return `<div class="form-table__row form-table__row--${data.id}">
                        <div class="form-table__column column-doctor form-table__column--id">
                            <span>${data.id}</span>
                        </div>
                        <div class="form-table__column column-doctor form-table__column--ten">
                            <span>${data.ten}</span>
                        </div>
                        <div class="form-table__column column-doctor form-table__column--cmt">
                            <span>${data.cmt}</span>
                        </div>
                        <div class="form-table__column column-doctor form-table__column--ngaySinh">
                            <span>${data.ngaySinh.slice(0, 10)}</span>
                        </div>
                        <div class="form-table__column column-doctor form-table__column--diaChi">
                            <span>${data.diaChi}</span>
                        </div>
                        <div class="form-table__column column-doctor form-table__column--bacNghe">
                            <span>${data.bacNghe}</span>
                        </div>
                        <div class="form-table__column column-doctor form-table__column--thamNien">
                            <span>${data.thamNien}</span>
                        </div>
                        <div class="form-table__column column-doctor form-table__column--chuyenMon">
                            <span>${data.chuyenMon}</span>
                        </div>
                        <div class="form-table__column column-doctor form-table__column--sdt">
                            <span>${data.sdt}</span>
                        </div>
                        <div class="form-table__column column-doctor">
                            <button class="edit" onclick = "editDoctor(${data.id})">
                                <i class="fas fa-pencil-alt edit-item"></i>
                            </button>
                            <button class="delete" onclick = "handleDeleteDoctor(${data.id})">
                                <i class="fas fa-trash-alt delete-item"></i>
                            </button>
                        </div>
                    </div>`;
            });
            var doctorsForm = document.querySelector(".form-table__doctors-content");
            doctorsForm.innerHTML = htmls.join("");

        })


}

// GET
function getDoctors(callback) {
    fetch(Api)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}

function emptyData(data){
    if(data.length === 0){
        document.querySelector(".empty-data").style.display = "block";
        document.querySelector(".addBtn").style.display = "none";

        document.querySelector(".empty-data--add").onclick = function(){
            document.querySelector(".empty-data").style.display = "none";
            document.querySelector(".task-form").style.display = "block";
        }
    }
}

// renderDoctors
function renderDoctors(datas) {
    emptyData(datas);
    var doctorsForm = document.querySelector(".form-table__doctors-content");
    var htmls = datas.map(function (data) {
        return `<div class="form-table__row form-table__row--${data.id}">
                    <div class="form-table__column column-doctor form-table__column--id">
                        <span>${data.id}</span>
                    </div>
                    <div class="form-table__column column-doctor form-table__column--ten">
                        <span>${data.ten}</span>
                    </div>
                    <div class="form-table__column column-doctor form-table__column--cmt">
                        <span>${data.cmt}</span>
                    </div>
                    <div class="form-table__column column-doctor form-table__column--ngaySinh">
                        <span>${data.ngaySinh.slice(0, 10)}</span>
                    </div>
                    <div class="form-table__column column-doctor form-table__column--diaChi">
                        <span>${data.diaChi}</span>
                    </div>
                    <div class="form-table__column column-doctor form-table__column--bacNghe">
                        <span>${data.bacNghe}</span>
                    </div>
                    <div class="form-table__column column-doctor form-table__column--thamNien">
                        <span>${data.thamNien}</span>
                    </div>
                    
                    <div class="form-table__column column-doctor form-table__column--chuyenMon">
                        <span>${data.chuyenMon}</span>
                    </div>
                    <div class="form-table__column column-doctor form-table__column--sdt">
                        <span>${data.sdt}</span>
                    </div>
                    <div class="form-table__column column-doctor">
                        <button class="edit" onclick = "editDoctor(${data.id})">
                            <i class="fas fa-pencil-alt edit-item"></i>
                        </button>
                        <button class="delete" onclick = "handleDeleteDoctor(${data.id})">
                            <i class="fas fa-trash-alt delete-item"></i>
                        </button>
                    </div>
                </div>`;
        // onclick = "handleDeleteDoctor(${doctor.id})"
        // alert("hello")
    });
    doctorsForm.innerHTML = htmls.join("");
}

// CREATE - POST

function createDoctors(data, callback) {
    var option = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    fetch(Api, option)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function clearForm(){
    document.querySelector("input[name='ten']").value = '';
    document.querySelector("input[name='cmt']").value = '';
    document.querySelector("input[name='ngaySinh']").value = '';
    document.querySelector("input[name='diaChi']").value = '';
    document.querySelector("input[name='bacNghe']").value = '';
    document.querySelector("input[name='thamNien']").value = '';
    document.querySelector("input[name='chuyenMon']").value = '';
    document.querySelector("input[name='sdt']").value = '';
}

function handleCreateDoctors() {
    var createBtn = document.querySelector('.create');
    document.querySelector('.addBtn').onclick = function () {

        clearForm();

        document.querySelector(".task-form").style.display = "block";
        document.querySelector('.addBtn').style.display = "none";
    }
    createBtn.onclick = function () {

        var ten = document.querySelector("input[name='ten']").value.trim();
        var cmt = document.querySelector("input[name='cmt']").value.trim();
        var ngaySinh = document.querySelector("input[name='ngaySinh']").value.trim();
        var diaChi = document.querySelector("input[name='diaChi']").value.trim();
        var bacNghe = document.querySelector("input[name='bacNghe']").value.trim();
        var thamNien = document.querySelector("input[name='thamNien']").value.trim();
        var chuyenMon = document.querySelector("input[name='chuyenMon']").value.trim();
        var sdt = document.querySelector("input[name='sdt']").value.trim();

        var formDoctor = {
            ten: ten,
            cmt: cmt,
            ngaySinh: ngaySinh,
            diaChi: diaChi,
            bacNghe: bacNghe,
            thamNien: thamNien,
            chuyenMon: chuyenMon,
            sdt:sdt
        };
        if (ten && cmt && ngaySinh && diaChi && bacNghe && thamNien && chuyenMon && sdt) {
            createDoctors(formDoctor, function () {
                getDoctors(renderDoctors);
            });
        }
        else {
            alert("Vui lòng nhập đầy đủ thông tin vào form!!!")
        }
        clearForm();
    }
}

// Delete 

function handleDeleteDoctor(id) {
    var option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    fetch(Api + '/' + id, option)
        .then(function (response) {
            return response.text();
        })
        .then(function () {
            var row = document.querySelector(".form-table__row--" + id);
            console.log(row);
            if (row) {
                var result = confirm("Want to delete?");
                if (result) {
                    //Logic to delete the item
                    row.remove();
                }
            }
        })
}

// Edit - PUT

function handleEditDoctor(data, id, callback) {
    var option = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    };
    fetch(Api, option)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}

function editDoctor(id) {
    document.querySelector(".task-form").style.display = "block";
    document.querySelector(".addBtn").style.display = "none";
    var createBtn = document.querySelector(".create");
    createBtn.style.display = "none";
    var saveBtn = document.querySelector(".update--save");
    saveBtn.style.display = "block";
    var formElement = document.querySelector(".form-table__row--" + id);

    
    document.querySelector("input[name = 'ten']").value = formElement.querySelector(".form-table__column--ten>span").textContent;
    document.querySelector("input[name='cmt']").value = formElement.querySelector(".form-table__column--cmt>span").textContent;
    document.querySelector("input[name='ngaySinh']").value = formElement.querySelector(".form-table__column--ngaySinh>span").textContent;
    document.querySelector("input[name='diaChi']").value = formElement.querySelector(".form-table__column--diaChi>span").textContent;
    document.querySelector("input[name='bacNghe']").value = formElement.querySelector(".form-table__column--bacNghe>span").textContent;
    document.querySelector("input[name='thamNien']").value = formElement.querySelector(".form-table__column--thamNien>span").textContent;
    document.querySelector("input[name='sdt']").value = formElement.querySelector(".form-table__column--sdt>span").textContent;
    document.querySelector("input[name='chuyenMon']").value = formElement.querySelector(".form-table__column--chuyenMon>span").textContent;

    saveBtn.onclick = function () {
        document.querySelector(".addBtn").style.display = "block";
        document.querySelector(".task-form").style.display = "none";
        
        var ten = document.querySelector("input[name='ten']").value.trim();
        var cmt = document.querySelector("input[name='cmt']").value.trim();
        var ngaySinh = document.querySelector("input[name='ngaySinh']").value.trim();
        var diaChi = document.querySelector("input[name='diaChi']").value.trim();
        var bacNghe = document.querySelector("input[name='bacNghe']").value.trim();
        var thamNien = document.querySelector("input[name='thamNien']").value.trim();
        var sdt = document.querySelector("input[name='sdt']").value.trim();
        var chuyenMon = document.querySelector("input[name='chuyenMon']").value.trim();

        var formDoctor = {
            id: id,
            ten: ten,
            cmt: cmt,
            ngaySinh: ngaySinh,
            diaChi: diaChi,
            bacNghe: bacNghe,
            thamNien: thamNien,
            chuyenMon: chuyenMon,
            sdt: sdt
        }
        if (id && ten && cmt && ngaySinh && diaChi && bacNghe && thamNien && chuyenMon && sdt) {
            handleEditDoctor(formDoctor, id, function () {
                getDoctors(renderDoctors);
            });
            createBtn.style.display = "block";
            saveBtn.style.display = "none";
        }
        else {
            alert("Vui lòng nhập đầy đủ thông tin vào form!!!")
        }
        clearForm();
    }
}



