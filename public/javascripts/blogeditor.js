"use strict";

$(function ()
{
    /************get all blog collections*************/
    function getAllBlogCollections()
    {
        $.ajax("/admin/blogeditor/blogcollections/checkout", {
            method: "get",
        })
        .done(function(data)
        {
            updateBlogCollectionsSelect(data);
        })
        .fail(function(xhr, status)
        {
            
        });
    }

    function updateBlogCollectionsSelect(collections)
    {
        $("#chooseCollectionSelect").empty();
        $("#deleteCollectionSelect").empty();
        for (let idx = 0; idx < collections.length; idx++)
        {
            $("#chooseCollectionSelect").append('<option value="' + collections[idx]._id + '">' + collections[idx].title + "</option>");
            $("#deleteCollectionSelect").append('<option value="' + collections[idx]._id + '">' + collections[idx].title + "</option>");
        }
    }
    /************get all blog collections*************/
    
    var ue = UE.getEditor('container', 
    {
        serverUrl: "/admin/blogeditor/controller",    // request ueditor config.json
        initialFrameHeight: 500
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
        // get all blog collection
        getAllBlogCollections();
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
            newBlog.blogCollectionId = $("#chooseCollectionSelect option:selected").val();
            
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
                window.setTimeout(function()
                {
                    $(".alert.alert-success").slideUp("slow");
                },
                2000);
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
            $(".alert.alert-info").slideDown("slow");
            
            var updatedBlogObj = {};
            updatedBlogObj.title = $("#titleInput").val();
            updatedBlogObj.content = ue.getContent();
            updatedBlogObj.blogCollectionId = $("#chooseCollectionSelect option:selected").val();
            
            $.ajax("/admin/blogeditor/updateblog/pushupdatedblog", {
                method: "post",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data: {blogId: blogIdString, updatedBlog: updatedBlogObj}
            })
            .done(function(data)
            {
                $(".alert.alert-info").hide();
                $(".alert.alert-success").slideDown("slow");
                window.setTimeout(function()
                {
                    $(".alert.alert-success").slideUp("slow");
                },
                2000);
            })
            .fail(function(xhr, status)
            {
                console.log("Update blog failed");
                $(".alert.alert-info").hide();
                $(".alert.alert-danger").slideDown("slow");
            });
        }
    });
    
    /******************add collection button***************/
    $("#addCollectionBtn").bind("click", function ()
    {
        $(".alert.alert-info").slideDown("slow");
        
        var newCollectionTitle = $("#collectionInput").val();
        $.ajax("/admin/blogeditor/newcollection", {
            method: "post",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: {title: newCollectionTitle}
        })
        .done(function(data)
        {
            $(".alert.alert-info").hide();
            $(".alert.alert-success").slideDown("slow");
            getAllBlogCollections();
            window.setTimeout(function()
            {
                $(".alert.alert-success").slideUp("slow");
            },
            2000);
        })
        .fail(function(xhr, status)
        {
            $(".alert.alert-info").hide();
            $(".alert.alert-danger").slideDown("slow");
        });
    });
    /******************add collection button***************/
    
    /******************delete collection button***************/
    $("#deleteCollectionBtn").bind("click", function()
    {
        $(".alert.alert-info").slideDown("slow");
        
        var collectionId = $("#deleteCollectionSelect option:selected").val();
        $.ajax("/admin/blogeditor/blogcollections/removecollection", {
            method: "post",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: {_id: collectionId}
        })
        .done(function(data)
        {
            $(".alert.alert-info").hide();
            $(".alert.alert-success").slideDown("slow");
            getAllBlogCollections();
            window.setTimeout(function()
            {
                $(".alert.alert-success").slideUp("slow");
            },
            2000);
        })
        .fail(function(xhr, status)
        {
            $(".alert.alert-info").hide();
            $(".alert.alert-danger").slideDown("slow");
        });
    });
    /******************delete collection button***************/
    
}
);
