package org.writer.webadmin.exception;

public class UnauthorizedErrorException extends IllegalArgumentException {
    public UnauthorizedErrorException(String msg) {
        super(msg);
    }
}
