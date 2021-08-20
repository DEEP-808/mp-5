const { get } = require("cheerio/lib/api/traversing");

$(function() {
    console.log("Hello from js")
    $("#loginbtn").click(function(){
        console.log('button clicked');
    });
    let username=$("#usrname").html();
    console.log(username);
    $.ajax({
        url: `https://${window.location.host}/api/users/${usrname}`, 
        type: GET,
        success : function(result)
        {
            console.log(result);
        },
        error: function ( error )
        {
            console.log( error );
        }
    });
})