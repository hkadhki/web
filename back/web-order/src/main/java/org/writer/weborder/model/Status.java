package org.writer.weborder.model;

public enum Status {
    NEW("новый"),
    CONFIRMED("подтверждён"),
    PROCESSING("в обработке"),
    PENDING_PAYMENT("ожидает оплаты"),
    PAID("оплачен"),
    COMPLETED("завершён"),
    CANCELLED("отменён");

    private final String russianName;

    Status(String russianName) {
        this.russianName = russianName;
    }

    @Override
    public String toString() {
        return russianName;
    }
}
