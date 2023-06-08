$(document).ready(function(){
    var table
    table = $('#tableBerita').DataTable({
        responsive:true,
        ajax: {
            url: 'http://127.0.0.1:1234/getallberita',
              
        },
        columns: [
            {render: function(data,type,row,meta){
                return meta.row + 1
            }},
            {data: 'judul'},
            {data: 'isi'},
            {data: 'url'},
            {data: 'tglpost'},
            {data: 'idberita',
            render: function(data,type,row,meta){
                return `
                <button type="button" id="berita" class="btn" style="background-color: transparent">
                    <img src="http://127.0.0.1:1234/getimage?id=${data}&folder=berita" class="rounded" alt="berita" width="100px" height="100px">
                </button>
                `
            }
            },
            {
                render: function(data,type,row,meta){
                return `
                <button class="btn btn-info btn-fab btn-icon btn-round btn-sm edit" id='edit' type="button" data-bs-toggle="modal" data-bs-target="#modalberita">edit</button>
                `
            }}
        ]
    });

    $('#tableBerita tbody').on( 'click', '#berita', function () {
        var id = table.row($(this).parents('tr')).data().idberita
        $('#img_data').html("")
        $('#img_data').append(`
        <img src="http://127.0.0.1:1234/getimage?id=${id}&folder=berita" class="rounded" alt="berita" width="470px" height="400px">
        `)
        $('#modalberitagambar').modal("show")
    });

    $("#btnkirim").on("click", function () {
        kirimData()
    })


    $(window).resize(function(){
        table.draw();
    });
})

// Get the current date
var currentDate = new Date();

// Format the date string
var formattedDate = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear();

function kirimData() {
    console.log(formattedDate)
    $.ajax({
        url: "http://127.0.0.1:1234/addberitatips",
        method: "POST",
        data: { 
            judul : $("#judul").val(),
            isi : $("#isi").val() ,
            url : $('#url').val(),
            tglpost : formattedDate
        },
        success: function() {
            console.log("Masuk")
            $("#table").DataTable().ajax.reload()
        },
        error: function() {
            console.log("Gagal")
        }
        
      });
}