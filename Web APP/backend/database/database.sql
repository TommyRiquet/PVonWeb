CREATE TABLE users (
    userId int NOT NULL AUTO_INCREMENT,
    lastName varchar(255) NOT NULL ,
    firstName varchar(255) NOT NULL ,
	email varchar(255) NOT NULL ,
    password varchar(255) NOT NULL ,
    phoneNumber varchar(12) NOT NULL ,
    createdAt date NOT NULL ,
    updatedAt date NOT NULL ,
    PRIMARY KEY (userId)
);


CREATE TABLE sessions (
    sessionId varchar(255) NOT NULL,
    userId int NOT NULL ,
    createdAt date NOT NULL ,
    updatedAt date NOT NULL ,
    PRIMARY KEY (sessionId)
    FOREIGN KEY (userId) REFERENCES users(userId)
);