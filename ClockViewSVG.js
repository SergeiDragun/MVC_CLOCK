"use strict";

function ViewSvg() {
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
        hourArrow = myField.querySelector(".hoursArrow")
        minArrow = myField.querySelector(".minutesArrow")
        secArrow = myField.querySelector(".secondsArrow")
    }

    this.update = function() {
        var currentTime = myModel.displayTime;
        currentHours = currentTime.getUTCHours() + myModel.gmt;
        currentMinutes = currentTime.getUTCMinutes();
        currentSeconds = currentTime.getUTCSeconds();
        hourArrow.style.transform = "rotate("+ (360 / 12 * ( (currentMinutes / 60) + currentHours )) + "deg)";
        hourArrow.style.transformOrigin = "50% 50%";

        minArrow.style.transform = "rotate("+ (360 / 60 * ( (currentSeconds / 60) + currentMinutes )) + "deg)";
        minArrow.style.transformOrigin = "50% 50%";

        secArrow.style.transform = "rotate("+ (360 / 60 * currentSeconds) + "deg)";
        secArrow.style.transformOrigin = "50% 50%"; 

        var info = myField.querySelector(".info");
        info.innerHTML = myModel.city + " " + "(GMT " + myModel.gmt + ")";
    }

    this.addHoursBlocks = function() {
        var svg = myField.querySelector(".svg");
        var hourCirclesGroup = myField.querySelector(".hours_block");

        var computedStyle = getComputedStyle(svg);
        var svgCenterX = parseFloat(computedStyle.width)/2;
        var svgCenterY = parseFloat(computedStyle.height)/2;

        var radius = parseFloat(computedStyle.width) * 0.4;
        var hourCircleRdius = parseFloat(computedStyle.width) * 0.07;
        var angle = 0;
        console.log(radius);
        
        for (var i = 12; i > 0; i--) {
            var hourCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            var txt = document.createElementNS("http://www.w3.org/2000/svg","text");
            
            var angleRad = angle/180 * Math.PI;

            var hourCircleCenterX = svgCenterX + radius * Math.sin(angleRad);
            var hourCircleCenterY = svgCenterY - radius * Math.cos(angleRad);

            angle += -360 / 12;

            hourCircle.setAttribute("cx", hourCircleCenterX)
            hourCircle.setAttribute("cy", hourCircleCenterY)
            hourCircle.setAttribute("r", hourCircleRdius)
            hourCircle.setAttribute("fill", "rgb(72,179,130)")
            hourCirclesGroup.appendChild(hourCircle);
            
            txt.setAttribute("x", hourCircleCenterX);
            txt.setAttribute("y", hourCircleCenterY);
            txt.setAttribute("text-anchor", "middle");
            txt.setAttribute("alignment-baseline", "central");
            txt.setAttribute("font-size", 24);
            txt.style.fill="black";
            txt.textContent = i;
            hourCirclesGroup.appendChild(txt);
        }
    }
}