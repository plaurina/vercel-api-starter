create table users
(
    id            int primary key auto_increment,
    phone         VARCHAR(255),
    name          VARCHAR(255),
    coordinator   VARCHAR(12),
    iscoordinator BOOLEAN      default false,
    status        VARCHAR(255) default 'UNKNOWN',
    location      JSON         default null
);

create table comments
(
    id        int primary key auto_increment,
    phone     VARCHAR(255),
    createdDT DATETIME default now(),
    comment   VARCHAR(1024)
);

create table emergencies
(
    id          int primary key auto_increment,
    coordinator VARCHAR(255),
    startDt     datetime default now(),
    endDt       datetime,
    active      boolean  default true
);

create table rendezvous
(
    id          int primary key auto_increment,
    coordinator varchar(255),
    lat         DOUBLE,
    lng         DOUBLE
);

SELECT now()      as datetime,
       u.status,
       u.location,
       c.phone    as coordinator_phone,
       c.name     as coordinator_name,
       c.location as coordinator_location,
       r.lat as r_lat, r.lng as r_lng
FROM users u
         LEFT JOIN users c ON u.coordinator = c.phone
         LEFT JOIN rendezvous r on r.coordinator = c.phone
WHERE u.phone = '3035559876'