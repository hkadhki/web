package org.writer.weborder.controller;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.writer.weborder.dto.OrdersDtoCreate;
import org.writer.weborder.dto.OrdersDtoShow;
import org.writer.weborder.model.Status;
import org.writer.weborder.service.OrderService;

import java.io.IOException;
import java.util.List;

@RequestMapping("/api/order")
@RestController
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public String createOrder(@RequestBody OrdersDtoCreate orderDto) {
        orderService.createOrder(orderDto);
        return "Order created";
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<OrdersDtoShow> findByEmail(@RequestParam String email,
                                                   @RequestParam(value = "offset", defaultValue = "0") @Min(0) Integer offset,
                                                   @RequestParam(value = "limit", defaultValue = "20") @Min(1) @Max(100) Integer limit) throws IOException, InterruptedException {

        return orderService.findByEmail(email,limit, offset);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    public OrdersDtoShow findById(@PathVariable Long id) throws IOException, InterruptedException {
        return orderService.findById(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public String updateStatusOrder(@PathVariable Long id, @RequestParam Status status) {
        orderService.updateStatusOrder(status, id);
        return "Status changed";
    }
}
