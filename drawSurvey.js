$(document).ready(function(){

       var thisSurvey = survey("./customSurvey.json");
        thisSurvey.load("./customSurvey.json", function(data) {
            var htmlData = thisSurvey.draw(data);

            // Add the page title
            if (data.hasOwnProperty("title")) {
                $("title").html(data["title"]);
            }
            // Add the survey
            $("#survey").html(htmlData);

            // Update the submit button
            $("#submitButton")
                .click(function(){
                    thisSurvey.submit();
                })
                .data(
                    "fwd-url",
                    data["exitUrl"]
                );

            // Update the maps
            $(".leaflet_Map").each(function () {
                loadMap(
                    this.id,
                    {
                        lat: $(this).data("lat"),
                        lon: $(this).data("lon"),
                        zoom: $(this).data("zoom")
                    },
                    $(this).data("lat_field"),
                    $(this).data("lon_field")
                );
            });

            // Make map resizable
            $( ".mapHolder" ).parent().parent().resizable({
                resize: function() {
                    $(".leaflet_Map").each(function () {
                        var outerSize = $(this).parent().parent().parent().height();
                        var diffSize = 40;
                        $(this).attr("style", "width: 95%; height: " + (outerSize - diffSize) + "px; position: relative;");
                        $(this).data("mapVar").invalidateSize(false);
                    });
                }
            });
        });
});

var loadMap = function(mapDiv, position, latField, lonField) {
    // Define the tile services
    var baseMaps = {
        "OpenStreetMap" : L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: "Map data © OpenStreetMap contributors"
            }),
        "MapQuest Streets":  L.tileLayer(
            'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
                maxZoom: 18,
                subdomains: '1234',
                attribution: "Data, imagery and map information provided by MapQuest, Open Street Map <http://www.openstreetmap.org/> and contributors, CC-BY-SA <http://creativecommons.org/licenses/by-sa/2.0/> ."
            }),
        "MapQuest Aerial":  L.tileLayer(
            'http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
                maxZoom: 18,
                subdomains: '1234',
                attribution: "Data, imagery and map information provided by MapQuest, Open Street Map <http://www.openstreetmap.org/> and contributors, CC-BY-SA <http://creativecommons.org/licenses/by-sa/2.0/> ."
            }),
        "OpenCycleMap": L.tileLayer(
            'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: "Map data © OpenStreetMap contributors"
            })
    };

    // Create the map
    var map = L.map(mapDiv).setView([position.lat, position.lon], position.zoom);
    map.invalidateSize(false);
    baseMaps["OpenStreetMap"].addTo(map);
    L.control.layers(baseMaps).addTo(map);
    $("#" + mapDiv).data("mapVar", map);

    var marker;
    // Click function
    function onMapClick(e) {
        // Add the value to the hidden boxes
        $("#" + latField).attr("value", e.latlng.lat);
        $("#" + lonField).attr("value", e.latlng.lng);
        //Add Pin
        if (marker) {map.removeLayer(marker);}
        marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map).bindPopup('Your Selected Location is: <ul><li>Lat: ' + e.latlng.lat + '</li><li>Lng: ' + e.latlng.lng + '</li></ul>').openPopup();
    }
    map.on('click', onMapClick);
};

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
                        'class': 'btn btn-success btn-xlarge'
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
            });
        };

        var createQuestionDiv = function(question) {
            // Create the Div Element where the question will reside
            var questionDiv = customElement(
                "div",
                {
                    'name': question.name,
                    'id': question.name,
                    'class': "questionBox"
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
                inputs.appendChild(drawButtons(question.divbuttons, question.name, question.required));
            } else if (question.input === "text") {
                if (question.multi) {
                    inputs.appendChild(drawMultipleTextboxes(1, question.placeholder, question.name, question.required));
                } else {
                    inputs.appendChild(drawTextbox(question.placeholder, question.name, null, question.required));
                }
            } else if (question.input === "map") {
                inputs.appendChild(drawMapHolder(question.name, null, question.required))
            }

            // Add a star to show if it's required
            if (question.required){
                header.appendChild(
                    customElement(
                        "span",
                        {
                            "class": "required",
                            "title": "Required Field"
                        },
                        " *"
                    )
                );
            }

            questionDiv.appendChild(header);
            questionDiv.appendChild(inputs);

            return questionDiv;
        };

        var drawButtons = function (buttons, questionName, required) {
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
                            'class': buttonTheme,
                            'data-required': required ? true : false
                        },
                        buttonJson.value
                    );

                    buttonsDiv.appendChild(button);
                }
            }

            return buttonsDiv;
        };

        var drawMultipleTextboxes = function(inputCount, placeholder, name, required) {
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
            $(thisDivReference).each(function(){
                displayText.push($(this).val());
            });

            for (var i = 0; i < inputCount; i++) {
                var thisValue = "";
                if (displayText && displayText[i]) {
                    thisValue = displayText[i];
                }
                textField.appendChild(drawTextbox(placeholder, name, thisValue, required));
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
                        textField.innerHTML = "";
                        textField.appendChild(newTextBoxes);
                    };

                    return addRemoveItem;
            };

            if (inputCount < upperLimit) {textField.appendChild(multiButtons("add"));}
            if (inputCount > lowerLimit) {textField.appendChild(multiButtons("remove"));}

            return textField;
        };

        var drawTextbox = function(placeholder, idName, textValue, required) {
            textValue = textValue ? textValue : "";
            return customElement(
                "input",
                {
                    "type": "text",
                    "class": "textInput",
                    "placeholder": placeholder,
                    "value": textValue,
                    'id': idName,
                    'data-required': required ? true : false
                },
                textValue
            );
        };

        var drawMapHolder = function(idName, position, required) {
            //Set the positions
            position = position ? position : {
                lat: 39.739,
                lon: -104.9847,
                zoom: 12
            };

            //Create the div to hold the map elements
            var mapFeature = customElement(
                "div",
                {
                    "class": "mapHolder"
                }
            );

            //Create the hidden input boxes
            mapFeature.appendChild(customElement(
                "input",
                {
                    "type": "hidden",
                    "id": idName + "_lat",
                    "data-required": required ? true : false
                }
            ));
            mapFeature.appendChild(customElement(
                "input",
                {
                    "type": "hidden",
                    "id": idName + "_lon",
                    "data-required": required ? true : false
                }
            ));

            //Create the map holder div
            mapFeature.appendChild(customElement(
                "div",
                {
                    "class": "leaflet_Map",
                    "name": idName,
                    "id": idName + "_leafletMap",
                    "data-lat": position.lat,
                    "data-lon": position.lon,
                    "data-zoom": position.zoom,
                    "data-lat_field": idName + "_lat",
                    "data-lon_field": idName + "_lon",
                    "style": "width: 95%; height: 250px"
                }
            ));

            return mapFeature;
        };

        return {
            drawSurvey: function(json) {return drawSurvey(json)},
            loadJson: function(jsonLink, successFunction) {loadJson(jsonLink, successFunction)}
        }
    }();

    var surveySubmitTools = function() {

        var submissionDisplayElements = function() {

            // SUBMISSION WINDOW //
            // Display Window

            var modalWindow = customElement(
                "div",
                {
                    "id": "modalWindow",
                    "class": "modal hide fade",
                    "tabindex": "-1",
                    "role": "dialog",
                    "aria-labelledby": "modalLabel",
                    "aria-hidden": "true"
                }
            );

            var modalHeader = customElement(
                "div",
                {
                    "class": "modal-header"
                }
            );
            var modalLabel = customElement(
                "h3",
                {
                    "id": "modalLabel"
                }
            );
            var modalBody = customElement(
                "div",
                {
                    "id": "modalBody",
                    "style": "margin:20px 20px 10px;}"
                }
            );
            var modalFooter = customElement(
                "div",
                {
                    "class": "modal-footer"
                }
            );
            var modalButton = customElement(
                "button",
                {
                    "id": "modalButton",
                    "data-dismiss": "modal",
                    "class": "btn btn-success"
                }
            );

            // Assemble the windows
            modalFooter.appendChild(modalButton);
            modalHeader.appendChild(modalLabel);
            modalWindow.appendChild(modalHeader);
            modalWindow.appendChild(modalBody);
            modalWindow.appendChild(modalFooter);

            $("body").append(modalWindow);

        }();

        var showModalWindow = function(message, extraMessages) {

            // SPINNER //
            var drawSpinner = function(){
                var spinner = customElement(
                    "div",
                    {
                        "style": 'position: absolute; margin-top: -35px; margin-left: 325px;'
                    }
                );
                for (var i=1; i<9; i++) {
                    var spinstep = document.createElement("div");
                    spinstep.setAttribute('class', 'spinningSquaresG');
                    spinstep.setAttribute('id', 'spinningSquaresG_' + i);
                    spinner.appendChild(spinstep);
                }
                return spinner;
            };

            var fieldFields = "field";
            if (extraMessages && extraMessages.length > 1) {
                fieldFields = "fields";
            }

            var modalMessages = {
                "submitting": {
                    "label": "Submitting Data...",
                    "text": "Your survey is being submitted to our server",
                    "spinner": "true"
                },
                "missing": {
                    "label": "Required " + fieldFields + " missing.",
                    "text": "You are missing the following " + fieldFields + ":",
                    "button": "Let me fix that!"
                },
                "completed": {
                    "label": "Done",
                    "text": "Data submitted",
                    "button": "All done!",
                    "button-action": "true"
                }
            };

            $( "#modalBody" ).empty().append("<p>" + modalMessages[message].text + "</p>");

            // Extra messages
            if (extraMessages) {
                var extraMessageList = customElement("ul");
                for (var extraMessage in extraMessages) {
                    extraMessageList.appendChild(
                        customElement("li",null,extraMessages[extraMessage])
                    );
                }
                $( "#modalBody").append(extraMessageList.customGetOuterHtml());

            }
            // Add a spinner
            if (modalMessages[message]["spinner"]) {
                $( "#modalBody").append(
                    drawSpinner().customGetOuterHtml()
                );
            }

            $( "#modalLabel" ).text(modalMessages[message].label);

            if (modalMessages[message].button) {

                if (modalMessages[message]["button-action"] && $("#submitButton").data("fwd-url")) {
                    $("#modalButton").on('click', function(){window.location.href = $("#submitButton").data("fwd-url")});
                }

                $("#modalButton")
                    .text(modalMessages[message].button)
                    .show();
            } else {
                $("#modalButton").hide();
            }

            // Display the window
            $("#modalWindow").modal();
        };

        var submissionList = function() {
            var jsonList = [];

            var addToList = function(identifier, key, value) {
                jsonList.push({
                    "identifier": identifier,
                    "key": key,
                    "value": value
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

            // Make sure the user enters all required fields
            var identifier = $(identifierDiv).val();
            if (identifierDiv.length > 0) {
                // Get all the selected buttons
                $(".btn.active").each(function() {
                    currentList.append(identifier, this.id, this.textContent);
                    if (this.hasAttribute("data-required") && this["data-required"]) {
                        requiredKeys.push(this.id);
                    }
                });

                // Get all the text fields
                $("input").each(function() {
                    if ((this.type === "text" || this.type === "hidden") && this.value.length > 0) {
                        currentList.append(identifier, this.id, this.value);
                    }

                    if (this.hasAttribute("data-required") && this.getAttribute("data-required") === "true") {
                        requiredKeys.push(this.id);
                    }
                });

                // Check required fields against the currentList
                for (var key in requiredKeys) {
                    if (!currentList.hasKey(requiredKeys[key])) {
                        // Change the color of the background div
                        missingKeys.push(requiredKeys[key]);
                        if (!focusField) {focusField = requiredKeys[key];}
                    }
                }
                if (missingKeys.length > 0) {
                    // SHOW A MISSING KEYS ERROR //
                    if (focusField) {
                        $("input#" + focusField).focus();
                    }
                    showModalWindow("missing", missingKeys);
                } else {
                    showModalWindow("submitting");

                    /* Send the data using post */
                    var posting = $.post("submitSurvey.php", {answers: currentList.show()});

                    /* Put the results in a div */
                    posting.done(function() {
                        showModalWindow("completed");
                    });
                }

            }
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

    // Add a universal outerHTML function
    var getOuterHTML = function() {
        var outerElement = document.createElement("div");
        outerElement.appendChild(newElement);
        return outerElement.innerHTML;
    };

    newElement.customGetOuterHtml = getOuterHTML;

    return newElement;
};