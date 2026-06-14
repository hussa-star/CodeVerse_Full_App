// -- USERS TABLE
    CREATE TABLE users(
   userid INT(20) NOT NULL AUTO_INCREMENT,
     username VARCHAR(20) NOT NULL,
     firstname VARCHAR(20) NOT NULL,
     lastname VARCHAR(20) NOT NULL,
     email VARCHAR(40) NOT NULL,
     password VARCHAR(100) NOT NULL,
     PRIMARY KEY(userid)
 );

 -- QUESTIONS TABLE
 CREATE TABLE questions(
     id INT(20) NOT NULL AUTO_INCREMENT,
     questionid VARCHAR(100) NOT NULL UNIQUE,
     userid INT(20) NOT NULL,
     title VARCHAR(50) NOT NULL,
     description VARCHAR(200) NOT NULL,
     tag VARCHAR(20),

     PRIMARY KEY(id, questionid),

     FOREIGN KEY(userid)
         REFERENCES users(userid)
         ON DELETE CASCADE
         ON UPDATE CASCADE
 );

 -- ANSWERS TABLE
 CREATE TABLE answers(
     answerid INT(20) NOT NULL AUTO_INCREMENT,
     userid INT(20) NOT NULL,
     questionid VARCHAR(100) NOT NULL,
     answer VARCHAR(200) NOT NULL,

     PRIMARY KEY(answerid),

     FOREIGN KEY(userid)
         REFERENCES users(userid)
         ON DELETE CASCADE
         ON UPDATE CASCADE,

     FOREIGN KEY(questionid)
         REFERENCES questions(questionid)
         ON DELETE CASCADE
         ON UPDATE CASCADE
