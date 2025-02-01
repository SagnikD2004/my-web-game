// if we click on the start/reset
//     if we are playing
//         reload page
//     if we are not playing
//         set score to 0
//         show countdown box
//         reduce time by 1sec in loops
//              timeleft?
//                 yes=continue
//                 no=gameover
//         change button to reset
//         generate new Q&A

// if we click on answer box
//     if we are playing
//         correct
//             yes
//                 increase score
//                 show correct box for 1sec
//                 generate new Q&A
//             no
//                 show try again box for 1sec

document.addEventListener("DOMContentLoaded", () => {

    let playing = false;
    let score;
    let action;
    let timeRemain;
    let correctAnswer;

    const startBtn = document.getElementById("start");
    const scoreValue = document.getElementById("scoreValue");
    const remainingTime = document.getElementById("remaining");
    const gameoverText = document.getElementById("gameover");
    const questionBox = document.getElementById("question");
    const answerBoxes = document.querySelectorAll(".box");
    const timeContainer = document.getElementById("time");

    startBtn.addEventListener("click", () => {
        if (playing) {
            location.reload();
        }
        else {
            playing = true
            score = 0;
            scoreValue.innerHTML = score;

            timeRemain = 60;
            toggleVisibility(timeContainer, true);
            remainingTime.textContent = timeRemain;

            toggleVisibility(gameoverText, false);
            startBtn.textContent = "Reset Game";

            startCountdown();
            generateQA();
        }
    })

    answerBoxes.forEach(box => {
        box.addEventListener("click", () => {
            if (playing) {
                if (parseInt(box.textContent) == correctAnswer) {
                    score++;
                    scoreValue.textContent = score;
                    
                    showMessage(correct);
                    generateQA();
                }
                else {
                    if(score>0){
                        score--;
                        scoreValue.textContent = score;
                    }
                    showMessage(wrong);
                }
            }
        })
    })

    function startCountdown() {
        action = setInterval(() => {
            timeRemain--;
            remainingTime.textContent = timeRemain;
            if (timeRemain == 0) {
                stopCountdown();
                showGameOver();
            }
        }, 1000);
    }

    function stopCountdown() {
        clearInterval(action);
    }

    function generateQA() {
        var x = 10 + Math.floor(Math.random() * 90);
        var y = 10 + Math.floor(Math.random() * 90);
        correctAnswer = x * y;
        questionBox.innerHTML = `${x}x${y}`;
        const correctPosition = 1 + Math.floor(3 * Math.random());
        answerBoxes[correctPosition - 1].textContent = correctAnswer;
        const answers = new Set([correctAnswer]);
        answerBoxes.forEach((box, index) => {
            if (index != correctPosition - 1) {
                let wrongAnswer;
                do {
                    wrongAnswer = (10 + Math.floor(Math.random() * 90)) * (10 + Math.floor(Math.random() * 90));
                }
                while (answers.has(wrongAnswer))
                box.textContent = wrongAnswer;
                answers.add(wrongAnswer);
            }
        });
    }

    function showGameOver() {
        toggleVisibility(gameoverText, true);
        gameoverText.innerHTML = `<p>Game Over !<p/><p>Your Score is ${score}.<p/>`;
        playing = false;
        startBtn.textContent = "Start Game";
        toggleVisibility(timeContainer, false);
    }

    function toggleVisibility(element, show) {
        element.style.display = show ? "block" : "none";
    }

    function showMessage(element) {
        toggleVisibility(element, true);
        setTimeout(() => toggleVisibility(element, false), 1000);
    }
})