package com.project.iread.service;

import com.project.iread.dto.BookDTO;

import java.util.List;

public interface UserBookService {

    List<BookDTO> getSearchResult(String keyword);

}
