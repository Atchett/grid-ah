"use strict";

(function () {

    // Nav toggle
    var navChk = document.getElementById("menuChk"),
        navUl = document.getElementsByClassName("menu");

    navChk.onchange = function () {
        navUl[0].classList.toggle("hide");
    };

    // footer date
    var d = new Date(),
        y = d.getFullYear(),
        cDate = document.getElementById("cDate");

    cDate.innerHTML += y;
})();

