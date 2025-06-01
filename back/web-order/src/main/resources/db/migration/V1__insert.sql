


CREATE TABLE orders (
                        id BIGSERIAL PRIMARY KEY,
                        total_amount DECIMAL(19,2) CHECK (total_amount > 0),
                        email VARCHAR(255) NOT NULL,
                        status VARCHAR(50),
                        created_at DATE,
                        updated_at DATE
);

CREATE INDEX idx_order_email ON orders(email);


CREATE TABLE items (
                       id SERIAL PRIMARY KEY,
                       quantity INT CHECK (quantity >= 0),
                       price_at_purchase DECIMAL(19,2) CHECK (price_at_purchase > 0),
                       product_id BIGINT,
                       order_id BIGINT,
                       FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE INDEX idx_item_order ON items(order_id);
CREATE INDEX idx_item_product ON items(product_id);







-- Заполняем заказы
INSERT INTO orders (total_amount, email, status, created_at, updated_at) VALUES
                                                                             (1298.00, 'client1@example.com', 'новый', '2023-08-01', '2023-08-03'),
                                                                             (1897.00, 'client2@example.com', 'новый', '2023-08-05', '2023-08-05'),
                                                                             (459.00, 'client3@example.com', 'новый', '2023-08-10', '2023-08-12'),
                                                                             (299.00, 'client1@example.com', 'новый', '2023-08-15', '2023-08-16');

-- Заполняем элементы заказов
INSERT INTO items (quantity, price_at_purchase, product_id, order_id) VALUES
                                                                          (1, 1299.00, 4, 1),
                                                                          (2, 299.00, 1, 2),
                                                                          (1, 189.00, 2, 2),
                                                                          (1, 459.00, 7, 3),
                                                                          (1, 299.00, 1, 4);

