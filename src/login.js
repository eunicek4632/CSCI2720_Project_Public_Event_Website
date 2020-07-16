function verify() {
    var username1 = document.getElementById("username").value;
    var password1 = document.getElementById("pw").value;
    if (username1 == '' || password1 == '')
        alert("You cannot leave any of the fields empty");
    else {
        //initiate HTTP request to verify user
        //$.ajax({
        //url: "",
        //type: "POST"
        //})
        //.done(function(txt) { // run if request is completed successfully
        //$("#text").html(txt);
        //})
        user.findOne()
            .where({ username: username1 })
            .exec(function(err, e) {
                if (e.password == password1) {
                    alert("Logged in.");
                } else {
                    alert("Password incorrect.");
                    document.getElementById("pw").value = "";
                }
            })
            .catch(function(err) {
                // handle error
                alert("Username incorrect.");
            });


    }
}