const quizdata = [




    {
        question: "In which year did the Titanic sink on its maiden voyage?",
        a: "1905",
        b: "1912",
        c: "1923",
        d: "1898",
        correct: "b",
        id: "second",
        name: "1912"
    },
    {
        question: "Which country is home to the largest desert in the world?",
        a: "Australia",
        b: "Saudi Arabia",
        c: "Antarctica",
        d: "China",
        correct: "c",
        id: "third",
        name: "Antarctica"
    }
];



const quiz = document.getElementById("quiz");
const CountQuestion = document.getElementById("count-question");
const totalNoOfQues = document.getElementById("tot-no-que");
const questionNo = document.getElementById("question-number");
const questionTitle = document.getElementById("question");
const answerLabel = document.querySelectorAll(".answer-label");
const nextQuestionButton = document.getElementById("next-question-btn");
const allInputs = document.querySelectorAll("input[type='radio']");
const submitQuiz = document.getElementById("submit");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const fin = document.getElementById("fin");

const box = document.getElementById("first");
const progressCircle = document.getElementById("progress-circle");
const progressValue = document.getElementById("progress-value");
const all = document.getElementById("allbtn");




let currentQtn = 0;
let answered = 0;

const resetAnswerStyles = () => {
    answerLabel.forEach(label => {
        label.classList.remove("correct-answer", "incorrect-answer");
    });
};


const loadQuiz = () => {
    resetAnswerStyles();

    progressCircle.style.display = "none";
    progressValue.style.display = "none";



    CountQuestion.innerHTML = `${currentQtn + 1}`;
    totalNoOfQues.innerHTML = quizdata.length;
    questionNo.innerHTML = `${currentQtn + 1}`;
    questionTitle.innerHTML = quizdata[currentQtn].question;
    answerLabel[0].innerHTML = quizdata[currentQtn].a;
    answerLabel[1].innerHTML = quizdata[currentQtn].b;
    answerLabel[2].innerHTML = quizdata[currentQtn].c;
    answerLabel[3].innerHTML = quizdata[currentQtn].d;
    reset();

    if (currentQtn == quizdata.length - 1) {
        nextQuestionButton.style.display = "none";
        submitQuiz.style.display = "flex";

    }

}
const reset = () => {
    allInputs.forEach((allInputs) => {
        allInputs.checked = false;


    })
}



const markAnswers = () => {
    allInputs.forEach((input, index) => {
        const label = answerLabel[index];

        // Reset styles first
        label.classList.remove("correct-answer", "incorrect-answer");

        // If the option is correct, mark it green
        if (input.value === quizdata[currentQtn].correct) {
            label.classList.add("correct-answer");
        } else if (input.checked) {
            // If an incorrect option is selected, mark it red
            label.classList.add("incorrect-answer");
        }

    });
};




const animateScore = (finalScore) => {
    let currentScore = 0;
    const increment = Math.ceil(finalScore / 50); // Speed of animation, higher means faster
    const scoreInterval = setInterval(() => {
        if (currentScore >= finalScore) {
            clearInterval(scoreInterval);
            scoreEl.innerHTML = `🌟 You got <strong>${finalScore}</strong> out of <strong>${quizdata.length}</strong> questions correct! 🎉`;
        } else {
            currentScore += increment;
            scoreEl.innerHTML = `🌟 You got <strong>${currentScore}</strong> / <strong>${quizdata.length}</strong> 🎉`;
        }
    }, 500); // The duration of each increment in milliseconds
};


nextQuestionButton.addEventListener("click", () => {
    let answer = getSelected();

    if (answer == null) {
        alert("Please select an answer before proceeding.");

    }

    if (answer != null && answer === quizdata[currentQtn].correct) {
        answered++;
        console.log("I hate coding...");

        markAnswers();  // Highlight correct and incorrect answers

        setTimeout(() => {
            currentQtn++;
            if (currentQtn < quizdata.length) {
                loadQuiz();
            }
        }, 1000); // Delay to let users see the result before loading next question

    }

    if (answer != null && answer != quizdata[currentQtn].correct) {

        markAnswers();  // Highlight correct and incorrect answers

        setTimeout(() => {
            currentQtn++;
            if (currentQtn < quizdata.length) {
                loadQuiz();
            }
        }, 1000); // Delay to let users see the result before loading next question

    }



});

const updateCircularGraph = (percentage) => {


    // Update the circular progress bar with a conic-gradient
    let start = 0;
    const animate = setInterval(() => {
        start++;
        if (start > percentage) {
            clearInterval(animate);
        }
        progressCircle.style.background = `conic-gradient(
            lightgreen ${start * 3.6}deg,
            #e6e6e6 ${start * 3.6}deg
        )`;
        progressValue.textContent = `${start}%`;
    }, 50); // Adjust for animation speed
};

submitQuiz.addEventListener("click", () => {
    let answer = getSelected();

    if (answer == null) {
        alert("Please select an answer before proceeding.");

    }






    if (answer != null && answer === quizdata[currentQtn].correct) {
        if (answer === quizdata[currentQtn].correct) {
            answered++;
        }

        markAnswers();  // Highlight correct and incorrect answers

        setTimeout(() => {
            quiz.style.display = "none";
            resultEl.style.display = "block";
            animateScore(answered);
        }, 1000); // Delay to show final answers before displaying result


    }

    if (answer != null && answer != quizdata[currentQtn].correct) {

        if (answer === quizdata[currentQtn].correct) {
            answered++;
        }

        markAnswers();  // Highlight correct and incorrect answers

        setTimeout(() => {
            quiz.style.display = "none";
            resultEl.style.display = "block";
            animateScore(answered);
        }, 1000); // Delay to show final answers before displaying result



    }





















});




// Call this function once you have the final score




/*all.addEventListener("click", () => {
    let answer = getSelected();
    const correctAnswer = quizdata[currentQtn].name;






    if (answer === quizdata[currentQtn].correct) {
        answered++;
        console.log(answer);

        console.log(quizdata[currentQtn].name);


        answerLabel.forEach((label, index) => {
            if (label.previousElementSibling.value === correctAnswer) {
                label.classList.add("correct-answer");
            }
        });




    }


})*/





const getSelected = () => {

    let answer;


    allInputs.forEach((allInputs) => {

        if (allInputs.checked) {

            answer = allInputs.value;


        }

    });

    return answer;


}

loadQuiz();






