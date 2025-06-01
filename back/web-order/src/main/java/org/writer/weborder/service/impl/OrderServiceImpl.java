package org.writer.weborder.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.writer.weborder.dto.*;
import org.writer.weborder.model.OrderEntity;
import org.writer.weborder.model.Status;
import org.writer.weborder.repository.ItemRepository;
import org.writer.weborder.repository.OrderRepository;
import org.writer.weborder.service.OrderService;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final ItemRepository itemRepository;
    private final OrderRepository orderRepository;
    HttpClient client = HttpClient.newHttpClient();

    @Value("${url.product}")
    private String url;

    public OrderServiceImpl(ItemRepository itemRepository, OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
        this.itemRepository = itemRepository;
    }

    @Transactional
    @Override
    public void createOrder(OrdersDtoCreate order) {
        Date date = Date.valueOf(LocalDate.now());
        OrderEntity entity = orderRepository.save(new OrderEntity(null, order.getTotalAmount(), order.getEmail(), Status.NEW.toString(), date,date ));
        for (ItemDto itemDto : order.getItems()) {
            itemRepository.insertItem(itemDto.getPriceAtPurchase(), itemDto.getQuantity(), itemDto.getProductId(), entity.getId());
        }
    }

    @Override
    public List<OrdersDtoShow> findByEmail(String email, Integer limit, Integer offset) throws IOException, InterruptedException {
        List<OrdersDtoShow> ordersDtoShow = orderRepository.findDtoByEmail(email, PageRequest.of(offset, limit)).getContent();
        for(OrdersDtoShow orderDtoShow : ordersDtoShow){
            orderDtoShow.setItems(findDtoByOrder(orderDtoShow.getId()));
        }
        return ordersDtoShow;
    }

    @Override
    public OrdersDtoShow findById(Long id) throws IOException, InterruptedException {
        OrdersDtoShow ordersDtoShow = orderRepository.findDtoById(id);
        ordersDtoShow.setItems(findDtoByOrder(id));
        return ordersDtoShow;
    }

    @Transactional
    @Override
    public void updateStatusOrder(Status status, Long id) {
        OrderEntity order = orderRepository.findById(id).orElseThrow();
        order.setStatus(status.toString());
        orderRepository.saveAndFlush(order);
    }

    private List<ItemDtoShow> findDtoByOrder(Long id) throws IOException, InterruptedException {
        List<ItemDtoShow> itemDtos = itemRepository.findDtoByOrder(id);
        for(ItemDtoShow itemDto : itemDtos){
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("http://" + url + "/api/products/" + itemDto.getProductId()))
                    .header("Accept", "application/json")
                    .GET()
                    .build();
            HttpResponse<String> response = client.send(
                    request,
                    HttpResponse.BodyHandlers.ofString()
            );
            if (response.statusCode() == 200) {
                ObjectMapper mapper = new ObjectMapper();
                ProductDto product = mapper.readValue(response.body(), ProductDto.class);
                itemDto.setProductDto(product);
            }
        }
        return itemDtos;
    }
}
