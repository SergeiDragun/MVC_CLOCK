"use strict";

function View() {
    var myModel = null;
    var myField = null;
    var hourArrow = null;
    var minArrow = null;
    var secArrow = null;
    var currentHours = null;
    var currentMinutes = null;
    var currentSeconds = null;

    this.start = function(model, field) {
        myModel = model;
        myField = field;
        hourArrow = myField.querySelector(".hours")
        minArrow = myField.querySelector(".minutes")
        secArrow = myField.querySelector(".seconds")
    }

    this.update = function() {
        var currentTime = myModel.displayTime;
        currentHours = currentTime.getUTCHours() + myModel.gmt;
        currentMinutes = currentTime.getUTCMinutes();
        currentSeconds = currentTime.getUTCSeconds();
        hourArrow.style.transform = "rotate("+ (360 / 12 * ( (currentMinutes / 60) + currentHours )) + "deg)"
        minArrow.style.transform = "rotate("+ (360 / 60 * ( (currentSeconds / 60) + currentMinutes )) + "deg)";
        secArrow.style.transform = "rotate("+ (360 / 60 * currentSeconds) + "deg)";
        var info = myField.querySelector(".info");
        info.innerHTML = myModel.city + " " + "(GMT " + myModel.gmt + ")";

    }

    this.addHoursBlocks = function() {
        var clockBlock = myField.querySelector(".container");
        var clockBlockCenterX = clockBlock.offsetWidth / 2;
        var clockBlockCenterY = clockBlock.offsetHeight / 2;

        var computedStyle = getComputedStyle(clockBlock);
        var radius = parseFloat(computedStyle.width) * 0.4;
        var angle = 0;

        for (var i = 12; i > 0; i--) {
            var hourBlock = document.createElement("div");
            hourBlock.className = "hours_styles";
            hourBlock.innerHTML = i;
            clockBlock.appendChild(hourBlock);

            var angleRad = angle/180 * Math.PI;
            var hourBlockCenterX = clockBlockCenterX + radius * Math.sin(angleRad);
            var hourBlockCenterY = clockBlockCenterY - radius * Math.cos(angleRad);

            hourBlock.style.left = Math.round(hourBlockCenterX) + "px";
            hourBlock.style.top = Math.round(hourBlockCenterY) + "px";
            angle += -360 / 12;
        }
    }
}