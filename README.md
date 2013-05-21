SimpleSurveyTool
================

Description
-----------
This is a simple surveying tool build in JS mostly on Bootstrap.  It allows users to click on a map to add their location.

Files
-----
* **README.md**: This file
* **drawSurvey.js**: The JavaScript that creates all the buttons and input boxes
* **customSurvey.js**: This is the file that contains all the survey questions
* **index.html**: Pulls it all together, and includes the title and location of the map
* **survey.css**: The styling for the survey.
* **submitSurvey.php**: The php file that talks to a backend MySQL database
* **db_settings.php**: The file that holds all of the settings for the database, this is included as **db_settings_example.php**. You will need to rename this file to **db_settings.php** and change the settings to match your server, username, and password.

Usage
-----
* git clone _this repo_
* rename **db_settings_example.php** to **db_settings.php** and change the username, password, and servername.
* Once you have it downloaded, you'll want to change the customSurvey.json file.  Descriptions of each file and what they do can be found above.
* Set up the database (see below)

```sql
CREATE TABLE IF NOT EXISTS `simpleSurvey` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `question` varchar(64) NOT NULL,
  `answer` tinytext NOT NULL,
  `date_inserted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=185 ;
```

License
-------
Do whatever you want ([WTFPL](http://en.wikipedia.org/wiki/WTFPL)) with my code

