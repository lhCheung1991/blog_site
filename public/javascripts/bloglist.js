$(function()
{   
    $('[data-toggle="tooltip"]').tooltip();
    
    $("#changePageDiv button").bind("click", function ()
    {
        $("#pageNumInput").val($(this).html());
        $("#changePageForm").submit();
    });

    $("#newBlogIconDiv").bind("click", function()
    {
        window.location.replace("/admin/blogeditor/newblog/plaineditor");
    });

    $("#blogTable button.btn.btn-success").bind("click", function()
    {
        var blogIdTd = $(this).parent().siblings()[0];
        $("#checkBlogByIdInput").val($(blogIdTd).html());
        $("#checkBlogByIdForm").submit();
    });
    
    $("#blogTable button.btn.btn-primary").bind("click", function()
    {
        var blogIdTd = $(this).parent().siblings()[0];
        $("#editBlogByIdInput").val($(blogIdTd).html());
        $("#editBlogByIdForm").submit();
    });
});