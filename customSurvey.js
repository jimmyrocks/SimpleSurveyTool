var surveyJson = [
    {
        name: "username",
        question: "What is your reddit username??",
        input: "text",
        placeholder: ""
    },{
        name: "Gender",
        question: "What gender dare you?",
        input: "divclass",
        divclass: "btn-group",
        divtoggle: "buttons-radio",
        divbuttons:        
        [
            {
                type: "button",
                "class": "btn btn-primary",
                "value": "Male"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Female"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Other"
            }
        ]
    },
    {
        name: "neighborhood",
        question: "What neighborhood do you current live in?",
        input: "text",
        placeholder: ""
    },
    {
        name: "city/town",
        question: "What city or town do you current live in?",
        input: "text",
        placeholder: ""
    },
    {
        name: "age",
        question: "How old are you?",
        input: "divclass",
        divclass: "btn-group",
        divtoggle: "buttons-radio",
        divbuttons:        
        [
            {
                type: "button",
                "class": "btn btn-primary",
                "value": "< 15"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "15-19"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "20-24"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "25-29"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "30-34"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "35-39"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "40-44"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "45-49"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "50-54"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "55-59"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "60-64"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "65-69"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "70-74"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "75-79"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "80-84"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "85-89"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "> 89"
            }
        ]
    },{
        name: "meetups",
        question: "How often do you attend /r/denver meetups?",
        input: "divclass",
        divclass: "btn-group",
        divtoggle: "buttons-radio",
        divbuttons:        
        [
            {
                type: "button",
                "class": "btn btn-primary",
                "value": "Never"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Once"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Occasionally"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Almost Always"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "I've Never Missed one"
            }
        ]
    },{
        name: "subreddit",
        question: "How often do you visit the /r/denver subreddit?",
        input: "divclass",
        divclass: "btn-group",
        divtoggle: "buttons-radio",
        divbuttons:        
        [
            {
                type: "button",
                "class": "btn btn-primary",
                "value": "Never"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Monthly"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Weekly"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Daily"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Multiple Times a Day"
            }
        ]
    },{
        name: "MonthsOnReddit",
        question: "How many years have you used the /r/denver subreddit? (you can approximate or guess)",
        input: "text",
        placeholder: ""
    },{
        name: "otherReddits",
        question: "What other subreddits do you follow? (seperate with a semicolon)",
        input: "text",
        placeholder: ""
    },{
        name: "YearsInColorado",
        question: "How many years have you lived in Colorado?",
        input: "text",
        placeholder: ""
    },{
        name: "YearsInDenver",
        question: "How many years have you lived in your current city?",
        input: "text",
        placeholder: ""
    },{
        name: "Hometown",
        question: "What city/town would you consider your 'Hometown'?",
        input: "text",
        placeholder: ""
    },{
        name: "places_lived",
        question: "List all the places you've lived? (sperated them with a semi-colon)",
        input: "text",
        placeholder: ""
    },{
        name: "HighSchool",
        question: "In what city/town did/will you attend High School? (if you attended more than one, put the most interesting one down",
        input: "text",
        placeholder: ""
    },{
        name: "studentYN",
        question: "Are you currently a student anywhere?",
        input: "divclass",
        divclass: "btn-group",
        divtoggle: "buttons-radio",
        divbuttons:        
        [
            {
                type: "button",
                "class": "btn btn-primary",
                "value": "Yes"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "No"
            }
        ]
    },{
        name: "SchoolName",
        question: "What High School / University / College / Trade school do you currently attend?",
        input: "text",
        placeholder: ""
    },{
        name: "education",
        question: "What is your maximum level of education?",
        input: "divclass",
        divclass: "btn-group",
        divtoggle: "buttons-radio",
        divbuttons:        
        [
            {
                type: "button",
                "class": "btn btn-primary",
                "value": "Some High School"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "High School"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Associates"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Bachelor"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Masters"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Doctorate"
            }
        ]
    },{
        name: "employmentStatus",
        question: "What is your employment status?",
        input: "divclass",
        divclass: "btn-group",
        divtoggle: "buttons-radio",
        divbuttons:        
        [
            {
                type: "button",
                "class": "btn btn-primary",
                "value": "Full Time Job"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Part Time Job"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Looking for work"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Retired"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Student"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Homemaker"
            },
        ]
    },{
        name: "travelDistance",
        question: "How far do you travel for work or school? (in miles, one direction)",
        input: "text",
        placeholder: ""
    },{
        name: "industry",
        question: "What industries to you work in? (pick all that apply)",
        input: "divclass",
        divclass: "btn-group",
        divtoggle: "buttons-checkbox",
        divbuttons:        
        [
            {
                type: "button",
                "class": "btn btn-primary",
                "value": "Mining"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Utilities"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Construction"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Wholesale trade"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Retail"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Warehousing or Transportation"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Finance and Insurance"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Real estate"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "waste management"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Scientific, profession, or techincal services"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Education"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Manufacturing"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Food or Hotel Services"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Other Services"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Other Trades"
            }
        ]
    },{
        name: "main_transportation",
        question: "How do you get to school/work most often? (Select one)",
        input: "divclass",
        divclass: "btn-group",
        divtoggle: "buttons-radio",
        divbuttons:        
        [
            {
                type: "button",
                "class": "btn btn-primary",
                "value": "Bicycle"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Walk"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Car"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Truck"
            },,{
                type: "button",
                "class": "btn btn-primary",
                "value": "Scooter"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Motorcycle"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Car pool"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Skateboard"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Bus"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Light Rail"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Other"
            }
        ]
    },{
        name: "all_transportation",
        question: "What types of transportation do you use? (Select as many as you'd like)",
        input: "divclass",
        divclass: "btn-group",
        divtoggle: "buttons-checkbox",
        divbuttons:        
        [
            {
                type: "button",
                "class": "btn btn-primary",
                "value": "Bicycle"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Walk"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Car"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Truck"
            },,{
                type: "button",
                "class": "btn btn-primary",
                "value": "Scooter"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Motorcycle"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Car pool"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Skateboard"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Bus"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Light Rail"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Other"
            }
        ]
    },{
        name: "pets",
        question: "Do you have any pets? (Select all that apply)",
        input: "divclass",
        divclass: "btn-group",
        divtoggle: "buttons-checkbox",
        divbuttons:        
        [
            {
                type: "button",
                "class": "btn btn-primary",
                "value": "Dog"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Cat"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Fish"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Bird"
            },,{
                type: "button",
                "class": "btn btn-primary",
                "value": "Snake"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Turtle"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Chicken"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Spider"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Hamster"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Rabbit"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Lizard"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Ferret"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Guinea Pig"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Gerbil"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Other"
            }
        ]
    },{
        name: "panhandlers",
        question: "Do you give money to panhandlers?",
        input: "divclass",
        divclass: "btn-group",
        divtoggle: "buttons-radio",
        divbuttons:        
        [
            {
                type: "button",
                "class": "btn btn-primary",
                "value": "I try my best"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Only if they do something nice for me"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "If I have extra change"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "If I truely think they're need"
            },{
                type: "button",
                "class": "btn btn-primary",
                "value": "Never"
            }
        ]
    }
];