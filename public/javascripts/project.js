$(document).ready(function(){
    $.getJSON("http://localhost:3000/employee/fetchallcities",function(data){
       // alert(JSON.stringify(data))
    data.result.map((item)=>{
        $('#city').append($('<option>').text(item.cityname).val(item.cityid))
    })
    })
    })

    $(document).ready(function(){
        $.getJSON("http://localhost:3000/employee/fetchallstate",function(data){
           // alert(JSON.stringify(data))
        data.result.map((item)=>{
            $('#state').append($('<option>').text(item.statename).val(item.stateid))
        })
        })
        })