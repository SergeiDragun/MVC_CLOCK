"use strict";

function Clock(gmt, city) {
    this.gmt = gmt;
    this.city = city;
    this.displayTime = new Date();

    var myView = null;
    var timer = null;
    
    this.start = function(view) {
        myView=view;
    }

    this.updateView = function() {
        this.displayTime = new Date()
        if (myView) {
            myView.update();
        }
    }

    this.clockStart = function() {
        if (timer) {
            return
        }
        timer = setInterval(() => this.updateView(), 1000);
        this.updateView()
    }

    this.clockStop = function() {
        clearInterval(timer);
        timer = null;
    }
}