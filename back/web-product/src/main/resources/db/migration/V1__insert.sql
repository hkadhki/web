
CREATE TABLE brands (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(255) NOT NULL UNIQUE,
                        country VARCHAR(255)
);

CREATE INDEX idx_brand_name ON brands(name);


CREATE TABLE categories (
                            id SERIAL PRIMARY KEY,
                            name VARCHAR(255) NOT NULL UNIQUE,
                            description TEXT
);

CREATE INDEX idx_category_name ON categories(name);


CREATE TABLE products (
                          id BIGSERIAL PRIMARY KEY,
                          title VARCHAR(255) NOT NULL UNIQUE,
                          description TEXT,
                          price DECIMAL(19,2) CHECK (price > 0),
                          stock_quantity INT CHECK (stock_quantity >= 0),
                          created_at DATE,
                          updated_at DATE,
                          category_id INT,
                          brand_id INT,
                          img varchar,
                          deleted boolean default false,
                          FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
                          FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE
);

CREATE TABLE popular (
                         id bigint PRIMARY KEY,
                         FOREIGN KEY (id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE INDEX idx_product_title ON products(title);


CREATE TABLE specs (
                       id BIGSERIAL PRIMARY KEY,
                       name VARCHAR(255),
                       value TEXT,
                       product_id BIGINT,
                       FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE INDEX idx_spec_product ON specs(product_id);



CREATE TABLE favorites (
                           id SERIAL PRIMARY KEY,
                           product_id BIGINT,
                           FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);


-- Заполняем бренды
INSERT INTO brands (name, country) VALUES
                                       ('Philips', 'Netherlands'),
                                       ('Osram', 'Germany'),
                                       ('IKEA', 'Sweden'),
                                       ('Camelion', 'China'),
                                       ('Gauss', 'Russia'),
                                       ('Xiaomi', 'China'),
                                       ('Navigator', 'Russia');

-- Заполняем категории
INSERT INTO categories (name, description) VALUES
                                               ('LED лампы', 'Энергосберегающие светодиодные лампы'),
                                               ('Галогенные', 'Галогенные лампы с ярким светом'),
                                               ('Лампы накаливания', 'Традиционные лампы с нитью накаливания'),
                                               ('Умные лампы', 'Управляемые через Wi-Fi/Bluetooth лампы'),
                                               ('Люминесцентные', 'Энергосберегающие лампы дневного света');

-- Заполняем продукты
INSERT INTO products (title, description, price, stock_quantity, created_at, updated_at, category_id, brand_id, img) VALUES
                                                                                                                   ('Philips LED A60 10W E27', 'Теплый белый свет 2700K, эквивалент 75Вт', 299.00, 150, '2023-01-15', '2023-06-20', 1, 1, 'https://lampabar.ru/image/cache/catalog/upload/iblock/95d/vokruglamp-potolochnyy-svetilnik-lightstar-rullo-214437-1000x1000.jpeg'),
                                                                                                                   ('Osram Halogen 42W G9', 'Галогенная лампа с цоколем G9', 189.00, 80, '2023-02-10', '2023-05-15', 2, 2, 'https://lampabar.ru/image/cache/catalog/upload/iblock/db2/vokruglamp-potolochnyy-svetilnik-lightstar-rullo-214436-1000x1000.jpeg'),
                                                                                                                   ('IKEA LEDARE E14 5W', 'Холодный белый свет 4000K, матовый колпак', 249.00, 200, '2023-03-05', NULL, 1, 3, 'https://tochka-sveta.ru/upload/resize_cache/iblock/bf5/390_390_1/bf5c63a3af0d661729e3817202e13aca.jpeg'),
                                                                                                                   ('Xiaomi Yeelight LED Smart', 'Умная лампа RGB, управление через приложение', 1299.00, 45, '2023-04-20', '2023-07-10', 4, 6, 'https://tochka-sveta.ru/upload/resize_cache/iblock/59f/390_390_1/59f018a5d83a914c1b6d890e16374745.jpeg'),
                                                                                                                   ('Camelion LED T8 18W', 'Люминесцентная лампа-трубка 120см', 399.00, 60, '2023-01-30', NULL, 5, 4,'https://tochka-sveta.ru/upload/resize_cache/iblock/60f/390_390_1/60f3beb97b5ab4780476ac8aed674fcf.jpeg' ),
                                                                                                                   ('Navigator 95W E27', 'Лампа накаливания, прозрачная колба', 89.00, 300, '2023-05-12', NULL, 3, 7, 'https://tochka-sveta.ru/upload/resize_cache/iblock/60f/390_390_1/60f3beb97b5ab4780476ac8aed674fcf.jpeg'),
                                                                                                                   ('Gauss LED Filament 8W E27', 'Светодиодная лампа с нитью накала, ретро дизайн', 459.00, 90, '2023-06-18', '2023-08-05', 1, 5, 'https://tochka-sveta.ru/upload/resize_cache/iblock/350/390_390_1/3509b1340499f6615aecb92c891c7bb2.jpeg'),
                                                                                                                   ('Philips Hue White E27', 'Умная лампа с регулировкой яркости', 1999.00, 30, '2023-07-01', NULL, 4, 1, 'https://tochka-sveta.ru/upload/resize_cache/iblock/8ed/390_390_1/8edf33015446669fac915f43f39f48ca.jpeg');



INSERT INTO popular (id) VALUES (1),(2),(3),(4),(5);


-- Заполняем спецификации
INSERT INTO specs (name, value, product_id) VALUES
                                                ('Мощность', '10W', 1),
                                                ('Цветовая температура', '2700K', 1),
                                                ('Срок службы', '15000 часов', 1),
                                                ('Цоколь', 'G9', 2),
                                                ('Напряжение', '220-240V', 2),
                                                ('Яркость', '470 люмен', 3),
                                                ('Угол свечения', '180 градусов', 3),
                                                ('Подключение', 'Wi-Fi 2.4GHz', 4),
                                                ('Цвета', '16 миллионов', 4),
                                                ('Длина', '120 см', 5),
                                                ('Световой поток', '1300 лм', 5),
                                                ('Мощность', '95W', 6),
                                                ('Тип колбы', 'A60', 6),
                                                ('Стиль', 'Ретро', 7),
                                                ('Материал', 'Стекло', 7),
                                                ('Протокол', 'Zigbee 3.0', 8),
                                                ('Совместимость', 'Apple HomeKit, Google Assistant', 8);

INSERT INTO favorites (product_id) values
                                      (1),
                                      (2),
                                      (3),
                                      (4),
                                      (5),
                                      (6)