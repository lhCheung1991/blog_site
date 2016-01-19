$(function()
{
    $("#changePageDiv .btn").bind("click", function()
    {
        $("#pageNumInput").val($(this).html());
        $("#changePageForm").submit();   
    });
});