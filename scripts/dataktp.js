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
            {data: 'fotoktp'},
            {data: 'selfiektp'},
            {data: 'statusverifikasi'},
            {
                render: function(data,type,row,meta){
                    return `
                    <button class="btn btn-danger btn-fab btn-icon btn-round btn-sm edit" id='edit' type="button">edit</button>
                    `
                }
            }
        ]
    });
    
    $('#tableVerifikasi tbody').on( 'click', '#edit', function () {
        console.log(table.row($(this).parents('tr')).data().iduser);
         
    } );
    // $.ajax({
    //     url: 'http://127.0.0.1:1234/alldataverifikasi',
    //     dataType: 'json',
    //     success: function(dataset) {
    //         var data = []
    //         var n = 1
    //         for(let i of dataset){
    //             data = []
    //             data.push(n);
    //             data.push(i['nik'])
    //             data.push(i['tempatlahir'])
    //             data.push(i['tanggallahir'])
    //             data.push(i['alamat'])
    //             data.push(i['kecamatan'])
          
    //             // if(i['status'] == false){
    //             //   data.push("Waiting List")
    //             // }
    //             // else{
    //             //   data.push("On Board")
          
    //             // }
    //             // data.push(i['platno'])
    //             n += 1
    //             table.row.add(data)
    //           }
    //     },
    //     error: function(xhr, status, error) {
    //         // Handle error
    //         try {
    //             console.log(xhr.responseText);
    //         } catch (e) {
    //             console.log("An error occurred while handling the response: " + e);
    //         }
    //     },
    //     complete: function() {
    //         // Handle complete
    //         table.draw()
    //     }
    // });
    
    $(window).resize(function(){
        table.draw();
    });
})
