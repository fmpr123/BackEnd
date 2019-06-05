drop database personsdb;
create database personsdb;
use personsdb;
create table Persons(id int auto_increment,Firstname varchar(100),Lastname varchar(100),Profession varchar(100),age int, primary key(id));
insert into Persons(id,Firstname,Lastname,Profession,age)values
(1,'Pedro','Abreu','Cozinheiro',25),
(2,'Sara','Fernandes','Professora',34),
(3,'João','Pinto','Camionista',53),
(4,'Alberto','Menezes','Taxista',19),
(5,'Miguel','Graça','Professor',20);