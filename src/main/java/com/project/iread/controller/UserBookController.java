package com.project.iread.controller;

import com.project.iread.UserContext;
import com.project.iread.dto.BookDTO;
import com.project.iread.dto.ReviewDTO;
import com.project.iread.service.UserBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/userBook")
public class UserBookController {

    @Autowired
    @Qualifier("userBookService")
    private UserBookService userBookService;

    @GetMapping("/getAllBook")
    public List<BookDTO> getAllBook (@RequestParam("page") int page, @RequestParam("limit") int limit){
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

    //도서_관심클릭
    @PostMapping("/bookLike")
    public void clickBookLike(@RequestBody Map<String, Long> requestData) {
        Long bookNo = requestData.get("bookNo");
        Long userNo = UserContext.userNo;
        userBookService.clickBookLike(bookNo, userNo);
    }

    //관심도서목록호출
    @GetMapping("/getMyBookLikes")
    public List<Long> getMyBookLikes(){
        Long userNo = UserContext.userNo;
        return userBookService.getMyBookLikes(userNo);
    }

    //관심도서유무
    @GetMapping("/getThisBookLike")
    public ResponseEntity<Integer> checkThisBookLike(@RequestParam("bookNo") Long bookNo){
        try{
            Long userNo = UserContext.userNo;
            Integer bookLikeYn = userBookService.checkThisBookLike(bookNo, userNo);

            return ResponseEntity.ok(bookLikeYn);
        } catch (Exception e) {
            return ResponseEntity.ofNullable(-1);
        }
    }
}
