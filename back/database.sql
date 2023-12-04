CREATE TABLE users (
  person_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tests_list (
  id INT PRIMARY KEY,
  title VARCHAR(255),
  description VARCHAR(255),
  category VARCHAR(255),
  author VARCHAR(255)
);

-- CREATE TABLE quizzes (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   title VARCHAR(100) NOT NULL,
--   user_id INT,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (user_id) REFERENCES users(id)
-- );

-- CREATE TABLE questions (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   quiz_id INT,
--   question_text TEXT NOT NULL,
--   FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
-- );

-- CREATE TABLE options (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   question_id INT,
--   option_text TEXT NOT NULL,
--   is_correct BOOLEAN DEFAULT FALSE,
--   FOREIGN KEY (question_id) REFERENCES questions(id)
-- );

-- CREATE TABLE answers (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   quiz_id INT,
--   question_id INT,
--   option_id INT,
--   user_id INT,
--   FOREIGN KEY (quiz_id) REFERENCES quizzes(id),
--   FOREIGN KEY (question_id) REFERENCES questions(id),
--   FOREIGN KEY (option_id) REFERENCES options(id),
--   FOREIGN KEY (user_id) REFERENCES users(id)
-- );