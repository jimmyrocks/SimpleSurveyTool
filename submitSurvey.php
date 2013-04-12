<?php

require 'db_settings.php';

$surveyAnswers = $_POST[answers];

$answersArray = array();

foreach ($surveyAnswers as $surveyAnswer) {
    $valuesArray = array();
    $counter = 0;
    foreach ($surveyAnswer as $value) {
        $valuesArray[] = $value;
        if ($counter % 3 == 2 && count($valuesArray) > 0) {
            $answersArray[] = $valuesArray;
            $valuesArray = array();
        }
        $counter++;
    }
}


// Open connection
$con=mysqli_connect($db['server_name'],$db['user'],$db['password'],$db['database_name']);

// Check connection
if (mysqli_connect_errno($con))
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
  else {
  
    foreach ($answersArray as $values) {
        $sql = "INSERT INTO\n"
            . " simpleSurvey\n"
            . "(username, question, answer, date_inserted)\n"
            . "values (\n"
            . " '" . $values[0] . "',\n"
            . " '" . $values[1] . "',\n"
            . " '" . $values[2] . "',\n"
            . " now()\n"
            . ");";
        $con->query($sql);
    }
  
  };
$con->close();
?>