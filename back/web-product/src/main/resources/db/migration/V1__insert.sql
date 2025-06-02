
CREATE TABLE products (
                          id BIGSERIAL PRIMARY KEY,
                          title VARCHAR(255) NOT NULL UNIQUE,
                          description TEXT,
                          price DECIMAL(19,2) CHECK (price > 0),
                          stock_quantity INT CHECK (stock_quantity >= 0),
                          created_at DATE,
                          updated_at DATE,
                          category varchar,
                          brand varchar,
                          img varchar,
                          deleted boolean default false
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

-- Заполняем продукты
INSERT INTO products (title, description, price, stock_quantity, created_at, updated_at, category, brand, img) VALUES
                        ('Philips LED A60 10W E27', 'Теплый белый свет 2700K, эквивалент 75Вт', 299.00, 150, '2023-01-15', '2023-06-20', 'LED лампы', 'Philips', 'https://lampabar.ru/image/cache/catalog/upload/iblock/95d/vokruglamp-potolochnyy-svetilnik-lightstar-rullo-214437-1000x1000.jpeg'),
                        ('Osram Halogen 42W G9', 'Галогенная лампа с цоколем G9', 189.00, 80, '2023-02-10', '2023-05-15', 'Галогенные', 'Osram', 'https://lampabar.ru/image/cache/catalog/upload/iblock/db2/vokruglamp-potolochnyy-svetilnik-lightstar-rullo-214436-1000x1000.jpeg'),
                        ('IKEA LEDARE E14 5W', 'Холодный белый свет 4000K, матовый колпак', 249.00, 200, '2023-03-05', NULL, 'LED лампы', 'IKEA', 'https://tochka-sveta.ru/upload/resize_cache/iblock/bf5/390_390_1/bf5c63a3af0d661729e3817202e13aca.jpeg'),
                        ('Xiaomi Yeelight LED Smart', 'Умная лампа RGB, управление через приложение', 1299.00, 45, '2023-04-20', '2023-07-10', 'Умные лампы', 'Xiaomi', 'https://tochka-sveta.ru/upload/resize_cache/iblock/59f/390_390_1/59f018a5d83a914c1b6d890e16374745.jpeg'),
                        ('Camelion LED T8 18W', 'Люминесцентная лампа-трубка 120см', 399.00, 60, '2023-01-30', NULL, 'Люминесцентные', 'Camelion','https://tochka-sveta.ru/upload/resize_cache/iblock/60f/390_390_1/60f3beb97b5ab4780476ac8aed674fcf.jpeg' ),
                        ('Navigator 95W E27', 'Лампа накаливания, прозрачная колба', 89.00, 300, '2023-05-12', NULL, 'Лампы накаливания', 'Navigator', 'https://tochka-sveta.ru/upload/resize_cache/iblock/60f/390_390_1/60f3beb97b5ab4780476ac8aed674fcf.jpeg'),
                        ('Gauss LED Filament 8W E27', 'Светодиодная лампа с нитью накала, ретро дизайн', 459.00, 90, '2023-06-18', '2023-08-05', 'LED лампы', 'Gauss', 'https://tochka-sveta.ru/upload/resize_cache/iblock/350/390_390_1/3509b1340499f6615aecb92c891c7bb2.jpeg'),
                        ('Philips Hue White E27', 'Умная лампа с регулировкой яркости', 1999.00, 30, '2023-07-01', NULL, 'Умные лампы', 'Philips', 'https://tochka-sveta.ru/upload/resize_cache/iblock/8ed/390_390_1/8edf33015446669fac915f43f39f48ca.jpeg');



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