function verify() {
    var username1 = document.getElementById("username").value;
    var password1 = document.getElementById("pw").value;
    if (username1 == '' || password1 == '')
        alert("You cannot leave any of the fields empty");
    else {
            
            $.ajax({
              url: "/operation/login",
              type: "POST",
              // dataType: "text",

              success: function(response) {
                // push html file data into history
                history.pushState(response,null,"/operation/login");
                console.log('the page is loaded'+ response)
              },
              error: function(error){
                console.log('the operation was not loaded',error);
              },
              complete: function(xhr, status){
                console.log("the request is completed");
              }
            });


    }
}