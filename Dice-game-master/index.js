// Define the rollDice function
function rollDice() {
    // Disable the start button during the animation
    document.getElementById("startButton").disabled = true;

    // Declare variables with global scope
    var randomNumber1, randomNumber2, randomNumber3;

    // Function to animate the rotation and jumping of dice images
    function rotateDice(element, duration, callback) {
        var startTime = Date.now();
        var jumpDuration = duration / 6; // Divide the total duration into 6 parts for jumping

        function rotate() {
            var currentTime = Date.now();
            var elapsed = currentTime - startTime;

            // Calculate the jump index based on elapsed time
            var jumpIndex = Math.floor(elapsed / jumpDuration);

            // If it's time for a jump, set a random angle
            if (elapsed < duration && elapsed % jumpDuration < 1000) {
                element.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
            } else {
                // Otherwise, continue the regular rotation
                var rotateAngle = (elapsed / duration) * 360;
                element.style.transform = 'rotate(' + rotateAngle + 'deg)';
            }

            if (elapsed < duration) {
                requestAnimationFrame(rotate);
            } else {
                callback(); // Call the callback function after the rotation is complete
            }
        }
        rotate();
    }

    // Rotate the first dice image after a delay
    setTimeout(function () {
        var dice1 = document.querySelector('.img1');
        rotateDice(dice1, 5000, function () {
            randomNumber1 = Math.floor(Math.random() * 6) + 1;
            dice1.src = 'images/dice' + randomNumber1 + '.png';
        });
    }, 1000); // Adjust the delay as needed

    // Rotate the second dice image after another delay
    setTimeout(function () {
        var dice2 = document.querySelector('.img2');
        rotateDice(dice2, 5000, function () {
            randomNumber2 = Math.floor(Math.random() * 6) + 1;
            dice2.src = 'images/dice' + randomNumber2 + '.png';
        });
    }, 2000); // Adjust the delay as needed

    // Rotate the third dice image after one more delay
    setTimeout(function () {
        var dice3 = document.querySelector('.img3');
        rotateDice(dice3, 5000, function () {
            randomNumber3 = Math.floor(Math.random() * 6) + 1;
            dice3.src = 'images/dice' + randomNumber3 + '.png';

            // Calculate the sum of the three dice
            var sum = randomNumber1 + randomNumber2 + randomNumber3;

        

            // Update the notification div with the result
            var notificationDiv = document.getElementById('notification');
            if (sum % 2 === 0) {
                if (sum >= 1 && sum <= 10) {
                    notificationDiv.innerHTML = '<p class="even">Kết quả là chẳn và Xỉu: ' + sum + '</p>';
                } else if (sum >= 11 && sum <= 18) {
                    notificationDiv.innerHTML = '<p class="even">Kết quả là chẳn và Tài: ' + sum + '</p>';
                }
            } else {
                if (sum >= 1 && sum <= 10) {
                    notificationDiv.innerHTML = '<p class="odd">Kết quả là lẻ và Xỉu: ' + sum + '</p>';
                } else if (sum >= 11 && sum <= 18) {
                    notificationDiv.innerHTML = '<p class="odd">Kết quả là lẻ và Tài: ' + sum + '</p>';
                }
            }

            // Enable the start button after the animation is complete
            document.getElementById("startButton").disabled = false;
        });
    }, 3000); // Adjust the delay as needed
}

// Function to be called when the "Start" button is clicked
function startGame() {
    rollDice();
}

// Attach the startGame function to the button click event
document.getElementById("startButton").addEventListener("click", startGame);
