package com.project.iread.service;

import com.project.iread.dto.BookDTO;
import com.project.iread.dto.GenreDTO;

import java.util.List;

public interface AdminBookService {

    List<String> getIsbn();
    void registBook(BookDTO bookDTO); //api 도서등록
    Long totalCount();
    List<BookDTO> getAllBook(int offset, int pageSize);
    List<BookDTO> getSearchBook(String keyword);
    void registGenre(List<GenreDTO> newGenre);
    List<GenreDTO> getGenre();
    boolean deleteBook(Long bookNo);

}
