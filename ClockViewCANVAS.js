"use strict";

function viewCVS() {
    var myModel = null;
    var myField = null;
    var currentHours = null;
    var currentMinutes = null;
    var currentSeconds = null;

    this.start = function(model, field) {
        myModel = model;
        myField = field;
    }

    this.update = function() {
        var cvs = myField.querySelector(".CVS");
        var context = cvs.getContext("2d");
        var currentTime = myModel.displayTime;
        currentHours = currentTime.getUTCHours() + myModel.gmt;
        currentMinutes = currentTime.getUTCMinutes();
        currentSeconds = currentTime.getUTCSeconds();
        context.clearRect(0, 0, cvs.width, cvs.height);
        // Тело часов --------------------------------
        context.fillStyle = "rgb(252, 202, 102)";
        context.beginPath();
        context.arc(cvs.width/2, cvs.height/2, cvs.width/2, 0, 2 * Math.PI);
        context.fill();
        // -------------------------------------------

        // Кружочки с часами (1-12) -----------------
        var cvsCenterX = parseFloat(cvs.width)/2;
        var cvsCenterY = parseFloat(cvs.height)/2;
        var rad = parseFloat(cvs.width) * 0.4;
        var angle = 0;
        for (let i = 12; i > 0; i--) {
            var angleRad = angle/180 * Math.PI;
            var x = cvsCenterX + rad * Math.sin(angleRad);
            var y = cvsCenterY - rad * Math.cos(angleRad);
            var r = cvs.width * 0.07;
            var startAngle = 0;
            var endAngle = Math.PI*2;
            angle += -360 / 12;

            context.beginPath();
            context.fillStyle = "rgb(72,179,130)";
            context.arc(x, y , r ,startAngle, endAngle);
            context.fill();

            context.fillStyle='black';
            context.font='28px Arial';
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(i, x, y);
        }
        // ----------------------------------------------------

        // СТРЕЛКИ --------------------------------------------
        // - Часовая ------------------------------------------
        var hoursAngle = 360 / 12 * ( (currentMinutes / 60) + currentHours );
        var minutesAngle = 360 / 60 * ( (currentSeconds / 60) + currentMinutes );
        var secondsAngle = 360 / 60 * currentSeconds;
        var hourAngle = 360 / 12 * ( (currentMinutes / 60) + currentHours );
        var hourArrowLongPartLength = cvs.width*0.2;
        var hourArrowShortPartLength = hourArrowLongPartLength/3;
        var hourArrCoord = getArrowCoord(hourAngle, hourArrowLongPartLength, hourArrowShortPartLength);

        context.strokeStyle = "rgba(0,0,0,0.8)";
        context.lineWidth = 6;
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(hourArrCoord.X1, hourArrCoord.Y1);
        context.lineTo(hourArrCoord.X2, hourArrCoord.Y2);
        context.stroke();
        // ----------------------------------------------------

        // - Минутная -----------------------------------------
        var minAngle = 360 / 60 * ( (currentSeconds / 60) + currentMinutes );
        var minArrowLongPartLength = cvs.width*0.3;
        var minArrowShortPartLength = minArrowLongPartLength/4.5;
        var minArrCoord = getArrowCoord(minAngle, minArrowLongPartLength, minArrowShortPartLength);

        context.strokeStyle = "rgba(165,42,42,0.8)";
        context.lineWidth = 4;
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(minArrCoord.X1, minArrCoord.Y1);
        context.lineTo(minArrCoord.X2, minArrCoord.Y2);
        context.stroke();
        // ----------------------------------------------------

        // - Секундная -----------------------------------------
        var secAngle = 360/60*currentSeconds;
        var secArrowLongPartLength = cvs.width*0.4;
        var secArrowShortPartLength = secArrowLongPartLength/6;
        var secArrCoord = getArrowCoord(secAngle, secArrowLongPartLength, secArrowShortPartLength);

        context.strokeStyle = "rgba(128,128,128,0.8)";
        context.lineWidth = 2;
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(secArrCoord.X1, secArrCoord.Y1);
        context.lineTo(secArrCoord.X2, secArrCoord.Y2);
        context.stroke();
        // ----------------------------------------------------

        // Центр часов ----------------------------------------
        context.beginPath();
        context.fillStyle = "rgb(255,255,255)";
        context.arc(cvs.width/2, cvs.height/2 , cvs.width/100 , 0, Math.PI*2);
        context.fill();
        // ----------------------------------------------------

        function getArrowCoord(angle, arrowLongPartLength, arrowShortPartLength) {
            var angleRad = angle/180 * Math.PI;
            var X2 = cvsCenterX + arrowLongPartLength * Math.sin(angleRad);
            var Y2 = cvsCenterY - arrowLongPartLength * Math.cos(angleRad);
            var X1 = cvsCenterX - arrowShortPartLength * Math.sin(angleRad);
            var Y1 = cvsCenterY + arrowShortPartLength * Math.cos(angleRad);
            return {X1, X2, Y1, Y2}
        }
        var info = myField.querySelector(".info");
        info.innerHTML = myModel.city + " " + "(GMT " + myModel.gmt + ")";
    }
}