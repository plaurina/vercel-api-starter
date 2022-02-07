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
    endDt       datetime
);

create table rendezvous
(
    id          int primary key auto_increment,
    coordinator varchar(255),
    lat         DOUBLE,
    lng         DOUBLE
);
