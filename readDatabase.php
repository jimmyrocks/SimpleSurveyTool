<?php

require 'db_settings.php';

$answersArray = array();

// Open connection
$con=mysqli_connect($db['server_name'],$db['user'],$db['password'],$db['database_name']);
$output = "{}";
// Check connection
if (mysqli_connect_errno($con))
{
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
else {

    $SQL = "SELECT
 B.answer + ((rand()-rand())/100) as lat,
 C.answer + ((rand()-rand())/100) as lon
FROM
 simpleSurvey A JOIN
 (SELECT BA.username, BA.answer from `simpleSurvey` BA where BA.question = 'location_lat' and BA.answer is not null) B ON A.username = B.username JOIN
 (SELECT CA.username, CA.answer from `simpleSurvey` CA where CA.question = 'location_lon' and CA.answer is not null) C ON A.username = C.username
GROUP BY
 A.username;";
    if($result = mysqli_query($con, $SQL)) {
        $output = "{\n\t\"points\": [";
        while ($db_field = mysqli_fetch_assoc($result)){
            $output .= "\n\t\t{";
            $output .= "\n\t\t\t\"lat\": " . $db_field['lat'];
            $output .= ",\n\t\t\t\"lon\": " . $db_field['lon'];
            $output .= ",\n\t\t\t\"value\": 1";
            $output .= "\n\t\t},";
        }
         $output = substr_replace($output, "", -1);
        $output .= "\n\t]";
         $output .= "\n}";
    }

};
$con->close();
echo $output;
?>