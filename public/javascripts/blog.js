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
    
    function path() {
        var args = arguments,
        result = [];
        for(var i = 0; i < args.length; i++)
            result.push(args[i].replace('@', 'ueditor/third-party/SyntaxHighlighter/syntaxhighlighter/scripts/'));
        return result;
    };
    SyntaxHighlighter.autoloader.apply(null, path(
    'applescript            @shBrushAppleScript.js',
    'actionscript3 as3      @shBrushAS3.js', 
    'bash shell             @shBrushBash.js', 
    'coldfusion cf          @shBrushColdFusion.js',
    'cpp c                  @shBrushCpp.js',
    'c# c-sharp csharp      @shBrushCSharp.js', 
    'css                    @shBrushCss.js', 
    'delphi pascal          @shBrushDelphi.js', 
    'diff patch pas         @shBrushDiff.js', 
    'erl erlang             @shBrushErlang.js',
    'groovy                 @shBrushGroovy.js', 
    'java                   @shBrushJava.js',
    'jfx javafx             @shBrushJavaFX.js', 
    'js jscript javascript  @shBrushJScript.js',
    'perl pl                @shBrushPerl.js',
    'php                    @shBrushPhp.js', 
    'text plain             @shBrushPlain.js', 
    'py python              @shBrushPython.js',
    'ruby rails ror rb      @shBrushRuby.js',
    'sass scss              @shBrushSass.js',
    'scala                  @shBrushScala.js',
    'sql                    @shBrushSql.js', 
    'vb vbnet               @shBrushVb.js',
    'xml xhtml xslt html    @shBrushXml.js'
    ));
    SyntaxHighlighter.defaults['smart-tabs'] = true;
    SyntaxHighlighter.defaults['tab-size'] = 4;
    SyntaxHighlighter.all();
    
    var defaultEditor = UE.getEditor('container-default', 
    {
        serverUrl: "/blogs/commenteditor/controller",    // request ueditor config.json
        initialFrameHeight: 150,
        elementPathEnabled : false,
        textarea: "commentContent",
        toolbars: [["bold","italic","underline","fontborder","strikethrough",'superscript', 'subscript',
        "forecolor","backcolor","justifyleft","justifycenter","justifyright","justifyjustify","fontfamily",
        "fontsize","simpleupload","emotion","insertcode","removeformat","unlink","link","undo","redo"]],
        
    });
    
    $("span.btn.btn-primary.btn-generate-editor").one("click", function()
    {
        // jQuery object is an array !!!
        var blogId = $($(this).children()[0]).val();
        var replyToId = $($(this).children()[1]).val();
        var replyToName = $($(this).children()[2]).val();
        
        var $commentForm = generateCommentForm(blogId, replyToId, replyToName);
        $commentForm.hide();
        $(this).parent().after($commentForm);
        
        // initialize the editor
        var editor = UE.getEditor('container-' + replyToId, 
        {
            serverUrl: "/blogs/commenteditor/controller",    // request ueditor config.json
            initialFrameHeight: 150,
            elementPathEnabled : false,
            textarea: "commentContent",
            toolbars: [["bold","italic","underline","fontborder","strikethrough",'superscript', 'subscript',
            "forecolor","backcolor","justifyleft","justifycenter","justifyright","justifyjustify","fontfamily",
            "fontsize","simpleupload","emotion","insertcode","removeformat","unlink","link","undo","redo"]],
            
        });
        
        $commentForm.slideDown("slow");
        
        $(this).text("收起");
        
        var state = true;
        $(this).bind("click", function ()
        {
            if (state)
            {
                $commentForm.slideUp("slow");
                $(this).text("回复");
            }
            else
            {
                $commentForm.slideDown("slow");
                $(this).text("收起");  
            }
            
            state = !state;
        });
        
    });
    
    
});


function generateCommentForm(blogId, replyToId, replyToName)
{
    var $commentForm = $('<form class="form-horizontal" action="/blogs/commitcomment/" method="post"></form>');
    $commentForm.append('<input type="hidden" value="' + blogId + '" name="blogId"/>');
    $commentForm.append('<input type="hidden" value="' + replyToId + '" name="replyToId"/>');
    $commentForm.append('<input type="hidden" value="' + replyToName + '" name="replyToName"/>');
    
    $commentForm.append(
        '<div class="form-group"><label for="nickNameId" class="col-sm-2 control-label">Nickname</label><div class="col-sm-10"><input type="text" class="form-control" id="nickNameId" placeholder="Nickname for displaying" name="nickName" required/></div></div>'
        );
    $commentForm.append(
        '<div class="form-group"><label for="emailId" class="col-sm-2 control-label">E-mail</label><div class="col-sm-10"><input type="text" class="form-control" id="emailId" placeholder="E-mail for notifying automatically" name="email" required/></div></div>'
        );
    $commentForm.append(
        '<div class="form-group"><label for="urlId" class="col-sm-2 control-label">URL</label><div class="col-sm-10"><input type="text" class="form-control" id="urlId" placeholder="Your personal URL" name="url" value="http://"/></div></div>'
        );

    $commentForm.append('<div class="form-group"><script id="container-' + replyToId + '" name="commentContent" type="text/plain"></script></div>');
    
    $commentForm.append('<button class="btn btn-success" type="submit">提交</button>');

    return $commentForm;
}

// $(document).ready(function ()
// {
//     function path() {
//         var args = arguments,
//         result = [];
//         for(var i = 0; i < args.length; i++)
//             result.push(args[i].replace('@', 'ueditor/third-party/SyntaxHighlighter/syntaxhighlighter/scripts/'));
//         return result;
//     };
//     SyntaxHighlighter.autoloader.apply(null, path(
//     'applescript            @shBrushAppleScript.js',
//     'actionscript3 as3      @shBrushAS3.js', 
//     'bash shell             @shBrushBash.js', 
//     'coldfusion cf          @shBrushColdFusion.js',
//     'cpp c                  @shBrushCpp.js',
//     'c# c-sharp csharp      @shBrushCSharp.js', 
//     'css                    @shBrushCss.js', 
//     'delphi pascal          @shBrushDelphi.js', 
//     'diff patch pas         @shBrushDiff.js', 
//     'erl erlang             @shBrushErlang.js',
//     'groovy                 @shBrushGroovy.js', 
//     'java                   @shBrushJava.js',
//     'jfx javafx             @shBrushJavaFX.js', 
//     'js jscript javascript  @shBrushJScript.js',
//     'perl pl                @shBrushPerl.js',
//     'php                    @shBrushPhp.js', 
//     'text plain             @shBrushPlain.js', 
//     'py python              @shBrushPython.js',
//     'ruby rails ror rb      @shBrushRuby.js',
//     'sass scss              @shBrushSass.js',
//     'scala                  @shBrushScala.js',
//     'sql                    @shBrushSql.js', 
//     'vb vbnet               @shBrushVb.js',
//     'xml xhtml xslt html    @shBrushXml.js'
//     ));
//     SyntaxHighlighter.defaults['smart-tabs'] = true;
//     SyntaxHighlighter.defaults['tab-size'] = 4;
//     SyntaxHighlighter.all();
// });