(function(){
    function StopWatch() {
        this.elapsedTime = 0;
        this.intervalId = null;

        this.timeIndicator = document.getElementById('timer');
        this.secondsHand = document.getElementById('seconds_hand');
        this.minutesHand = document.getElementById('minute_hand');
        this.startButton = document.getElementById('start');

        this.secondsDeg = 0;
        this.minutesDeg = 0;
    }

    StopWatch.prototype.start = function() {
        var _this = this;
        var lastUpdateTime = (new Date()).getTime();
        this.startButton.setAttribute('disabled', true);
        this.intervalId = setInterval(function() {
            var nextTicTime = (new Date()).getTime();
            _this.elapsedTime +=(nextTicTime - lastUpdateTime);
            lastUpdateTime = nextTicTime;
            _this.drawT(_this.elapsedTime);
            console.log(_this.elapsedTime);
        }, 16);
    };

    StopWatch.prototype.stop = function() {
        clearInterval(this.intervalId);
        this.drawT(this.elapsedTime);
        console.log('stop', this.elapsedTime);
        this.startButton.removeAttribute('disabled');
    };

    StopWatch.prototype.clearTime = function() {

    };

    StopWatch.prototype.drawT = function(elapsed) {

        var milliseconds = parseInt((elapsed%1000));
        var seconds = parseInt((elapsed/1000)%60);
        var minutes = parseInt((elapsed/(1000*60))%60);
        var hours = parseInt((elapsed/(1000*60*60))%24);

        milliseconds = (milliseconds < 100) ? '0' + milliseconds : milliseconds;
        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;

        this.timeIndicator.innerHTML = hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
        this.secondsDeg = seconds*6;
        this.minutesDeg = minutes*6;
        this.secondsHand.style.setProperty("-webkit-transform","rotate("+ this.secondsDeg +"deg)", null);
        this.minutesHand.style.setProperty("-webkit-transform","rotate("+ this.minutesDeg +"deg)", null);
    };

    window.StopWatch = StopWatch;
}());