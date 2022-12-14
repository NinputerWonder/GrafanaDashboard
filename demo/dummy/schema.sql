DROP TABLE IF EXISTS
    bug_info;
DROP TABLE IF EXISTS
    bug_level;
DROP TABLE IF EXISTS
    bug_reason;
DROP TABLE IF EXISTS
    risk;
DROP TABLE IF EXISTS
    test_coverage;

CREATE TABLE bug_level(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(1024) NOT NULL
) DEFAULT CHARSET = utf8;

CREATE TABLE bug_reason(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(1024) NOT NULL
) DEFAULT CHARSET = utf8;

CREATE TABLE bug_info(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    url VARCHAR(1024) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME DEFAULT NULL,
    reason_id INT UNSIGNED DEFAULT NULL,
    level_id INT UNSIGNED DEFAULT NULL,
    FOREIGN KEY(reason_id) REFERENCES bug_reason(id),
    FOREIGN KEY(level_id) REFERENCES bug_level(id)
) DEFAULT CHARSET = utf8;

CREATE TABLE risk(
   id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
   date datetime NOT NULL,
   count INT NOT NULL
) DEFAULT CHARSET=utf8;

CREATE TABLE test_coverage(
   id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
   date datetime NOT NULL,
   coverage DECIMAL(3,3) NOT NULL
) DEFAULT CHARSET=utf8;


