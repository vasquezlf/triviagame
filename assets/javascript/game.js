// * You'll create a trivia game that shows only one question until the player answers it or their time runs out.

// * If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

// * The scenario is similar for wrong answers and time-outs.

//   * If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.
//   * If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.

// * On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).


document.addEventListener("DOMContentLoaded", function(){
    // **************************** GLOBAL VARIABLES ***************
    //// Variables for questions
    var numberOfQuestions = 0
    var arrayOfLetters = ['A', 'B', 'C', 'D']
    var correctAnswer
    var arrayOfAnswers =[]

    //// Variables for keeping track of score
    // var totalCountdownTime = 5000  // Countdown timer in milliseconds

    // *************************************************************


    // Initialize methods
    $('#menu-toggle').on('click',function(){
        $('.ui.sidebar').sidebar('toggle')
      })

    $('#trivia-question').hide()
    $('#timer-label').hide()

    
    

    // 1. EVENT LISTENER for starting the game when user hits 'Start' button
    $('#button-start').on('click', function(){
        console.log('TEST INPUT: ' + this)
        // Fade START BUTTON when game begins
        $(this).fadeOut(400)
        
        // Insert questions 
        $('#trivia-question').delay(600).slideDown(700)

        // Add bottom "dividing" SemanticUI class to header
        // $('.ui.centered.header').delay(600).attr('class','dividing')

        // Insert a question into the DOM and retrieve the answer to the question
        insertNewQuestion()

        //// *****************************************
        //// correctAnswer = insertNewQuestion()
        //// console.log('Correct Answer: ' + correctAnswer)
        //// ************RETURNS UNDEFINED************

        //Insert timer
        $('#timer-label').delay(500).slideDown(300)
        
    })

    // 2. EVENT DELEGATION (because target button elemetns are dynamically created) for clicking choices
    $(document).on('click', '.ui.list button', function(){
        // Get answer from span tag
        var userPickedAnswer = $(this).next().text()
        console.log('User picked answer: ' + userPickedAnswer)
        console.log('Correct Answer: ' + correctAnswer)
        // Check answer
        answerChecker(correctAnswer, userPickedAnswer)
        // Start new game
        insertNewQuestion()

    })


    //********************** FUNCTION DEFINITIONS **************************

    // This function inserts a new question to the DOM from the API request | Return the correct answer
    function insertNewQuestion () {
        var totalCountdownTime = 34000
        timesUp(totalCountdownTime)
        timer.reset()
        timer.start()
        console.log('total countdown time: ' + totalCountdownTime)
        var returnCallbackValue     //Doesn't do anything right now... does not get returned
        
        // Variables to hold tags from the UI
        var $contentQuestion = '#trivia-question-segment-item-content-header'
        // Step 0: Remove previous question 
        $('#trivia-question-segment-item').remove()
        // Step 1: jQuery ajax function call to API
        var queryURL = 'https://opentdb.com/api.php?amount=1'

        $.ajax({
            url: queryURL,
            method: 'GET',
            success: function(response) {
                 returnCallbackValue = createQuestion(response)
                // console.log('returnCallbackValue: ' + returnCallbackValue )
            }
        })
    //   *********************************************************
        return returnCallbackValue  //this returns as 'undefined'
    }

    function createQuestion(response){

        correctAnswer = ''

        console.log('API return result: ' + response)

        // Step 2: Store queried data to variables
        var querriedQuestion = response.results[0].question
        var querriedAnswer = response.results[0].correct_answer
        var querriedArrayOfIncorrect = response.results[0].incorrect_answers
        var $contentArrayOfChoices = []

        correctAnswer = querriedAnswer
        // Put all choices in array (correct and incorrect)
        for (var i = 0; i < querriedArrayOfIncorrect.length; i++) {
            // Start assigning answers to array with the INCORRECT answers
            arrayOfAnswers[i] = querriedArrayOfIncorrect[i]
        }
        //// Add the correct answer to the array
        arrayOfAnswers.push(querriedAnswer)
        //  Randomize the order of the answers array
        arrayOfAnswers.sort(function(){
            return 0.5 - Math.random() 
        })

        console.log('querriedQuestion: ' + querriedQuestion)
        console.log('querriedAnswer: ' + querriedAnswer)
        console.log('querriedArrayOfIncorrect: ' + querriedArrayOfIncorrect)
        console.log('Randomly sorted arrayOfAnswers: ' + arrayOfAnswers)

        // Step 3: Create elements 
        // Create ITEM within segment
        $('#trivia-question-segment').html('<div class="item" id="trivia-question-segment-item">')
        //// Create CONTENT
        $('#trivia-question-segment-item').html('<div class="content" id="trivia-question-segment-item-content">')
        ////// Create CONTENT HEADER | Insert the text of queried QUESTIONS will go here
        $('#trivia-question-segment-item-content').html('<h3 class="header" id="trivia-question-segment-item-content-header">' + querriedQuestion)
        ////// Create CONTENT LIST
        $('#trivia-question-segment-item-content').append('<div class="ui list" id="trivia-question-segment-item-content-list">')
        /////// Create CONTENT LIST ITEMS using for loop based on number of POSSIBLE choices (incorrect + correct) | Insert the text of queried ANSWERS will go here
        for (var i = 0; i < querriedArrayOfIncorrect.length + 1; i++){
            var $tempFindSpanTag = ''
            // Create CHOICE (i.e. A - This is the answer)
            $('<div class="item"><button class="ui left floated teal circular button">'+ arrayOfLetters[i] +'</button><span>States of America</span></div>').appendTo('#trivia-question-segment-item-content-list')
            // Assign unique ID to each <span> tag because this is where potential answers will go
            $tempFindSpanTag = $('.list .item').eq(i).find('span')   // Find span tag inside current list item
            $contentArrayOfChoices[i] = $($tempFindSpanTag).attr('id', 'choice_'+ arrayOfLetters[i]) // Assign unique ID to the span tag
            $($contentArrayOfChoices[i]).html(arrayOfAnswers[i])    // Assign the choice to a button letter
        }

        console.log('***: ' + correctAnswer )
        return correctAnswer
    }


    // This function checks for correct answers
    function answerChecker (key, userAnswer) {
        if (key === userAnswer) {
            alert('YOU WIN')
            timer.stop()
        }

        else {
            alert('YOU LOSE.\nCorrect Answer is: ' + key )
            timer.stop()
            
        }
        
    }

    // This function sets delayed alert
    function timesUp(milliseconds){
        
        var x = setTimeout(function() {
            alert('Times Up!')
            timer.stop()
        }, milliseconds);
    
    }
    

})