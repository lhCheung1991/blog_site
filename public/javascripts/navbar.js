"use strict";

$(function ()
{
    /************get blog collections list*************/
    function getBlogCollectionList()
    {   
        $.ajax("/navbar/blogcollectionlist/checkout", {
            method: "get",
        })
        .done(function (data)
        {
            var $blogCollectionList = $("#blog-colleciton-list");
            for (let idx = 0; idx < data.length; idx++)
            {
                $blogCollectionList.append('<li><a href=/index?pageNum=1&blogCollectionId="' + data[idx]._id+ '">' + data[idx].title + '</a></li>');
            }
            
        })
        .fail(function (xhr, status)
        {
            
        });
    }
    
    getBlogCollectionList();
    /************get blog collections list*************/
});