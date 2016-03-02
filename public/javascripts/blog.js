"use strict";

$(function()
{
    var $categoryol = $("ol.list-unstyled");
    var $header2 = $("h2");
    
    for (let idx = 0; idx < $header2.length; idx++)
    {
        $($header2[idx]).append('<a name=h2' + idx + '></a>');
        $categoryol.append('<li>' + '<a href="#h2' + idx + '">' + $($header2[idx]).text() + '</a>' + '</li>');
    }
});