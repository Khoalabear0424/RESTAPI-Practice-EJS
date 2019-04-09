
CREATE TABLE userLogin (
    id INT AUTO_INCREMENT,
    user_email VARCHAR(255),
    user_password VARCHAR(255),
    PRIMARY KEY(id)
);

INSERT INTO userLogin (user_email, user_password) VALUES ('khoa@gmail.com','12345');