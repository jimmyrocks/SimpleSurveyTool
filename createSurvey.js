$(document).ready(function(){
        var output = document.createElement("div");
        for (questionId in surveyJson) {
        output.appendChild(createQuestionDiv(surveyJson[questionId]));
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

        var counter = 0;
        var split = 5;
        var widthSum = 0;
        for (buttonId in question.divbuttons) {
            counter += 1;
            var buttonJson = question.divbuttons[buttonId];
            var button = document.createElement(buttonJson.type);
            button.setAttribute('id', question.name);
            var btn_class = buttonJson.class;
            btn_class = btn_class.replace("btn-primary","")
                btn_class += buttonTheme;
            button.setAttribute('class', btn_class);
            button.textContent = buttonJson.value;
            inputs.appendChild(button);
            widthSum += button.textContent.length;
            if (counter % split  === 0 || widthSum > 50) {
                widthSum = 0;
                counter = 0;
                inputs.appendChild(document.createElement("br"));
            };
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
        //console.log(redditName + " - " + key + " - " + value);
        jsonList.push({
            "username": redditName,
            "field": key,
            "entry": value
        });
    };
    var submitList = function () {
        $('#myModalLabel').text('Submitting Data...');
        $('#modalBody').html('<p>Your survey is being submitted to our server!</p>');
        $('#modalBody').append(drawSpinner());
        $('#modalButton').text("");
        $('#modalButton').hide();
        $('button.close').hide();
        $('#myModal').modal();

        console.log(JSON.stringify(jsonList));
    };
    return {
        append: function(redditName, key, value){addToList(redditName, key, value);},
        submit: function(){submitList();}
    };
};


var submitButton = function() {
    //Create the jsonList
    currentList = list();

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
    };
    return spinner;
};
