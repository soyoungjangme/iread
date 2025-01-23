package com.project.iread.service;

import com.project.iread.dto.BookDTO;
import com.project.iread.dto.GenreDTO;

import java.util.List;

public interface AdminBookService {

    List<String> getIsbn();
    void registBook(BookDTO bookDTO); //api 도서등록
    Long totalCount();
    Long searchTotalCount(String keyword);
    List<BookDTO> getAllBook(int offset, int pageSize);
    List<BookDTO> getSearchBook(String keyword, int offset, int pageSize);
    void registGenre(List<GenreDTO> newGenre);
    List<GenreDTO> getGenre();
    boolean deleteBook(Long bookNo);

}
