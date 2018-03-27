    //  Variable that will hold our setInterval that runs the timer
  var intervalId;
  
  // prevents the clock from being sped up unnecessarily
  var clockRunning = false;

  
  
  //  Our timer object.
  var timer = {
  
    time: 0,
    lap: 1,
  
    
    reset: function() {
        
    //Set default time
      timer.time = 31;
      //  TODO: Change the "display" div to 
      $('#timer-display').text(this.timer)
  
    },
  
    start: function() {
  
      //  TODO: Use setInterval to start the count here and set the clock to running.
      if (!clockRunning) {
        intervalId = setInterval(timer.count, 1000);
        clockRunning = true;
      }
  
    },
    stop: function() {
      //  TODO: Use clearInterval to stop the count here and set the clock to not be running.
      if(clockRunning) {
        clearInterval(intervalId);
        clockRunning = false
      }
    },
  
    count: function() {
  
      //  TODO: decrement time by 1, remember we cant use "this" here.
      timer.time--
    //// TODO: Stop time when it reaches 0
    if(timer.time === 0) {
      timer.stop()
    }
  
      //  TODO: Get the current time, pass that into the timer.timeConverter function,
      //        and save the result in a variable.
      var convertedTime = timer.timeConverter(timer.time)
      //  TODO: Use the variable you just created to show the converted time in the "display" div.
      $('#timer-display').text(convertedTime)
    },
  
    //  THIS FUNCTION IS DONE FOR US!
    //  We do not need to touch it.
  
    timeConverter: function(t) {
  
      //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
      var minutes = Math.floor(t / 60);
      var seconds = t - (minutes * 60);
  
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
  
      if (minutes === 0) {
        minutes = "00";
      }
  
      else if (minutes < 10) {
        minutes = "0" + minutes;
      }
  
      return minutes + ":" + seconds;
    }

    // *** Countdown stopper: IF count reaches 0 then stop counting
   
  };
  