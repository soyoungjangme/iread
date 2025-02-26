package com.project.iread.controller;

import com.project.iread.dto.BookDTO;
import com.project.iread.dto.ReviewDTO;
import com.project.iread.service.UserBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/userBook")
public class UserBookController {

    @Autowired
    @Qualifier("userBookService")
    private UserBookService userBookService;

    @GetMapping("/getAllBook")
    public List<BookDTO> getAllBook (@RequestParam("page") int page, @RequestParam("limit") int limit){
        System.out.println("page: "+page+" limit: "+limit);

        int offset = (page - 1) * limit;
        List<BookDTO> allBook = userBookService.getAllBook(offset, limit);
        return allBook;
    }

    //도서상세보기
    @GetMapping("/getABook")
    public BookDTO getBookInfo(@RequestParam("bookNo") Long bookNo){
        return userBookService.getBookInfo(bookNo);
    }

    //도서리뷰호출
    @GetMapping("/getReviews")
    public List<ReviewDTO> getReviews(@RequestParam("bookNo") Long bookNo){
        return userBookService.getReviews(bookNo);
    }
}
