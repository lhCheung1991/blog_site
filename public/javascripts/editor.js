"use strict";

$(function ()
{
    var ue = UE.getEditor('container', 
    {
        serverUrl: "/admin/edit/control", 
        initialFrameHeight: 300
    });
    console.log(ue.getOpt("serverUrl")); 
    ue.on("serverConfigLoaded", function(){console.log(ue.getOpt("imageActionName"));});
    
    $("#publishBtn").bind("click", function()
        {
            console.log("click Publish button " + ue.getContent());
            $(".alert.alert-info").hide();
            $(".alert.alert-info").slideDown("slow");
            $.ajax("/admin/edit/store", 
            {
                method: "post",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data: {content: ue.getContent()}
            }).done(function(data)
            {
                $(".alert.alert-info").hide();
                $(".alert.alert-success").slideDown("slow");
            }).fail(function(xhr, status)
            {
                $(".alert.alert-info").hide();
                $(".alert.alert-danger").slideDown("slow");
            }).always(function()
            {
                console.log("click Publish button always");
            });
        }
    );
}
);
