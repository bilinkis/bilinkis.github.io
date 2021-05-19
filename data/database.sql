CREATE TABLE users (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
name VARCHAR (100) NOT NULL,
lastName VARCHAR (100) NOT NULL,
email VARCHAR (200) NOT NULL, 
phone INT NOT NULL, 
gender VARCHAR(100) NOT NULL, 
password VARCHAR(64) NOT NULL,
birthday DATE NOT NULL,
image VARCHAR(100)
);

CREATE TABLE posts (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(200) NOT NULL, 
description VARCHAR(500) NULL,
image VARCHAR(350) NULL,
userId INT UNSIGNED,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
comments INT UNSIGNED,

FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE comments (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
userId INT UNSIGNED,
comment VARCHAR(250) NOT NULL,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
productId INT UNSIGNED,

FOREIGN KEY (userId) REFERENCES users(id),
FOREIGN KEY (productId) REFERENCES posts(id)
);

INSERT INTO users
VALUES (DEFAULT, 'Bautista', 'Abella', 'bautiabella@hotmail.com', '123345678', 'Prefiero no responder', 'bauticapo123', '2001-08-23', ''),(DEFAULT, 'Sofia', 'Ruiz', 'sofiruiz12@gmail.com', '123345678', 'Mujer', 'sofitalinda89', '2003-02-06',''), (DEFAULT, 'Josefina', 'Staudenmaier', 'jochust@gmail.com', '1154701208', 'Mujer', 'cangurito23', '2001-08-12',''), (DEFAULT, 'Nicolas', 'Bilinkis', 'nico@bilinkis.com', '12345648', 'Hombre', 'amogithub', '1999-08-03',''), (DEFAULT, 'Carlos', 'Perez', 'charliperez@hotmail.com', '1554789699', 'Hombre', 'charlikari', '1970-11-25','');

INSERT INTO posts
VALUES (DEFAULT, 'Teg Clásico', 'Disfrutá de una apasionante acción bélica donde intervienen la lógica, la inteligencia y el azar.El juego tiene lugar en un planisferio dividido en 50 países. Cada jugador tiene un objetivo secreto a cumplir, para lo cual deberá, mediante diferentes estrategias, ampliar sus dominios, reordenar sus fuerzas, realizar pactos, emprender ataques y defenderse de los adversarios. El primer jugador en lograr su objetivo secreto, o conquistar 30 países (objetivo común), será el ganador.', '1.jpg', '1', DEFAULT,0),
(DEFAULT, 'Monopoly', 'El emocionante juego de negociar propiedades. El objetivo de este juego es obtener grandes beneficios comprando y vendiendo propiedades, de tal forma que uno de los jugadores llegue a ser el más rico y por consiguiente el ganador.', '2.jpg', '5', DEFAULT,0),
(DEFAULT, 'HDP', '¿Cuál es el más zarpado entre todos tus amigos? Un jugador (el HDP) lee una carta de pregunta (negra) y los demás responden con una de las cartas de su mano (blanca). La repuesta que le resulte más graciosa o zarpada al HD, gana un punto para el que la jugó. Un juego de humor absurdo, negro, sutil, disparatado.', '3.jpg', '1', DEFAULT,0),
(DEFAULT, 'Catán', 'Pocos juegos reúnen tantas cualidades como Catan. Su mecánica innovadora, capaz de satisfacer hasta el paladar del jugador más exquisito en materia de juegos de mesa, lo ha hecho merecedor de los más importantes premios internacionales.', '4.jpg', '4', DEFAULT,0),
(DEFAULT, 'Clue', '¡El clásico juego de deducción y misterio! Resuelve el misterioso asesinato en la mansión haciendo preguntas y revelando pistas. Ahora con un nuevo look y nuevo personaje.', '5.jpg', '1', DEFAULT,0),
(DEFAULT, 'Twister', 'Es un juego que consiste en cuatro columnas con seis círculos del mismo color cada uno, rojo, verde, amarillo y azul y se puede jugar en parejas o equipos.', '6.jpg', '5', DEFAULT,0),
(DEFAULT, 'Dables', 'Es un juego de cartas que se basa en la velocidad, observación y reflejos, en el que los jugadores compiten por encontrar el símbolo que coincide entre las cartas. ¡SÉ VELOZ, OBSERVÁ MUY BIEN Y TEN REFLEJOS PARA ENCONTRARLO ANTES QUE TUS ADVERSARIOS PARA GANAR!', '7.jpg', '4', DEFAULT,0),
(DEFAULT, 'Virus', 'Una vez en plena guerra viral, hay que combatir la pandemia a base de ingenio, estrategia y mucha picardía. Todo vale para sobrevivir por encima de los demás: quien lo consiga habrá ganado al virus! Basta una partida en familia, o con los amigos, para encadenar batalla viral tras batalla viral, sin ninguna tregua', '8.jpg', '4', DEFAULT,0),
(DEFAULT, 'Jenga', 'Se trata de una estructura compuesta por varios bloques de madera, y el objetivo es ir quitando estos bloques sin que se desmonte la estructura.', '9.jpg', '2', DEFAULT,0),
(DEFAULT, 'Juego de Tronos', 'Es un juego de mesa muy completo con un poco de todo: rol, comercio, economía, estrategia, cartas, PvP y PvE… Lo recomiendo sobretodo para gente que quiera dar un salto de aficionado a algo más complejo y pro.', '10.jpg', '1', DEFAULT,0);

SELECT *FROM users;


INSERT INTO comments
VALUES (DEFAULT,'1','Muy buen producto!',DEFAULT,'1'),(DEFAULT,'2','Gran producto!',DEFAULT,'2'),(DEFAULT,'3','Recomendado',DEFAULT,'3'),(DEFAULT,'4','Muy buen producto!',DEFAULT,'4'),(DEFAULT,'5','No está bueno!',DEFAULT,'5'),(DEFAULT,'5','Buen producto!',DEFAULT,'6'),(DEFAULT,'1','No me gustó',DEFAULT,'7'),(DEFAULT,'2','Malisimo!',DEFAULT,'8'),(DEFAULT,'3','Muy buen producto!',DEFAULT,'9'),(DEFAULT,'4','Buenisimo',DEFAULT,'10'),(DEFAULT,'3','Muy buen producto!',DEFAULT,'1'),(DEFAULT,'2','Muy buen producto!',DEFAULT,'2'),(DEFAULT,'4','buen producto!',DEFAULT,'3'),(DEFAULT,'5','pésimo!',DEFAULT,'4'),(DEFAULT,'1','Muy buen producto!',DEFAULT,'5'),(DEFAULT,'5','terrible producto!',DEFAULT,'6'),(DEFAULT,'2','muy conforme',DEFAULT,'7'),(DEFAULT,'1','No me gustó para nada',DEFAULT,'8'),(DEFAULT,'4','Muy buen producto!',DEFAULT,'9'),(DEFAULT,'1','Recomendado para mayores de 5',DEFAULT,'10'),(DEFAULT,'2','buen producto',DEFAULT,'1'),(DEFAULT,'3','me gustó',DEFAULT,'2'),(DEFAULT,'4','tremendo!',DEFAULT,'3'),(DEFAULT,'1','malisimo',DEFAULT,'4'),(DEFAULT,'4','re bueno',DEFAULT,'5'),(DEFAULT,'2','recomendable para todos',DEFAULT,'6'),(DEFAULT,'5','a mi mamá no le gustó',DEFAULT,'7'),(DEFAULT,'1','buen regalo',DEFAULT,'8'),(DEFAULT,'5','Super divertido',DEFAULT,'9'),(DEFAULT,'3','buenisimo',DEFAULT,'10'),(DEFAULT,'1','Muy buen producto!',DEFAULT,'1'),(DEFAULT,'2','buen producto!',DEFAULT,'2'),(DEFAULT,'3','flojo producto!',DEFAULT,'3'),(DEFAULT,'4','muy malo',DEFAULT,'4'),(DEFAULT,'5','compraría de nuevo!',DEFAULT,'5'),(DEFAULT,'1','no volvería a comprar',DEFAULT,'6'),(DEFAULT,'2','se lo regale a mi hijo y no le gusto',DEFAULT,'7'),(DEFAULT,'3','me encantó!',DEFAULT,'8'),(DEFAULT,'4','re mil bueno',DEFAULT,'9'),(DEFAULT,'5','muy largas las instrucciones',DEFAULT,'10');


