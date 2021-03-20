function start(){
    getNurses(renderNurses);

    handleCreateNurses();

}
var Api = 'http://localhost:8080/ytas';
// var Api = " http://localhost:3000/nurses";

start();

// Search
function search(){
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
                <div class="form-table__column column-nurse form-table__column--id">
                    <span>${data.id}</span>
                </div>
                <div class="form-table__column column-nurse form-table__column--ten">
                    <span>${data.ten}</span>
                </div>
                <div class="form-table__column column-nurse form-table__column--cmt">
                    <span>${data.cmt}</span>
                </div>
                <div class="form-table__column column-nurse form-table__column--ngaySinh">
                    <span>${data.ngaySinh.slice(0, 10)}</span>
                </div>
                <div class="form-table__column column-nurse form-table__column--diaChi">
                    <span>${data.diaChi}</span>
                </div>
                <div class="form-table__column column-nurse form-table__column--thamNien">
                    <span>${data.thamNien}</span>
                </div>
                <div class="form-table__column column-nurse form-table__column--trinhDo">
                    <span>${data.trinhDo}</span>
                </div>
                <div class="form-table__column column-nurse form-table__column--sdt">
                    <span>${data.sdt}</span>
                </div>
                <div class="form-table__column column-nurse">
                    <button class="edit" onclick = "editNurse(${data.id})">
                        <i class="fas fa-pencil-alt edit-item"></i>
                    </button>
                    <button class="delete" onclick = "handleDeleteNurse(${data.id})">
                        <i class="fas fa-trash-alt delete-item"></i>
                    </button>
                </div>
            </div>`;
            
            });
            var nursesForm = document.querySelector(".form-table__nurses-content");
            nursesForm.innerHTML = htmls.join("");

        })

}

// GET
function getNurses(callback){
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

// renderNurses
function renderNurses(datas) {

    emptyData(datas);

    var htmls = datas.map(function(data){
        return `<div class="form-table__row form-table__row--${data.id}">
                    <div class="form-table__column column-nurse form-table__column--id">
                        <span>${data.id}</span>
                    </div>
                    <div class="form-table__column column-nurse form-table__column--ten">
                        <span>${data.ten}</span>
                    </div>
                    <div class="form-table__column column-nurse form-table__column--cmt">
                        <span>${data.cmt}</span>
                    </div>
                    <div class="form-table__column column-nurse form-table__column--ngaySinh">
                        <span>${data.ngaySinh.slice(0, 10)}</span>
                    </div>
                    <div class="form-table__column column-nurse form-table__column--diaChi">
                        <span>${data.diaChi}</span>
                    </div>
                    <div class="form-table__column column-nurse form-table__column--thamNien">
                        <span>${data.thamNien}</span>
                    </div>
                    <div class="form-table__column column-nurse form-table__column--trinhDo">
                        <span>${data.trinhDo}</span>
                    </div>
                    <div class="form-table__column column-nurse form-table__column--sdt">
                        <span>${data.sdt}</span>
                    </div>
                    <div class="form-table__column column-nurse">
                        <button class="edit" onclick = "editNurse(${data.id})">
                            <i class="fas fa-pencil-alt edit-item"></i>
                        </button>
                        <button class="delete" onclick = "handleDeleteNurse(${data.id})">
                            <i class="fas fa-trash-alt delete-item"></i>
                        </button>
                    </div>
                </div>`;
                // onclick = "handleDeleteDoctor(${doctor.id})"
                // alert("hello")
    });
    var nursesForm = document.querySelector(".form-table__nurses-content");
    nursesForm.innerHTML = htmls.join(""); 
}

// CREATE - POST

function createNurses (data,callback){
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
    document.querySelector("input[name='thamNien']").value = '';
    document.querySelector("input[name='trinhDo']").value = '';
}

function handleCreateNurses(){
    document.querySelector(".addBtn").onclick = function(){

        clearForm();

        document.querySelector(".task-form").style.display = "block";
        document.querySelector(".addBtn").style.display = "none";

    };
    var createBtn = document.querySelector('.create');
    createBtn.onclick = function() {
        document.querySelector(".addBtn").style.display = "block";
        document.querySelector(".task-form").style.display = "none";
        
        var ten = document.querySelector("input[name='ten']").value.trim();
        var cmt = document.querySelector("input[name='cmt']").value.trim();
        var ngaySinh = document.querySelector("input[name='ngaySinh']").value.trim();
        var diaChi = document.querySelector("input[name='diaChi']").value.trim();
        var thamNien = document.querySelector("input[name='thamNien']").value.trim();
        var trinhDo = document.querySelector("input[name='trinhDo']").value.trim();
        var sdt = document.querySelector("input[name='sdt']").value.trim();

        var formNurse = {
            //id: id,
            ten: ten,
            cmt: cmt,
            ngaySinh: ngaySinh,
            diaChi: diaChi,
            thamNien: thamNien,
            trinhDo: trinhDo,
            sdt: sdt
        };
        if(ten&&cmt&&ngaySinh&&diaChi&&thamNien&&trinhDo&&sdt){
            createNurses(formNurse,function(){
                getNurses(renderNurses);
            });
        }
        else {
            alert("Vui lòng nhập đầy đủ thông tin vào form!!!")
        }

        clearForm();
    }
}

// Delete 

function handleDeleteNurse(id) {
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
            if(row){
                row.remove();
            }
        })
}

// Edit - PUT

function handleEditNurse(data,id,callback){
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

function editNurse(id){
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
    document.querySelector("input[name='thamNien']").value = formElement.querySelector(".form-table__column--thamNien>span").textContent;
    document.querySelector("input[name='trinhDo']").value = formElement.querySelector(".form-table__column--trinhDo>span").textContent;
    document.querySelector("input[name='sdt']").value = formElement.querySelector(".form-table__column--sdt>span").textContent;

    saveBtn.onclick = function() {
        document.querySelector(".addBtn").style.display = "block";
        document.querySelector(".task-form").style.display = "none";
        //var id = document.querySelector("input[name='id']").value.trim();
        var ten = document.querySelector("input[name='ten']").value.trim();
        var cmt = document.querySelector("input[name='cmt']").value.trim();
        var ngaySinh = document.querySelector("input[name='ngaySinh']").value.trim();
        var diaChi = document.querySelector("input[name='diaChi']").value.trim();
        var thamNien = document.querySelector("input[name='thamNien']").value.trim();
        var trinhDo = document.querySelector("input[name='trinhDo']").value.trim();
        var sdt = document.querySelector("input[name='sdt']").value.trim();

        var formNurse = {
            id: id,
            ten: ten,
            cmt: cmt,
            ngaySinh: ngaySinh,
            diaChi: diaChi,
            thamNien: thamNien,
            trinhDo: trinhDo,
            sdt: sdt
        };
        if(id&&ten&&cmt&&ngaySinh&&diaChi&&thamNien&&trinhDo&&sdt){
            handleEditNurse(formNurse,id,function(){
                getNurses(renderNurses);
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



