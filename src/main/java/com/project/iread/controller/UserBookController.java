package com.project.iread.controller;

import com.project.iread.dto.BookDTO;
import com.project.iread.service.UserBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/userBook")
public class UserBookController {

    @Autowired
    @Qualifier("userBookService")
    private UserBookService userBookService;

    @GetMapping("/getAllBook")
    public List<BookDTO> getAllBook (){
        List<BookDTO> allBook = userBookService.getAllBook();
        return allBook;
    }
}
