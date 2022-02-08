DELETE FROM users where 1 = 1;
DELETE FROM comments where 1 = 1;
DELETE FROM emergencies where 1 = 1;
DELETE FROM rendezvous where 1 = 1;

INSERT INTO users (phone, name, coordinator, status, location)
VALUES ("3035556541", "Stephanie Speck", "3039979220", "UNKNOWN", '{"lat": 39.750652883856255,"lng": -104.99966381517176}'),
       ("3035559871", "Ben Jabituya", "3039979220", "UNKNOWN", '{"lat": 39.7504993864232,"lng": -104.99989575198671}'),
       ("3035553211", "Newton Crosby", "3039979220", "UNKNOWN", '{"lat": 39.750571945209856,"lng": -104.99954510156512}'),
       ("3035552581", "Skroeder", "3039979220", "SAFE", '{"lat": 39.75059691563914,"lng": -104.99955294111153}'),
       ("3035551471", "Frank", "3039979220", "SAFE", '{"lat": 39.75065645088443,"lng": -104.99919242712184}'),
       ("3035553691", "Duke", "3039979220", "SAFE", '{"lat": 39.750650511683425,"lng": -104.99917738962986}'),
       ("3035559631", "Johnny 5", "3039979220", "UNKNOWN", '{"lat": 39.750678143993724,"lng": -104.99917920096432}'),
       ("3035551111", "Number 1", "3039979220", "VACATION", '{"lat": 21.47264138532755,"lng": -158.03280293887002}');

INSERT INTO users (phone, name, coordinator, isCoordinator, status, location)
VALUES ("3039979220", 'Howard "Pete" Marner', "3039979220", true, "UNKNOWN", '{"lat": 39.75066992424338, "lng": -104.99908286200353}');

INSERT INTO comments (phone, comment, createdDT)
VALUES ("3035559871", "I am standing here beside myself.", DATE_SUB(NOW(), INTERVAL 10 MINUTE)),
       ("3035559871", "We are wasting valueless time here.", DATE_SUB(NOW(), INTERVAL 7 MINUTE)),
       ("3035559871", "I don''t know about you, but I am planning to scream and run.", DATE_SUB(NOW(), INTERVAL 5 MINUTE));

INSERT INTO rendezvous (coordinator, lat, lng)
VALUES ("3039979220", 39.75066992424338, -104.99908286200353);

INSERT INTO emergencies (coordinator, startDt)
VALUES ("3039979220", DATE_SUB(NOW(), INTERVAL 12 MINUTE));


-- David
INSERT INTO users (phone, name, coordinator, status, location)
VALUES ("3035556540", "Stephanie Speck", "3034664283", "UNKNOWN", '{"lat": 39.750652883856255,"lng": -104.99966381517176}'),
       ("3035559870", "Ben Jabituya", "3034664283", "UNKNOWN", '{"lat": 39.7504993864232,"lng": -104.99989575198671}'),
       ("3035553210", "Newton Crosby", "3034664283", "UNKNOWN", '{"lat": 39.750571945209856,"lng": -104.99954510156512}'),
       ("3035552580", "Skroeder", "3034664283", "SAFE", '{"lat": 39.75059691563914,"lng": -104.99955294111153}'),
       ("3035551470", "Frank", "3034664283", "SAFE", '{"lat": 39.75065645088443,"lng": -104.99919242712184}'),
       ("3035553690", "Duke", "3034664283", "SAFE", '{"lat": 39.750650511683425,"lng": -104.99917738962986}'),
       ("3035559630", "Johnny 5", "3034664283", "UNKNOWN", '{"lat": 39.750678143993724,"lng": -104.99917920096432}'),
       ("3035551110", "Number 1", "3034664283", "VACATION", '{"lat": 21.47264138532755,"lng": -158.03280293887002}');

INSERT INTO users (phone, name, coordinator, isCoordinator, status, location)
VALUES ("3034664283", 'Howard "David" Marner', "3034664283", true, "UNKNOWN", '{"lat": 39.75066992424338, "lng": -104.99908286200353}');

INSERT INTO comments (phone, comment, createdDT)
VALUES ("3035559870", "I am standing here beside myself.", DATE_SUB(NOW(), INTERVAL 10 MINUTE)),
       ("3035559870", "We are wasting valueless time here.", DATE_SUB(NOW(), INTERVAL 7 MINUTE)),
       ("3035559870", "I don''t know about you, but I am planning to scream and run.", DATE_SUB(NOW(), INTERVAL 5 MINUTE));

INSERT INTO rendezvous (coordinator, lat, lng)
VALUES ("3034664283", 39.75066992424338, -104.99908286200353);

INSERT INTO emergencies (coordinator, startDt)
VALUES ("3034664283", DATE_SUB(NOW(), INTERVAL 12 MINUTE));
