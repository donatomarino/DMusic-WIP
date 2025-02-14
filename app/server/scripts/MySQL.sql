#DROP DATABASE DMusic;
CREATE DATABASE DMusic;
USE DMusic;

-- Creamos la tabla User
CREATE TABLE Users (
id_user INT AUTO_INCREMENT PRIMARY KEY,
full_name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
pass VARCHAR(255) NOT NULL,
birthdate DATE NOT NULL,
gender VARCHAR(10) NOT NULL
);

-- Insertamos datos en la tabla users
INSERT INTO Users VALUES(NULL, 'Donato Marino', 'donato_8@icloud.com', '1234', '2000-01-15', 'hombre');

SELECT * FROM Users;



-- Creamos la tabla Songs
CREATE TABLE Songs(
id_song INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
duration TIME NOT NULL,
genre VARCHAR(255),
url VARCHAR(255) NOT NULL,
image VARCHAR(255),
score DECIMAL(5,2),
id_artist INT NOT NULL
);


-- Insertamos datos en la tabla Songs
INSERT INTO Songs VALUES
(NULL, 'Baile InoLVIDABLE', '00:06:18', 'Raggaetton', 'https://www.youtube.com/watch?v=a1Femq4NPxs&ab_channel=BadBunny', 'https://t2.genius.com/unsafe/504x504/https%3A%2F%2Fimages.genius.com%2F66f08db4c1d9d323ab441ab6c04a034a.1000x1000x1.png', 9, 1),
(NULL, 'The Age Of Love', '00:06:22', 'Tecno', 'https://www.youtube.com/watch?v=0YVvcTIGy40&ab_channel=CharlottedeWitte', 'https://t2.genius.com/unsafe/600x0/https%3A%2F%2Fimages.genius.com%2F3d4759fb8e0c210198bb7c2e9a1f92b1.500x500x1.jpg', 9.9, 2),
(NULL, 'Tu Me Quieres', '00:03:47', 'Trap', 'https://www.youtube.com/watch?v=CpZ7Mhittv8&ab_channel=BabyGang', 'https://t2.genius.com/unsafe/504x504/https%3A%2F%2Fimages.genius.com%2F239bf8df4dfb37b7c74c40cba9136498.1000x1000x1.png', 9.5, 3),
(NULL, 'DeBÍ TiRAR MáS FOToS', '00:03:05', 'Ragaetton', 'https://www.youtube.com/watch?v=zAfrPjTvSNs&list=OLAK5uy_kj-tmla329HlShco8Gc0_Raha_FFuTB3c&ab_channel=BadBunny', 'https://t2.genius.com/unsafe/600x600/https%3A%2F%2Fimages.genius.com%2F66f08db4c1d9d323ab441ab6c04a034a.1000x1000x1.png', 9.7, 1),
(NULL, 'Pero Tú', '00:02:57', 'Ragaetton', 'https://www.youtube.com/watch?v=gzSf0WXFdb8&ab_channel=KarolGVEVO', 'https://t2.genius.com/unsafe/504x504/https%3A%2F%2Fimages.genius.com%2F281b83d9beed781e49c498f400afa4f5.640x640x1.jpg', 9.9, 4),
(NULL, 'Someone Like You', '00:04:44', 'Ballad', 'https://www.youtube.com/watch?v=hLQl3WQQoQ0&ab_channel=AdeleVEVO', 'https://t2.genius.com/unsafe/504x504/https%3A%2F%2Fimages.genius.com%2F48caff7f3cd18b4f4e9b2db1baf3d576.1000x1000x1.png', 9.0, 8),
(NULL, 'Despacito', '00:04:41', 'Reggaeton', 'https://www.youtube.com/watch?v=kJQP7kiw5Fk&ab_channel=LuisFonsiVEVO', 'https://t2.genius.com/unsafe/504x504/https%3A%2F%2Fimages.genius.com%2F6dbadaf716039dad3841a1640755ac3a.1000x1000x1.png', 9.3, 9),
(NULL, 'REBOTA', '00:03:29', 'Ragaetton', 'https://www.youtube.com/watch?v=xtx-VyziqUg&ab_channel=KarinayMarina', 'https://t2.genius.com/unsafe/504x504/https%3A%2F%2Fimages.genius.com%2Fc69cd2fbcfbd69a99c7a445754a4c679.300x300x1.jpg', 8.1, 5),
(NULL, 'DOLCE', '00:03:18', 'Latino', 'https://www.youtube.com/watch?v=1VUBtO89UIs&ab_channel=CAZZUCanalOficial', 'https://t2.genius.com/unsafe/504x504/https%3A%2F%2Fimages.genius.com%2F95a555bd9a68b4ce7bf726b3cdedc248.1000x1000x1.png', 8.3, 6),
(NULL, 'Soltera', '00:04:08', 'Latino', 'https://www.youtube.com/watch?v=oBofuVYDoG4&ab_channel=shakiraVEVO', 'https://t2.genius.com/unsafe/504x504/https%3A%2F%2Fimages.genius.com%2F591fd77de49c251aa4e05691166a60b5.1000x1000x1.png', 8.5, 7),
(NULL, 'GIRL LIKE ME', '00:03:58', 'Latino', 'https://www.youtube.com/watch?v=vMLk_T0PPbk&ab_channel=BlackEyedPeasVEVO', 'https://t2.genius.com/unsafe/504x504/https%3A%2F%2Fimages.genius.com%2F124f3cddce7532eb26594b949010ae8f.1000x1000x1.jpg', 8.4, 7),
(NULL, 'Roar', '00:05:55', 'Tecno', 'https://www.youtube.com/watch?v=1OY8B8J4lk4&ab_channel=KNTXT', 'https://t2.genius.com/unsafe/504x504/https%3A%2F%2Fimages.genius.com%2Fedc02ee11001ed707a21838f4376f696.1000x1000x1.png', 9.1, 2),
(NULL, 'Ma Chérie', '00:02:50', 'Trap', 'https://www.youtube.com/watch?v=nQ9CA6eVDJw&ab_channel=BabyGang', 'https://t2.genius.com/unsafe/504x504/https%3A%2F%2Fimages.genius.com%2F17bbb5e6470ce849dcc3df2f294345eb.1000x1000x1.jpg', 8.7, 7),
(NULL, 'Si Antes Te Hubiera Conocido', '00:03:15', 'Ragaetton', 'https://www.youtube.com/watch?v=QCZZwZQ4qNs&ab_channel=KarolGVEVO', 'https://t2.genius.com/unsafe/504x504/https%3A%2F%2Fimages.genius.com%2Fb29d7abd74acce26b24675c6ba87b4ca.1000x1000x1.png', 9.0, 4);

SELECT * FROM Songs;



-- Creamos la tabla Artists
CREATE TABLE Artists(
id_artist INT AUTO_INCREMENT PRIMARY KEY,
full_name VARCHAR(255) NOT NULL,
avatar VARCHAR(255),
popularity DECIMAL(5,2)
);

-- Insertamos artistas
INSERT INTO Artists VALUES
(NULL, 'Bad Bunny', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjPfQxfIDmlM8kL_JN2sTrArKznP__WLxIXw&s', 10),
(NULL, 'Charlotte De Witte', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNaIbA_peeII3ywjtaFl_ME0U51pT62fPPtQ&s', 10),
(NULL, 'Baby Gang', 'https://static1.personality-database.com/profile_images/f4ea535e43c74e3cb30dc18af1b664eb.png', 9),
(NULL, 'Karol G', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3nORetF0EY_qOtXjpbpmp9KWpFt7sk_VwVA&s', 9.5),
(NULL, 'Shakira', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ539t66fzB7J4m8KPgh5meWDI9OnWd0Wc8ow&s', 9),
(NULL, 'Karima', '', 8),
(NULL, 'Cazzu', '', 8.2),
(NULL, 'Adele', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtzbUtdL485w4Ql_LNIbHYtPv0Ku-Fx7CIlg&s', 8.6),
(NULL, 'Luis Fonsi', 'https://images.sk-static.com/images/media/profile_images/artists/328569/huge_avatar', 8.7);

-- Añadimos FK en la tabla Songs
ALTER TABLE Songs ADD CONSTRAINT FK_Artistas_Songs FOREIGN KEY (id_artist) REFERENCES Artists(id_artist) ON DELETE CASCADE ON UPDATE CASCADE;

SELECT * FROM Artists;



# DROP TABLE users_songs;
-- Creamos la tabla relación usuarios y canciones
CREATE TABLE users_songs(
id_user INT,
id_song INT,
PRIMARY KEY(id_user, id_song),
FOREIGN KEY (id_user) REFERENCES Users(id_user),
FOREIGN KEY (id_song) REFERENCES Songs(id_song)
);

INSERT INTO users_songs VALUES(1, 1);

/*
--- Prueba JOIN tabla artists y songs ---
SELECT a.full_name, s.title FROM Songs s 
INNER JOIN Artists a ON a.id_artist = s.id_artist; 

--- Prueba JOIN tabla users y songs ---
SELECT u.full_name, u.email, s.title FROM users_songs us
JOIN Users u ON u.id_user = us.id_user
JOIN Songs s ON s.id_song = us.id_song;
*/

SELECT a.full_name, s.title, s.score, s.image FROM Songs s 
INNER JOIN Artists a ON a.id_artist = s.id_artist;

SELECT us.id_user, s.image, s.title, a.full_name 
FROM users_songs us 
JOIN Users u ON u.id_user = us.id_user 
JOIN Songs s ON s.id_song = us.id_song 
JOIN Artists a ON s.id_artist = a.id_artist
WHERE us.id_user = 1;









