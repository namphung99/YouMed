function start(){
    getPatients(renderPatients);

    handleCreatePatients();

}
var Api = 'http://localhost:8080/benhnhans';

// var Api = ' http://localhost:3000/patients'

start();

// Search

function search (){
    
    // Search

    var valueSearch = document.querySelector("input[name='valueSearch']").value.trim();
    fetch(Api + "/search?ten=" + valueSearch)
        .then(function (response) {
            return response.json();
        })
        .then(function (datas) {
            console.log(datas);
            var htmls = datas.map(function (data) {
                return `<div class="form-table__row form-table__row--${data.id}">
                <div class="form-table__column column-patient form-table__column--id">
                    <span>${data.id}</span>
                </div>
                <div class="form-table__column column-patient form-table__column--ten">
                    <span>${data.ten}</span>
                </div>
                <div class="form-table__column column-patient form-table__column--cmt">
                    <span>${data.cmt}</span>
                </div>
                <div class="form-table__column column-patient form-table__column--ngaySinh">
                    <span>${data.ngaySinh.slice(0, 10)}</span>
                </div>
                <div class="form-table__column column-patient form-table__column--diaChi">
                    <span>${data.diaChi}</span>
                </div>
                <div class="form-table__column column-patient form-table__column--sdt">
                    <span>${data.sdt}</span>
                </div>
                <div class="form-table__column column-patient">
                    <button class="edit" onclick = "editPatient(${data.id})">
                        <i class="fas fa-pencil-alt edit-item"></i>
                    </button>
                    <button class="delete" onclick = "handleDeletePatient(${data.id})">
                        <i class="fas fa-trash-alt delete-item"></i>
                    </button>
                    <button class="view" onclick = "handleView(${data.id})">
                    <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>`;
            
            });
            var patientsForm = document.querySelector(".form-table__patients-content");
            patientsForm.innerHTML = htmls.join("");

        })

}

// GET
function getPatients(callback){
    fetch(Api)
        .then(function(response){
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

function emptyDataDetail(data) {
    if(data.length === 0){
        document.querySelector(".empty-data--detail").style.display = "block";

    }
}

// renderNurses
function renderPatients(datas) {

    emptyData(datas)

    var htmls = datas.map(function(data){
        return `<div class="form-table__row form-table__row--${data.id}">
                    <div class="form-table__column column-patient form-table__column--id">
                        <span>${data.id}</span>
                    </div>
                    <div class="form-table__column column-patient form-table__column--ten">
                        <span>${data.ten}</span>
                    </div>
                    <div class="form-table__column column-patient form-table__column--cmt">
                        <span>${data.cmt}</span>
                    </div>
                    <div class="form-table__column column-patient form-table__column--ngaySinh">
                        <span>${data.ngaySinh.slice(0, 10)}</span>
                    </div>
                    <div class="form-table__column column-patient form-table__column--diaChi">
                        <span>${data.diaChi}</span>
                    </div>
                    <div class="form-table__column column-patient form-table__column--sdt">
                        <span>${data.sdt}</span>
                    </div>
                    <div class="form-table__column column-patient">
                        <button class="edit" onclick = "editPatient(${data.id})">
                            <i class="fas fa-pencil-alt edit-item"></i>
                        </button>
                        <button class="delete" onclick = "handleDeletePatient(${data.id})">
                            <i class="fas fa-trash-alt delete-item"></i>
                        </button>
                        <button class="view" onclick = "handleView(${data.id})">
                            <a style = "color: white">
                                <i class="fas fa-eye"></i>
                            </a>
                        </button>
                    </div>
                </div>`;
                
    });
    var patientsForm = document.querySelector(".form-table__patients-content");
    patientsForm.innerHTML = htmls.join('');
}

// CREATE - POST


function createPatients (data,callback){
    var option = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data)
    };
    fetch(Api,option)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}


function clearForm(){
    document.querySelector("input[name='ten']").value = '';
    document.querySelector("input[name='cmt']").value = '';
    document.querySelector("input[name='ngaySinh']").value = '';
    document.querySelector("input[name='diaChi']").value = '';
    document.querySelector("input[name='sdt']").value = '';
}

//CREATE
function handleCreatePatients(){
    document.querySelector(".addBtn").onclick = function(){

        clearForm();
        document.querySelector(".task-form").style.display = "block";
        document.querySelector(".addBtn").style.display = "none";
        document.querySelector(".chiTietBN").style.display = "none";

    };
    var createBtn = document.querySelector('.create');
    createBtn.onclick = function() {
        // document.querySelector(".addBtn").style.display = "block";
        // document.querySelector(".task-form").style.display = "none";

        var ten = document.querySelector("input[name='ten']").value.trim();
        var cmt = document.querySelector("input[name='cmt']").value.trim();
        var ngaySinh = document.querySelector("input[name='ngaySinh']").value.trim();
        var diaChi = document.querySelector("input[name='diaChi']").value.trim();
        var sdt = document.querySelector("input[name='sdt']").value.trim();

        var formPatient = {
            // id: id,
            ten: ten,
            cmt: cmt,
            ngaySinh: ngaySinh,
            diaChi: diaChi,
            sdt: sdt
        };
        if(ten&&cmt&&ngaySinh&&diaChi&&sdt){
            createPatients(formPatient,function(){
                getPatients(renderPatients);
            });
        }
        else {
            alert("Vui lòng nhập đầy đủ thông tin vào form!!!")
        }
        clearForm();
    }
}

// Delete 

function handleDeletePatient(id) {
    var option = {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    fetch(Api + '/' + id, option)
        .then(function(response){
            return response.text();
        })
        .then(function(){
            var row = document.querySelector(".form-table__row--"+id);
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

function handleEditPatient(data,id,callback){
    var option = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data)
    };
    fetch(Api,option)
        .then(function(response) {
            return response.json();
        })
        .then(callback)
}

function editPatient(id){
    document.querySelector(".addBtn").style.display = "none";
    document.querySelector(".task-form").style.display = "block";
    var createBtn = document.querySelector(".create");
    createBtn.style.display = "none";
    var saveBtn = document.querySelector(".update--save");
    saveBtn.style.display = "block";
    var formElement = document.querySelector(".form-table__row--"+id);

    //document.querySelector("input[name = 'id']").value = formElement.querySelector(".form-table__column--id>span").textContent;
    document.querySelector("input[name = 'ten']").value = formElement.querySelector(".form-table__column--ten>span").textContent;
    document.querySelector("input[name='cmt']").value = formElement.querySelector(".form-table__column--cmt>span").textContent; 
    document.querySelector("input[name='ngaySinh']").value = formElement.querySelector(".form-table__column--ngaySinh>span").textContent;
    document.querySelector("input[name='diaChi']").value = formElement.querySelector(".form-table__column--diaChi>span").textContent;
    document.querySelector("input[name='sdt']").value = formElement.querySelector(".form-table__column--sdt>span").textContent;

    saveBtn.onclick = function() {
        document.querySelector(".addBtn").style.display = "block";
        document.querySelector(".task-form").style.display = "none";
        //var id = document.querySelector("input[name='id']").value.trim();
        var ten = document.querySelector("input[name='ten']").value.trim();
        var cmt = document.querySelector("input[name='cmt']").value.trim();
        var ngaySinh = document.querySelector("input[name='ngaySinh']").value.trim();
        var diaChi = document.querySelector("input[name='diaChi']").value.trim();
        var sdt = document.querySelector("input[name='sdt']").value.trim();

        var formPatient = {
            id: id,
            ten: ten,
            cmt: cmt,
            ngaySinh: ngaySinh,
            diaChi: diaChi,
            sdt: sdt
        };
        if(id&&ten&&cmt&&ngaySinh&&diaChi&&sdt){
            handleEditPatient(formPatient,id,function(){
                getPatients(renderPatients);
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

var apiChiTietBN = "http://localhost:8080/benhnhans/info/";


function handleView(id){
    fetch(apiChiTietBN +id)
        .then(function (response) {
            return response.json();
        })
        .then(function (values) {

            emptyDataDetail(values);
            var htmls = values.map(function (value) {
                if(value.trangthai == 1){
                    var check = "đã khỏi bệnh";
                }
                else{
                    var check = "chưa khỏi bệnh";
                }
                document.querySelector(".name_text").innerHTML = value.ten; 
                return `<div class="form-table__row form-table__row--${value.id}">
                        <div class="form-table__column column-chiTietBN form-table__column--ten">
                            <span>${value.ten}</span>
                        </div>
                        <div class="form-table__column column-chiTietBN form-table__column--tenbenh">
                            <span>${value.tenbenh}</span>
                        </div>
                        <div class="form-table__column column-chiTietBN form-table__column--solankham">
                            <span>${value.solankham}</span>
                        </div>
                        <div class="form-table__column column-chiTietBN form-table__column--trangthai">
                            <span>${check}</span>
                        </div>
                        </div>`;

            });
            var viewForm = document.querySelector(".form-table__chiTietBN-content");
            viewForm.innerHTML = htmls.join('');
        })

        document.querySelector(".chiTietBN").style.display = "block";
        document.querySelector(".addBtn").style.display = "block";
        document.querySelector(".task-form").style.display = "none";
}

document.querySelector(".btn.thoat").onclick = function(){
    document.querySelector(".chiTietBN").style.display = "none";
}



