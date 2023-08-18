 // Check if the second countdown has already started; if so, continue with the second countdown
    var timeInSeconds = sessionStorage.getItem('timeRemaining');
    if (timeInSeconds) {
        startSecondCountdown(timeInSeconds);
        return; // Exit the function early
    }

    // Create input box centered on the screen
    var inputDiv = document.createElement('div');
    inputDiv.style.position = 'fixed';
    inputDiv.style.top = '0';
    inputDiv.style.left = '0';
    inputDiv.style.width = '100%';
    inputDiv.style.height = '100%';
    // inputDiv.style.background = 'rgba(255, 255, 255, 0.8)';
    inputDiv.style.background = 'white';
    inputDiv.style.zIndex = '1000';
    inputDiv.innerHTML = '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);"><input id="timeInput" type="text" placeholder="Enter time in minutes" /><button onclick="startCounter()">Submit</button></div>';
    document.body.appendChild(inputDiv);

    // Event listener for pressing Enter key
    document.getElementById('timeInput').addEventListener('keyup', function(event) {
        if (event.keyCode === 13) { // 13 is the key code for Enter
            window.startCounter();
        }
    });

    // Capture user input, set timeout, and update counter
    window.startCounter = function() {
        var timeInMinutes = document.getElementById('timeInput').value;
        var timeInSeconds = timeInMinutes * 60;

        // Remove the input overlay
        document.body.removeChild(inputDiv);

        // Create a fullscreen overlay to prevent clicks
        var fullscreenOverlay = document.createElement('div');
        fullscreenOverlay.style.position = 'fixed';
        fullscreenOverlay.style.top = '0';
        fullscreenOverlay.style.left = '0';
        fullscreenOverlay.style.width = '100%';
        fullscreenOverlay.style.height = '100%';
        // fullscreenOverlay.style.background = 'rgba(255, 255, 255, 0.8)';
        fullscreenOverlay.style.background = 'white';
        fullscreenOverlay.style.zIndex = '1000';
        document.body.appendChild(fullscreenOverlay);

        // Create an overlay div for the waiting time, centered on the screen
        var overlayDiv = document.createElement('div');
        overlayDiv.style.position = 'absolute';
        overlayDiv.style.top = '50%';
        overlayDiv.style.left = '50%';
        overlayDiv.style.transform = 'translate(-50%, -50%)';
        // overlayDiv.innerHTML = 'Waiting: 3 minutes 0 seconds';
        fullscreenOverlay.appendChild(overlayDiv);

        var waitingTimeInSeconds = 2; // 2 mins

        // Set an interval to update the waiting time every second
        var waitingInterval = setInterval(function() {
            waitingTimeInSeconds--;
            var waitingMinutes = Math.floor(waitingTimeInSeconds / 60);
            var waitingSeconds = waitingTimeInSeconds % 60;
            overlayDiv.innerHTML = 'Waiting: ' + waitingMinutes + ' minutes ' + waitingSeconds + ' seconds' + ' | Input: ' + timeInMinutes + ' minutes';
            if (waitingTimeInSeconds < 0) {
                localStorage.setItem('hasCountedDown', 'true'); // Set the flag in localStorage
                clearInterval(waitingInterval);

                startSecondCountdown(timeInSeconds);

                // Remove the fullscreen overlay
                document.body.removeChild(fullscreenOverlay);

                // Create a separate div for the counter, placed at the top
                var counterDiv = document.createElement('div');
                counterDiv.style.position = 'fixed';
                counterDiv.style.top = '0';
                counterDiv.style.left = '0';
                counterDiv.style.width = '100%';
                counterDiv.style.textAlign = 'center';
                counterDiv.style.background = 'white';
                counterDiv.style.zIndex = '1000';
                counterDiv.innerHTML = 'Time remaining: ' + timeInMinutes + ' minutes';
                document.body.appendChild(counterDiv);

                var interval = setInterval(function() {
                    timeInSeconds--;
                    var remainingMinutes = Math.floor(timeInSeconds / 60);
                    var remainingSeconds = timeInSeconds % 60;
                    counterDiv.innerHTML = 'Time remaining: ' + remainingMinutes + ' minutes ' + remainingSeconds + ' seconds';
                    if (timeInSeconds < 0) {
                        clearInterval(interval);
                        window.location.href = 'https://quozio.com/quote/5gb9v749nxg8wq/10054-25a27/-look-within-within-is-the-fountain-of-good-and-it-will'; // Redirect to another website or the homepage
                    }
                }, 1000);
            }
        }, 1000);
    };

    function startSecondCountdown(timeInSeconds) {
        sessionStorage.setItem('timeRemaining', timeInSeconds); // Store the remaining time in sessionStorage

        // Create a separate div for the counter, placed at the top
        var counterDiv = document.createElement('div');
        counterDiv.style.position = 'fixed';
        counterDiv.style.top = '0';
        counterDiv.style.left = '0';
        counterDiv.style.width = '100%';
        counterDiv.style.textAlign = 'center';
        counterDiv.style.background = 'white';
        counterDiv.style.zIndex = '1000';
        document.body.appendChild(counterDiv);

        var interval = setInterval(function() {
            timeInSeconds--;
            sessionStorage.setItem('timeRemaining', timeInSeconds); // Update the remaining time in sessionStorage

            var remainingMinutes = Math.floor(timeInSeconds / 60);
            var remainingSeconds = timeInSeconds % 60;
            counterDiv.innerHTML = 'Time remaining: ' + remainingMinutes + ' minutes ' + remainingSeconds + ' seconds';

            if (timeInSeconds < 0) {
                clearInterval(interval);
                sessionStorage.removeItem('timeRemaining'); // Clear the remaining time from sessionStorage
                window.location.href = 'https://quozio.com/quote/5gb9v749nxg8wq/10054-25a27/-look-within-within-is-the-fountain-of-good-and-it-will'; // Redirect to another website
            }
        }, 1000);
    }