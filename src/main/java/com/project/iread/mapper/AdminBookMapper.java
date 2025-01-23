package com.project.iread.mapper;

import com.project.iread.dto.BookDTO;
import com.project.iread.dto.GenreDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AdminBookMapper {

    List<String> getIsbn();
    void registBook(BookDTO bookDTO);
    Long totalCount();
    List<BookDTO> getAllBook(@Param("offset") int offset, @Param("pageSize") int pageSize);
    List<BookDTO> getSearchBook(String keyword);
    void registGenre(List<GenreDTO> newGenre);
    void deleteGenre(List<GenreDTO> newGenre);
    List<GenreDTO> getGenre();
    boolean deleteBook(Long bookNo);
}
