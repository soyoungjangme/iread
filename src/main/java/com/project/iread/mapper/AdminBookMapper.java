package com.project.iread.mapper;

import com.project.iread.dto.BookDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminBookMapper {

    List<String> getIsbn();
    void registBook(BookDTO bookDTO);
}
