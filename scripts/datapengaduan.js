$(document).ready(function(){
    var table
    table = $('#tablePengaduan').DataTable({
        responsive:true,
        ajax: {
            url: 'http://127.0.0.1:1234/getallpengaduan',
        },
        columns: [
            {render: function(data,type,row,meta){
                return meta.row + 1
            }},
            {data: 'namamajikan'},
            {data: 'namaart'},
            {data: 'isipengaduan'},
            {data: 'penyelesaian'},
            {data: 'tglpengaduan'},
            {
                render: function(data,type,row,meta){
                return `
                <button class="btn btn-info btn-fab btn-icon btn-round btn-sm edit" id='edit' type="button" data-bs-toggle="modal" data-bs-target="#modalpengaduan">edit</button>
                `
            }},
            {
                render: function(data,type,row,meta){
                return `
                <button class="btn btn-info btn-fab btn-icon btn-round btn-sm edit" id='edit' type="button" data-bs-toggle="modal" data-bs-target="#modalhukuman">edit</button>
                `
            }}
        ]
    })

    $(window).resize(function(){
        table.draw();
    });
})