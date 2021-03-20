function CRUD(options){
    var API = options.API;
    
    function start() {
        getData(render);
    }
    start();

    function getData(callback){
        fetch(API)
            .then(response => response.json())
            .then(callback);
    }

    function emptyData(datas){
        if(datas.length === 0){
            document.querySelector(".empty-data").style.display = "block";
            document.querySelector(".addBtn").style.display = "none";
    
            document.querySelector(".empty-data--add").onclick = function(){
                document.querySelector(".empty-data").style.display = "none";
                document.querySelector(".task-form").style.display = "block";
            }
        }
    }
    
    function render(datas){
        emptyData(datas);

        var htmls = datas.map(function (data) {
            return `<div class="form-table__row form-table__row--${data.id}">
                        <div class="form-table__column column-data ${options.id}">
                            <span>${data.id}</span>
                        </div>
                        <div class="form-table__column column-data ${options.ten}">
                            <span>${data.ten}</span>
                        </div>
                        <div class="form-table__column column-data ${options.cmt}">
                            <span>${data.cmt}</span>
                        </div>
                        <div class="form-table__column column-data ${options.ngaySinh}">
                            <span>${data.ngaySinh.slice(0, 10)}</span>
                        </div>
                        <div class="form-table__column column-data ${options.diaChi}">
                            <span>${data.diaChi}</span>
                        </div>
                        <div class="form-table__column column-data ${options.bacNghe}">
                            <span>${data.bacNghe}</span>
                        </div>
                        <div class="form-table__column column-data ${options.thamNien}">
                            <span>${data.thamNien}</span>
                        </div>
                        
                        <div class="form-table__column column-data ${options.chuyenMon}">
                            <span>${data.chuyenMon}</span>
                        </div>
                        <div class="form-table__column column-data ${options.sdt}">
                            <span>${data.sdt}</span>
                        </div>
                        <div class="form-table__column column-data">
                            <button class="edit" onclick = "edit(${data.id})">
                                <i class="fas fa-pencil-alt edit-item"></i>
                            </button>
                            <button class="delete" onclick = "handleDelete(${data.id})">
                                <i class="fas fa-trash-alt delete-item"></i>
                            </button>
                        </div>
                    </div>`;
            // onclick = "handleDeleteDoctor(${doctor.id})"
            // alert("hello")
        });
        var formContent = document.querySelector(`{options.formContent}`);
        formContent.innerHTML = htmls.join("");
    }
}