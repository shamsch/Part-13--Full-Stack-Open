CREATE TABLE blogs (id SERIAL PRIMARY KEY, author varchar(255), url_string varchar(255) NOT NULL, title varchar(255) NOT NULL, likes INTEGER DEFAULT 0);

INSERT INTO blogs (author, url_string, title) VALUES ('John Doe', 'http://www.example.com', 'Example Blog');

INSERT INTO blogs (author, url_string, title) VALUES ('Jane Doe', 'http://www.example2.com', 'Example Blog 2');

SELECT * FROM blogs;