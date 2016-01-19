"use strict";

$(function ()
{
    var ue = UE.getEditor('container', 
    {
        serverUrl: "/admin/editor/control",    // request ueditor config.json
        initialFrameHeight: 300
    });
    
    console.log(ue.getOpt("serverUrl")); 
    ue.on("serverConfigLoaded", function(){console.log("Ueditor config.json loaded");});
    
    $("#publishBtn").bind("click", function()
        {
            $(".alert.alert-info").hide();
            $(".alert.alert-info").slideDown("slow");
            
            var blog = {};
            blog.title = $("#titleInput").val();
            blog.content = ue.getContent();
            console.log("click Publish button " + blog.title);   
            
            // post the blog
            $.ajax("/admin/editor/store", 
            {
                method: "post",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data: blog
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
