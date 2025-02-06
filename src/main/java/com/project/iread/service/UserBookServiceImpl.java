package com.project.iread.service;

import com.project.iread.dto.BookDTO;
import com.project.iread.mapper.UserBookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userBookService")
public class UserBookServiceImpl implements UserBookService{

    @Autowired
    private UserBookMapper userBookMapper;

    @Override
    public List<BookDTO> getSearchResult(String keyword) {
        return userBookMapper.getSearchResult(keyword);
    }
}
