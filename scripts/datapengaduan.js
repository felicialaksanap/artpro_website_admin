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
    var id
    var idart
    $('#tablePengaduan tbody').on('click', '#edit', function () {
        id = (table.row($(this).parents('tr')).data().idpengaduan)
        idart = (table.row($(this).parents('tr')).data().idart)
        console.log("idart " + idart)
    })

    $('#btnkirimpengaduan').on("click", function() {
        updatePengajuan(id)
    })

    $('#btnkirimstatus').on('click', function() {
        updateStatus(idart)
    })

    $(window).resize(function(){
        table.draw();
    });
})

function updatePengajuan(id) {
    $.ajax({
        url: "http://127.0.0.1:1234/updatepenyelesaian",
        method: "PUT",
        data: {
            idloker: id,
            penyelesaian: $('#penyelesaian').val(),
        },
        success: function() {
            $('#table').DataTable().ajax.reload()
        },
        error: function() {
            console.log("Gagal")
        }
    })
}

function updateStatus(idart) {
    $.ajax({
        url: "http://127.0.0.1:1234/editdataverifikasi",
        method: "PUT",
        data: {
            statusverifikasi: $('#status').val(),
            alasan: $('#alasan').val(),
            iduser: idart,
        },
        success: function() {
            $('#table').DataTable().ajax.reload()
        },
        error: function() {
            console.log("Gagal")
        }
    })
}