CREATE DATABASE school_website;
USE school_website;



CREATE TABLE admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE home_slider (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    image_url VARCHAR(500) NOT NULL,
    display_order INT DEFAULT 0 UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,                 
    position VARCHAR(150) NULL,                
    review_text TEXT NOT NULL,                 
    status ENUM('pending', 'approved') DEFAULT 'pending',  
    image VARCHAR(500) NULL,                  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE faqs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE team (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role ENUM('teacher', 'committee') NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NULL,
    number VARCHAR(50) NOT NULL,
    position VARCHAR(255) NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- This category is relation with gallary table.
CREATE TABLE gallery_category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(200) NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    image_url TEXT NOT NULL,  
    caption VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES gallery_category(id)
    ON DELETE CASCADE
);


-- This category is relation with notice table.
CREATE TABLE notice_category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(200) NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notice (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NULL,
    title VARCHAR(255) NOT NULL,
    notice_date DATE NOT NULL,
    attachment_url VARCHAR(500) NULL,
    attachment_type ENUM('pdf', 'image') NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES notice_category(category_id)
    ON DELETE SET NULL
);


-- This category is relation with blog table.
CREATE TABLE blog_category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(200) NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blog (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500) NULL,    
    published_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES blog_category(category_id)
    ON DELETE SET NULL
);

-- This category is relation with vacancy table.
CREATE TABLE vacancy_category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(200) NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vacancy (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    application_deadline DATE NULL,
    posted_date DATE NOT NULL,
    status ENUM('open', 'closed', 'pending') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES vacancy_category(category_id)
    ON DELETE SET NULL
);

CREATE TABLE result (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category ENUM('Test', 'Final') NOT NULL,
    title VARCHAR(255) NOT NULL,
    published_date DATE NOT NULL,
    attachment_url VARCHAR(500) NOT NULL, 
    attachment_type ENUM('pdf', 'image') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE event (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category ENUM('Monthly', 'Yearly') NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    event_date DATE NOT NULL,             
    pdf_url VARCHAR(500) NULL,             
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE achievement (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    achievement_date DATE NOT NULL,
    image_urls TEXT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);





