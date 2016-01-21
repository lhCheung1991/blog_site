"use strict";

$(function ()
{
    var ue = UE.getEditor('container', 
    {
        serverUrl: "/admin/blogeditor/controller",    // request ueditor config.json
        initialFrameHeight: 300
    });
    
    ue.on("serverConfigLoaded", function()
    {
        console.log("Ueditor config.json loaded");
    });
    
    ue.on("ready", function()
    {
        var blogIdString = $("#blogIdSpan").html();
        if (blogIdString !== "######")
        {
            console.log("Editing old blog");
            $.ajax("/admin/blogeditor/updateblog/pullout", {
                method: "get",
                data: {blogId: blogIdString}
            })
            .done(function (data)
            {
                $("#titleInput").val(data.title);
                ue.setContent(data.content);
            })
            .fail(function (xhr, status)
            {
                
            })
            .always(function ()
            {
                console.log("Pull out old blog data");
            });
        }
        else
        {
            console.log("A new blog");
        }
    });
    
    $("#publishBtn").bind("click", function ()
    {
        var blogIdString = $("#blogIdSpan").html();
        if (blogIdString === "######")    // add a new blog
        {
            $(".alert.alert-info").slideDown("slow");
            
            var newBlog = {};
            newBlog.title = $("#titleInput").val();
            newBlog.content = ue.getContent();
            
            $.ajax("/admin/blogeditor/newblog/pushnewblog", {
                 method: "post",
                 contentType: "application/x-www-form-urlencoded; charset=UTF-8", 
                 data: newBlog
            })
            .done(function (data)
            {
                console.log("Save new blog successfully");
                $(".alert.alert-info").hide();
                $(".alert.alert-success").slideDown("slow");
            })
            .fail(function (xhr, status)
            {
                console.log("Save new blog failed");
                $(".alert.alert-info").hide();
                $(".alert.alert-danger").slideDown("slow");
            });
        }
        else    // update a blog
        {
            
        }
    });
}
);
