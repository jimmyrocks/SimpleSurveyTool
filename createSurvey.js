$(document).ready(function(){
        var output = document.createElement("div");
        for (var questionId in surveyJson) {
            if (surveyJson.hasOwnProperty(questionId)) {
                output.appendChild(createQuestionDiv(surveyJson[questionId]));
            }
        }
        $("#survey").append(output);


        var submitButton = document.createElement("button");
        submitButton.setAttribute('class', 'btn btn-primary btn-xlarge');
        submitButton.textContent = "Submit";
        $("#submit").append(submitButton);
        });


var createQuestionDiv = function(question){

    var buttonTheme = "btn-custom";
    // Create the Div Element where the question will reside
    var questionDiv = document.createElement("div");
    questionDiv.setAttribute('name', question.name);
    questionDiv.setAttribute('id', question.name);
    questionDiv.setAttribute('class', "questionBox");

    // Create the HTML inside the question
    var header = document.createElement("h4");
    header.textContent = question.question;

    var inputs = document.createElement("div");
    if (question.input === "divclass"){
        //inputs.setAttribute('class', question.divclass + " btn-group-vertical");
        inputs.setAttribute('class', question.divclass);
        inputs.setAttribute('data-toggle', question.divtoggle);

        var widthSum = 0;
        var textWidth = ($("body").width()-100) / 15;
        console.log(textWidth);
        for (var buttonId in question.divbuttons) {
            if (question.divbuttons.hasOwnProperty(buttonId)) {
                var buttonJson = question.divbuttons[buttonId];
                var button = document.createElement(buttonJson.type);
                button.setAttribute('id', question.name);
                var btn_class = buttonJson.class;
                btn_class = btn_class.replace("btn-primary","");
                btn_class += buttonTheme;
                button.setAttribute('class', btn_class);
                button.textContent = buttonJson.value;
                widthSum += button.textContent.length;
                if (widthSum > textWidth) {
                    widthSum = 0;
                    inputs.appendChild(document.createElement("br"));
                }
                inputs.appendChild(button);
            }
        }
    } else if (question.input === "text") {
        var inputField = document.createElement("input");
        inputField.setAttribute("type", question.input);
        inputField.setAttribute("class", "textInput");
        inputField.setAttribute("placeholder", question.placeholder);
        inputField.setAttribute('id', question.name);
        inputs.appendChild(inputField);
    }

    questionDiv.appendChild(header);
    questionDiv.appendChild(inputs);

    return questionDiv;
};

var list = function() {
    var jsonList = [];

    var addToList = function(redditName, key, value) {
        jsonList.push({
            "username": redditName,
            "field": key,
            "entry": value
        });
    };
    var submitList = function () {
        $('#myModalLabel').text('Submitting Data...');
        $('#modalBody')
            .html('<p>Your survey is being submitted to our server!</p>')
            .append(drawSpinner());
        $('#modalButton')
            .text("")
            .hide();
        $('button.close').hide();
        var bgDiv = document.createElement("div");
        $('body').append(bgDiv);
        $('#myModal').modal();

  /* Send the data using post */
  var posting = $.post("submitSurvey.php", {answers: jsonList});

  /* Put the results in a div */
  posting.done(function() {
    //console.log(data);
    $( "#modalBody" ).empty().append( 'Data submitted' );
    $( "#myModalLabel" ).text( 'Done' );
    $( "#modalButton" )
        .text( 'All Done! Go back to reddit!' )
        .on('click', function(){window.location.href = "http://www.reddit.com/r/denver"})
        .show();
  });

        console.log(JSON.stringify(jsonList));
    };
    return {
        append: function(redditName, key, value){addToList(redditName, key, value);},
        submit: function(){submitList();}
    };
};

var submitButton = function() {
    //Create the jsonList
    var currentList = list();

    // Make sure they put a username in
    var redditName = $("input#username").val();
    if (redditName.length > 0) {
        // Get all the selected buttons
        $(".btn.active").each(function() {
                currentList.append(redditName, this.id, this.textContent);
                });

        // Get all the text fields
        $("input").each(function() {
                if ((this.type === "text" || this.type === "hidden") && this.value.length > 0) {
                currentList.append(redditName, this.id, this.value);
                }
                });
        currentList.submit();
    } else
    {
        $('#myModalLabel').text('Missing Username');
        $('#modalBody').html("<p>There is only one required field: reddit username.  Please fill it in.</p><i class='icon-spinner icon-spin icon-large'></i>");
        $('#modalButton').text("I'll fill it in!");
        $('#myModal').modal();
        $("input#username").focus();
        currentList = null;
    }
};

var drawSpinner = function(){
    var spinner = document.createElement("div");
    spinner.setAttribute('style', 'position: absolute; margin-top: -35px; margin-left: 325px;');
    for (var i=1; i<9; i++) {
        var spinstep = document.createElement("div");
        spinstep.setAttribute('class', 'spinningSquaresG');
        spinstep.setAttribute('id', 'spinningSquaresG_' + i);
        spinner.appendChild(spinstep);
    }
    return spinner;
};
