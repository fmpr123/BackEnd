drop database socialnetwork;
create database socialnetwork;
use socialnetwork;

create table user(user_id int not null auto_increment,
user_name varchar(50) not null,
user_email varchar(50) not null,
user_password varchar(20) not null,
user_photo varchar(50),
user_address varchar(50),
user_age int,
primary key(user_id));

create table game(game_id int not null auto_increment,
game_name varchar(50) not null,
primary key(game_id));

create table post(post_id int not null auto_increment,
post_content varchar(200) not null,
post_date datetime default current_timestamp on update current_timestamp,
post_like int,
user_id int,
user_photo varchar(50),
game_id int,
primary key(post_id),
foreign key(user_id)references user(user_id),
foreign key(game_id)references game(game_id));

create table comment(comment_id int not null auto_increment,
comment_content varchar(200) not null,
comment_date datetime default current_timestamp on update current_timestamp,
user_id int not null,
post_id int not null,
primary key(comment_id),
foreign key(user_id)references user(user_id),
foreign key(post_id)references post(post_id));