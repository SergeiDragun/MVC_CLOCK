"use strict";

function Controller() {
    var myModel = null;
    var myField = null;
    var start = null;
    var stop = null;

    this.start = function(model, field) {
        myModel = model;
        myField = field;

        stop = myField.querySelector(".stop");
        stop.addEventListener("click", this.stopClock)
        start = myField.querySelector(".start");
        start.addEventListener("click", this.startClock)
    }
    this.stopClock = function() {
        myModel.clockStop();
    }

    this.startClock = function() {
        myModel.clockStart();
    }
}