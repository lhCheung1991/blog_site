"use strict";

$(function()
{
    var $categoryol = $("#category");
    var $header2 = $("h2");
    
    for (var idx = 0; idx < $header2.length; idx++)
    {
        $($header2[idx]).append('<a name=h2' + idx + '></a>');
        $categoryol.append('<li>' + '<a href="#h2' + idx + '">' + $($header2[idx]).text() + '</a>' + '</li>');
    }
    
    var ue = UE.getEditor('container', 
    {
        serverUrl: "/blogs/commenteditor/controller",    // request ueditor config.json
        initialFrameHeight: 200,
        elementPathEnabled : false,
        toolbars: [["bold","italic","underline","fontborder","strikethrough",'superscript', 'subscript',
        "forecolor","backcolor","justifyleft","justifycenter","justifyright","justifyjustify","fontfamily",
        "fontsize","simpleupload","emotion","insertcode","removeformat","unlink","link","undo","redo"]]
    });
    
});