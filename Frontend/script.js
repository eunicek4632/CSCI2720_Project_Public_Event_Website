
var fav = [1];

$(document).ready(function(){
    //history.pushState( null, null, 'login');
    //window.addEventListener("popstate");
    //toggle favourites

    $(document).on("click","button.like", function(){
        var id = $(this).attr("id");
        var index = fav.indexOf(id);
        
        
        //if the event is not one of favourites
        if(index == -1){
            $(this).html("Add to Favourites");
            fav.push(id);
        }
        else{
            $(this).html("Undo Favourites");
            fav.splice(id, 1);
        }
    });
    //when any event is clicked
    $(document).on("click","tr", function(){
        var id = $(this).attr("id");
        var att = $(this).find("div").html();
        alert(data[id].name);
        alert(att);
        if (x.style.display === "none") {
            x.style.display = "block";
          } else {
            x.style.display = "none";
          }
        
    });
});

var data;
function login(){
    $.ajax({
        url: "data.txt",
        type: "GET"
    })
    .done(function(txt) {
        //get data
        //create each table row
        data = JSON.parse(txt);
        $.ajax({
            url: "Home.html",
            type: "GET"
        })
        .done(function(txt){
            $("#main").html(txt);
            data.map((e, index)=>{
                var $temp = $('<tr id="'+ index +'">\
                <th scope="row" class="p-3">'+e.event_summary+'</th>\
                <td class="p-3 ">'+e.event_location+'</td>\
                <td class="p-3 ">'+e.event_date+'</td>\
                <td class="p-3 ">'+ e.event_org + '</td>\
                <td class="p-3"><button></button></td>');
                
                if(fav.indexOf(e.id) == -1){
                    $temp.find("button").html("Add to Favourites");
                }
                else{
                    $temp.find("button").html("Undo Favourites");
                }
                $temp.find("button").attr("id",index);
                $temp.find("button").addClass("like");

                $("#evts").append($temp);
            });
        });
    });
}
function fav(){
    $.ajax({
        url: "favourites.html",
        type: "GET"
    })
    .done(function(txt){
        $("#main").html(txt);
    });
}

function show(){
    alert(history.length);
}

function verify(){
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    if(user == '' || pass == '')
        alert("You cannot leave any of the fields empty");
    else{
        //initiate HTTP request to verify user
        $.ajax({
        url: "",
        type: "POST"
        })
        .done(function(txt) { // run if request is completed successfully
        $("#text").html(txt);
        })
    }
}