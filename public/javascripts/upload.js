$(function () {
    $(".delrec").click(function () {
        var id = $(this).attr("id");
        $.ajax({
            url:'/deleterecord',
            type:"delete",
            data:{'id':id},
            success: function(data){
                // console.log(data);
                location.reload(true);
            }
        });
    });

});

function ajaxFileUpload(page){
    var path = $("#file").val();
    // console.log(path);
    if(!checkphoto(path)){
        $('#err').text('not photo');
        return false;
    }

    var formData = new FormData();
    var img_file = document.getElementById("file");
    var fileObj = img_file.files[0];
    formData.append('file',fileObj);
    formData.append('description',"hhhhh");
    $.ajax({
        url: '/'+page+'/photo',
        data: formData,
        type : 'post',
        contentType: false,
        processData : false,
        success: function(data){
            $('#img').attr("src",data);
            $("#img").show();
            $('#purl').attr("value",data);
        },
    });
    return true;
}

function checkphoto(path) {
    var photoname;
    if(path.indexOf("\\")>0){
        photoname=path.substring(path.lastIndexOf("\\")+1,path.length);
    }else{photoname=path;}
    var i = photoname.lastIndexOf('.');
    var suffix = photoname.substring(i,photoname.length).toUpperCase();
    if(suffix!='.PNG'&&suffix!='.GIF'&&suffix!='.JPG'&&suffix!='.JPEG'&&suffix!='.BMP'){
        return false;
    }
    return true;
}

function put(string) {
    var item = string.replace(new RegExp('&quot;','g'),'"');
    item = JSON.parse(item);
    console.log(item);
    if(item!=null&&item!=undefined){
        // document.getElementsByName('name').value = item.name;
        // document.getElementsByName('price').value = item.price;
        // document.getElementsByName('amount').value = item.amount;
        // document.getElementsByName('description').value = item.description;
        $('#name').attr('value',item.name);
        $('#price').attr('value',item.price);
        $('#amount').attr('value',item.amount);
        $('#description').text(item.description);
        $('#purl').attr('value',item.purl);
        $('#img').attr('src','../'+item.purl);
        $('#img').attr('style','display:block');
        // console.log(item.name);
        // document.getElementsByName('name').innerHTML = item.name;
    }
}