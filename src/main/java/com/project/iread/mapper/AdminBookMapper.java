package com.project.iread.mapper;

import com.project.iread.dto.BookDTO;
import com.project.iread.dto.GenreDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminBookMapper {

    List<String> getIsbn();
    void registBook(BookDTO bookDTO);
    List<BookDTO> getAllBook();
    List<BookDTO> getSearchBook(String keyword);
    void registGenre(List<String> newGenre);
    void deleteGenre(List<String> newGenre);
    List<String> getGenre();
}
