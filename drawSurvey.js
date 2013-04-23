$(document).ready(function(){

       var thisSurvey = survey("./customSurvey.js");
        thisSurvey.load("./customSurvey.js", function(data) {
            var htmlData = thisSurvey.draw(data);

            // Add the page title
            if (data.hasOwnProperty("title")) {
                $("title").html(data["title"]);
            }
            // Add the survey
            $("#survey").html(htmlData);

            // Update the submit button
            $("#submitButton").click(function(){
                console.log(thisSurvey);
                thisSurvey.submit();
            });

        });
});

var survey = function(surveyJsonLink) {
    var surveyJson = {};

    // Defaults
    var buttonTheme = "btn btn-primary";
    var textInputDivClass = "textInput";
    var identifierDiv = "input#username";

    var surveyDrawingTools = function() {

        var drawSurvey = function(jsonData) {
            var output = document.createElement("div");
            if (jsonData){
                // Header
                if (jsonData.hasOwnProperty("title")) {
                    output.appendChild(customElement("h1", null, jsonData["title"]));
                }
                // Content
                if (jsonData.hasOwnProperty("survey")) {
                    for (var questionId in jsonData["survey"]) {
                        if (jsonData["survey"].hasOwnProperty(questionId)) {
                            output.appendChild(createQuestionDiv(jsonData["survey"][questionId]));
                        }
                    }
                }
                // Submit Button
                output.appendChild(customElement(
                    "button",
                    {
                        'id': 'submitButton',
                        'class': 'btn btn-primary btn-xlarge'
                    },
                    "Submit"
                ));
            }

            return output;
        };

        var loadJson = function(jsonLink, successFunction) {
            var newJsonLink = jsonLink || surveyJsonLink;
            $.getJSON(newJsonLink, function(data) {
                surveyJson = data;
                successFunction(data);
            })
                .done(function() { console.log( "second success" ); })
                .fail(function(e) { console.log( e ); })
                .always(function() { console.log( "complete" ); });
        };

        var createQuestionDiv = function(question) {
            // Create the Div Element where the question will reside
            var questionDiv = customElement(
                "div",
                {
                    'name': question.name,
                    'id': question.name,
                    'class': "questionBox",
                }
            );

            // Create the HTML inside the question
            var header = customElement(
                "h4",{}, question.question
            );

            // Draw the input boxes
            var inputs = customElement("div");
            if (question.input === "divclass") {
                inputs.setAttribute('class', question.divclass);
                inputs.setAttribute('data-toggle', question.divtoggle);
                inputs.appendChild(drawButtons(question.divbuttons, question.name));

            } else if (question.input === "text") {
                if (question.multi) {
                    inputs.appendChild(drawMultipleTextboxes(1, question.placeholder, question.name));
                } else {
                    inputs.appendChild(drawTextbox(question.placeholder, question.name));
                }
            }

            // Add a star to show if it's required
            if (question.required){
                header.innerHTML += " *";
            }

            questionDiv.appendChild(header);
            questionDiv.appendChild(inputs);

            return questionDiv;
        };

        var drawButtons = function (buttons, questionName) {
            var widthCharacterSum = 0;
            var maxCharacterWidth = ($("body").width()-100) / 15;
            var buttonsDiv = customElement("div");

            for (var buttonId in buttons) {
                if (buttons.hasOwnProperty(buttonId)) {
                    var buttonJson = buttons[buttonId];
                    widthCharacterSum += buttonJson.value.length;
                    if (widthCharacterSum > maxCharacterWidth) {
                        widthCharacterSum = 0;
                        buttonsDiv.appendChild(customElement("br"));
                    }

                    var button = customElement(
                        buttonJson.type,
                        {
                            'id': questionName,
                            'class': buttonTheme
                        },
                        buttonJson.value
                    );

                    buttonsDiv.appendChild(button);
                }
            }

            return buttonsDiv;
        };

        var drawMultipleTextboxes = function(inputCount, placeholder, name) {
            //TODO Add more to this part!
            console.log("inputCount: " + inputCount);
            console.log("placeholder: " + placeholder);
            console.log("name: " + name);
            var textField = customElement("div");
            var upperLimit = 5;
            var lowerLimit = 1;
            var displayText = [];
            var thisDivReference = "." + textInputDivClass + "#" + name;
            var callingFunction = arguments.callee;

            // Specify range for inputs
            inputCount = inputCount < lowerLimit ? lowerLimit : inputCount;
            inputCount = inputCount > upperLimit ? upperLimit : inputCount;

            // Save any text that was in the fields
            $(thisDivReference).each(function(index){
                displayText.push($(this).val());
            });

            for (var i = 0; i < inputCount; i++) {
                var thisValue = "";
                if (displayText && displayText[i]) {
                    thisValue = displayText[i];
                }
                textField.appendChild(drawTextbox(placeholder, name, thisValue));
            }

            // Add / Remove box Buttons
            var multiButtons = function(addRemove) {
                var symbol = addRemove === "add" ? "+" : "-";
                var increment = addRemove === "add" ? 1 : -1;
                var btnClass = addRemove === "add" ? "btn-success" : "btn-danger";
                    var addRemoveItem = customElement(
                        "button",
                        {
                            'class': btnClass,
                            'id': name + "_" + addRemove
                        },
                        symbol
                    );

                    addRemoveItem.onclick = function() {
                        var newTextBoxes = callingFunction((inputCount+increment), placeholder, name);
                        console.log(inputCount+increment);
                        textField.innerHTML = "";
                        textField.appendChild(newTextBoxes);
                    };

                    return addRemoveItem;
            };

            if (inputCount < upperLimit) {textField.appendChild(multiButtons("add"));}
            if (inputCount > lowerLimit) {textField.appendChild(multiButtons("remove"));}

            return textField;
        };

        var drawTextbox = function(placeholder, idName, textValue) {
            textValue = textValue ? textValue : "";
            return customElement(
                "input",
                {
                    "type": "text",
                    "class": "textInput",
                    "placeholder": placeholder,
                    "value": textValue,
                    'id': idName
                },
                textValue
            );
        };

        var customElement = function(elementType, attributes, content) {
            // Make the element
            var newElement = document.createElement(elementType);

            // Deal with the attributes
            for (var attribute in attributes) {
                if (attributes.hasOwnProperty(attribute)) {
                    newElement.setAttribute(attribute, attributes[attribute]);
                }
            }

            // Add any content
            newElement.innerHTML = content ? content : "";

            return newElement;
        };

        return {
            drawSurvey: function(json) {return drawSurvey(json)},
            loadJson: function(jsonLink, successFunction) {loadJson(jsonLink, successFunction)}
        }
    }();

    var surveySubmitTools = function() {

        var submissionDisplayElements = function() {

            // SPINNER //
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

            // SUBMISSION WINDOW //
            // Display Window
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

            // SUBMISSION COMPLETE WINDOW //
            $( "#modalBody" ).empty().append( 'Data submitted' );
            $( "#myModalLabel" ).text( 'Done' );
            $( "#modalButton" )
                .text( 'All Done! Go back to reddit!' )
                .on('click', function(){window.location.href = "http://www.reddit.com/r/denver"})
                .show();

            // MISSING IDENTIFIER WINDOW //
            $('#myModalLabel').text('Missing Username');
            $('#modalBody').html("<p>There is only one required field: reddit username.  Please fill it in.</p><i class='icon-spinner icon-spin icon-large'></i>");
            $('#modalButton').text("I'll fill it in!");
            $('#myModal').modal();
            $(identifierDiv).focus();

        }();

        var submissionList = function() {
            var jsonList = [];

            var addToList = function(identifier, key, value) {
                jsonList.push({
                    "identifier": identifier,
                    "key": key,
                    "value": value
                });
            };

            var submitList = function () {

                // SUBMIT WINDOW SHOWS HERE //

                /* Send the data using post */
                var posting = $.post("submitSurvey.php", {answers: jsonList});

                /* Put the results in a div */
                posting.done(function() {
                    // SUBMISSION COMPLETE WINDOW //
                });
            };

            var hasKey = function (key) {
                var keyCount = 0;
                for (var item in jsonList) {
                    if (jsonList.hasOwnProperty(item)) {
                        if (jsonList[item]["key"] &&
                            jsonList[item]["key"] === key &&
                            jsonList[item]["value"].length > 0) {
                                keyCount ++;
                        }
                    }
                }
                return keyCount;
            };

            return {
                append: function(identifier, key, value){addToList(identifier, key, value);},
                submit: function(){submitList();},
                hasKey: function(key) {return hasKey(key);},
                show: function() {return jsonList;}
            };
        };

        var submitData = function() {
            //Create the jsonList
            var currentList = submissionList();
            var requiredKeys = [];
            var missingKeys = [];
            var focusField;

            // Make sure they put a username in
            var identifier = $(identifierDiv).val();
            if (identifierDiv.length > 0) {
                // Get all the selected buttons
                $(".btn.active").each(function() {
                    currentList.append(identifier, this.id, this.textContent);
                    if (this.requiredKey) {requiredKeys.push(this.id);}
                });

                // Get all the text fields
                $("input").each(function() {
                    if ((this.type === "text" || this.type === "hidden") && this.value.length > 0) {
                        currentList.append(identifier, this.id, this.value);
                    }

                    console.log(this);
                    if (this.hasOwnProperty("data-required") && this["data-required"]) {
                        requiredKeys.push(this.id);
                        console.log(this.id);
                    }
                });

                // Check required fields against the currentList
                for (var key in requiredKeys) {
                    if (!currentList.hasKey(key)) {
                        // Change the color of the background div
                        missingKeys.push(key);
                        if (!focusField) {focusField = key;}
                    }
                }
                if (missingKeys.length > 0) {
                    // SHOW A MISSING KEYS ERROR //
                    if (focusField) {
                        $(focusField).focus();
                    }
                }

            } else
            {
                // MISSING IDENTIFIER WINDOW //
            }
            console.log(currentList.show());
            currentList = null;
        };

        return {
            submitData: function() {submitData()}
        };
    }();


    return {
        draw: function(surveyJson) {
            return surveyDrawingTools.drawSurvey(surveyJson);
        },
        load: function(newJsonLink, successFunction) {
            surveyDrawingTools.loadJson(newJsonLink, successFunction);
        },
        submit: function() {
            surveySubmitTools.submitData();
        }
    };
};