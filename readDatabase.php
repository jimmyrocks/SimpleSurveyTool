<?php

require 'db_settings.php';

$answersArray = array();

// Open connection
$con=mysqli_connect($db['server_name'],$db['user'],$db['password'],$db['database_name']);

// Check connection
if (mysqli_connect_errno($con))
{
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
else {

    $SQL = "select count(*) as 'x' from simpleSurvey";
    $result = mysql_query($SQL);

    while ($db_field = mysql_fetch_assoc($result)){
        print $db_field['x'];
    }

};
$con->close();
?>