DELETE
FROM users
where 1 = 1;
DELETE
FROM comments
where 1 = 1;
DELETE
FROM emergencies
where 1 = 1;
DELETE
FROM rendezvous
where 1 = 1;


INSERT INTO users (phone, name, coordinator)
VALUES ("3035556543", "Stephanie Speck", "9705551234"),
       ("3035559876", "Ben Jabituya", "9705551234"),
       ("3035553219", "Newton Crosby", "9705551234"),
       ("3035552589", "Skroeder", "9705551234"),
       ("3035551478", "Frank", "9705551234"),
       ("3035553698", "Duke", "9705551234"),
       ("3035559632", "Johnny 5", "9705551234"),
       ("3035551111", "Number 1", "9705551234");
INSERT INTO users (phone, name, coordinator, isCoordinator)
VALUES ("9705551234", "Howard Marner", "9705551234", true);

INSERT INTO comments (phone, comment, createdDT)
VALUES ("3035559876", "I am standing here beside myself.", DATE_SUB(NOW(), INTERVAL 10 MINUTE)),
       ("3035559876", "We are wasting valueless time here.", DATE_SUB(NOW(), INTERVAL 7 MINUTE)),
       ("3035559876", "I don''t know about you, but I am planning to scream and run.",
        DATE_SUB(NOW(), INTERVAL 5 MINUTE));

INSERT INTO rendezvous (coordinator, lat, lng)
VALUES ("9705551234", 39.75066992424338, -104.99908286200353);

INSERT INTO emergencies (coordinator, startDt)
VALUES ("9705551234", DATE_SUB(NOW(), INTERVAL 12 MINUTE));
