package org.writer.weborder.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.writer.weborder.dto.OrdersDtoCreate;
import org.writer.weborder.dto.OrdersDtoShow;
import org.writer.weborder.model.Status;

import java.io.IOException;
import java.util.List;

public interface OrderService {
    void createOrder(OrdersDtoCreate order);
    List<OrdersDtoShow> findByEmail(String email, Integer limit, Integer offset) throws IOException, InterruptedException;
    OrdersDtoShow findById(Long id) throws IOException, InterruptedException;
    void updateStatusOrder(Status status, Long id);
}
