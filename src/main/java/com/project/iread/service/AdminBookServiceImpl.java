package com.project.iread.service;

import com.project.iread.dto.BookDTO;
import com.project.iread.mapper.AdminBookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("adminBookService")
public class AdminBookServiceImpl implements AdminBookService{

    @Autowired
    private AdminBookMapper adminBookMapper;

    @Override
    public List<String> getIsbn() {
        return adminBookMapper.getIsbn();
    }

    @Override
    public void registBook(BookDTO bookDTO) {
        adminBookMapper.registBook(bookDTO);
    }
}
