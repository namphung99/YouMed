function start(){
    getMedicines(renderMedicines);

    handleCreateMedicines();

}
var Api = 'http://localhost:8080/thuocs';
// var Api = "http://localhost:3000/medicines";

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
                <div class="form-table__column column-medicine form-table__column--id">
                    <span>${data.id}</span>
                </div>
                <div class="form-table__column column-medicine form-table__column--ten">
                    <span>${data.ten}</span>
                </div>
                <div class="form-table__column column-medicine form-table__column--donGia">
                    <span>${data.donGia}</span>
                </div>
                <div class="form-table__column column-medicine">
                    <button class="edit" onclick = "editMedicine(${data.id})">
                        <i class="fas fa-pencil-alt edit-item"></i>
                    </button>
                    <button class="delete" onclick = "handleDeleteMedicine(${data.id})">
                        <i class="fas fa-trash-alt delete-item"></i>
                    </button>
                </div>
            </div>`;
            
            });
            var medicinesForm = document.querySelector(".form-table__medicines-content");
            medicinesForm.innerHTML = htmls.join("");

        })
}

// GET
function getMedicines(callback){
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

// render
function renderMedicines(datas) {
    emptyData(datas);
    var htmls = datas.map(function(data){
        return `<div class="form-table__row form-table__row--${data.id}">
                    <div class="form-table__column column-medicine form-table__column--id">
                        <span>${data.id}</span>
                    </div>
                    <div class="form-table__column column-medicine form-table__column--ten">
                        <span>${data.ten}</span>
                    </div>
                    <div class="form-table__column column-medicine form-table__column--donGia">
                        <span>${data.donGia}</span>
                    </div>
                    <div class="form-table__column column-medicine">
                        <button class="edit" onclick = "editMedicine(${data.id})">
                            <i class="fas fa-pencil-alt edit-item"></i>
                        </button>
                        <button class="delete" onclick = "handleDeleteMedicine(${data.id})">
                            <i class="fas fa-trash-alt delete-item"></i>
                        </button>
                    </div>
                </div>`;
                
    });
    var medicinesForm = document.querySelector(".form-table__medicines-content");
    medicinesForm.innerHTML = htmls.join('');
}

// CREATE - POST

function createMedicines (data,callback){
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
            response.json();
        })
        .then(callback)
        
}

function clearForm() {
    ten = document.querySelector("input[name='ten']").value = '';
    donGia = document.querySelector("input[name='donGia']").value = '';
}

function handleCreateMedicines(){
    document.querySelector(".addBtn").onclick = function(){

        clearForm();

        document.querySelector(".task-form").style.display = "block";
        document.querySelector(".addBtn").style.display = "none";

    };
    var createBtn = document.querySelector('.create');
    createBtn.onclick = function() {

        clearForm();

        var ten = document.querySelector("input[name='ten']").value.trim();
        var donGia = document.querySelector("input[name='donGia']").value.trim();

        var formMedicine = {
            //id: id,
            ten: ten,
            donGia: donGia
        };
        console.log("respon : ",formMedicine);

        

        if(ten&&donGia){
            createMedicines(formMedicine,function(){
                getMedicines(renderMedicines);
            });
        }
        else {
            alert("Vui lòng nhập đầy đủ thông tin vào form!!!")
        }
    }
}

// Delete 

function handleDeleteMedicine(id) {
    var option = {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
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
                getMedicines(renderMedicines);
            }
        });
}

// Edit - PUT

function handleEditMedicine(data,id,callback){
    var option = {
        //credentials: 'include',
        method: "PUT",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
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

function editMedicine(id){
    document.querySelector(".addBtn").style.display = "none";
    document.querySelector(".task-form").style.display = "block";
    var createBtn = document.querySelector(".create");
    createBtn.style.display = "none";
    var saveBtn = document.querySelector(".update--save");
    saveBtn.style.display = "block";
    var formElement = document.querySelector(".form-table__row--"+id);

    document.querySelector("input[name = 'ten']").value = formElement.querySelector(".form-table__column--ten>span").textContent;
    document.querySelector("input[name='donGia']").value = formElement.querySelector(".form-table__column--donGia>span").textContent; 
    

    saveBtn.onclick = function() {
        document.querySelector(".addBtn").style.display = "block";
        document.querySelector(".task-form").style.display = "none";
        var ten = document.querySelector("input[name='ten']").value.trim();
        var donGia = document.querySelector("input[name='donGia']").value.trim();
        

        var formMedicine = {
            id: id,
            ten: ten,
            donGia: donGia
        };
        console.log("this : ",formMedicine);


        if(id&&ten&&donGia){
            handleEditMedicine(formMedicine,id,function(){
                getMedicines(renderMedicines);
            });
            createBtn.style.display = "block";
            saveBtn.style.display = "none";
        }
        else {
            alert("Vui lòng nhập đầy đủ thông tin vào form!!!");
        }
        clearForm();
    }
}



