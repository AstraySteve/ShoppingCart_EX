create table inventory(
    id int primary key auto_increment,
    product_name varchar(50) not null,
    description varchar(255),
    quantity int default 0,
    price float not null,
    cost float not null
);

insert into inventory (product_name, description, price, cost) values 
("Sombrero", "A hat", 1.00, 0.50), 
("Santa Claus Hat", "A cooler hat", 3000.00, 0.00),
("Beret", "A french hat", 10.00, 2.00),
("Baseball cap", "A basic hat", 5.00, 1.00),
("Fedora", "A ganster hat", 3.00, 1.50),
("TopHat", "A posh hat", 60.00, 10.00);