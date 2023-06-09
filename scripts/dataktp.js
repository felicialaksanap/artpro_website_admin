$(document).ready(function(){
    var table
    table = $('#tableVerifikasi').DataTable({
        responsive:true,
        ajax: {
            url: 'http://127.0.0.1:1234/alldataverifikasi',
              
        },
        columns: [
            {render: function(data,type,row,meta){
                return meta.row + 1
            }},
            {data: 'nik'},
            {data: 'namalengkap'},
            {data: 'tempatlahir'},
            {data: 'tanggallahir'},
            {data: 'jeniskelamin'},
            {data: 'alamat'},
            {data: 'kecamatan'},
            {data: 'kelurahan'},
            {
                data:{},
                render: function(data){
                return data.rt +" / "+data.rw
            }},
            {data: 'iduser',
            render: function(data,type,row,meta){
                return `
                <button type="button" id="fotoktp" class="btn" style="background-color: transparent">
                    <img src="http://127.0.0.1:1234/getimage?id=${data}&folder=fotoktp" class="rounded" alt="fotoktp" width="100px" height="100px">
                </button>
                `
            }},
            {data: 'iduser',
            render: function(data,type,row,meta){
                return `
                <button type="button" id="selfiektp" class="btn" style="background-color: transparent">
                    <img src="http://127.0.0.1:1234/getimage?id=${data}&folder=selfiektp" class="rounded" alt="selfiektp" width="100px" height="100px">
                </button>
                `
            }
            },
            {data: 'statusverifikasi'},
            {data: 'alasan'}, 
            {
                render: function(data,type,row,meta){
                    return `
                    <button class="btn btn-info btn-fab btn-icon btn-round btn-sm edit" id='edit' type="button" data-bs-toggle="modal" data-bs-target="#modalktp">edit</button>
                    `
                }
            }
        ]
    });
    var id
    $('#tableVerifikasi tbody').on( 'click', '#edit', function () {
        id = (table.row($(this).parents('tr')).data().iduser);
         
    } );

    $("#btnkirim").on("click", function () {
        updateData(id)
    })

    $('#tableVerifikasi tbody').on( 'click', '#selfiektp', function () {
        console.log("selfie ktp")
        var id = table.row($(this).parents('tr')).data().iduser
        $('#img_data').html("")
        $('#img_data').append(`
        <img src="http://127.0.0.1:1234/getimage?id=${id}&folder=selfiektp" class="rounded" alt="selfiektp" width="470px" height="400px">
        `)
        $('#modalfotoktp').modal("show")
    } );

    $('#tableVerifikasi tbody').on( 'click', '#fotoktp', function () {
        console.log("foto ktp")
        var id = table.row($(this).parents('tr')).data().iduser
        $('#img_data').html("")
        $('#img_data').append(`
        <img src="http://127.0.0.1:1234/getimage?id=${id}&folder=fotoktp" class="rounded" alt="selfiektp" width="470px" height="400px">
        `)
        $('#modalfotoktp').modal("show")
    } );

    $(window).resize(function(){
        table.draw();
    });
})

function updateData(id) {
    console.log($("#status").val())
    console.log($("#alasan").val())
    $.ajax({
        url: "http://127.0.0.1:1234/editdataverifikasi",
        method: "PUT",
        data: { 
            statusverifikasi : $("#status").val(),
            alasan : $("#alasan").val() ,
            iduser : id,
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
