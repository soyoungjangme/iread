package com.project.iread.service;

import com.project.iread.dto.BookDTO;

import java.util.List;

public interface AdminBookService {

    List<String> getIsbn();
    void registBook(BookDTO bookDTO); //api 도서등록

}
