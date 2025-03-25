package com.project.iread.controller;

import com.project.iread.UserContext;
import com.project.iread.dto.BookDTO;
import com.project.iread.dto.RequestedBookDTO;
import com.project.iread.dto.ReviewDTO;
import com.project.iread.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/userBook")
public class UserBookController {

    @Autowired
    @Qualifier("userService")
    private UserService userService;

    @GetMapping("/getAllBook")
    public List<BookDTO> getAllBook (@RequestParam("page") int page, @RequestParam("limit") int limit){
        int offset = (page - 1) * limit;
        List<BookDTO> allBook = userService.getAllBook(offset, limit);
        return allBook;
    }

    //도서상세보기
    @GetMapping("/getABook")
    public BookDTO getBookInfo(@RequestParam("bookNo") Long bookNo){
        return userService.getBookInfo(bookNo);
    }

    //도서리뷰호출
    @GetMapping("/getReviews")
    public List<ReviewDTO> getReviews(@RequestParam("bookNo") Long bookNo){
        return userService.getReviews(bookNo);
    }

    //도서_관심클릭
    @PostMapping("/bookLike")
    public void clickBookLike(@RequestBody Map<String, Long> requestData) {
        Long bookNo = requestData.get("bookNo");
        Long userNo = UserContext.userNo;
        userService.clickBookLike(bookNo, userNo);
    }

    //관심도서목록호출
    @GetMapping("/getMyBookLikes")
    public List<Long> getMyBookLikes(){
        Long userNo = UserContext.userNo;
        return userService.getMyBookLikes(userNo);
    }

    //관심도서유무
    @GetMapping("/getThisBookLike")
    public ResponseEntity<Integer> checkThisBookLike(@RequestParam("bookNo") Long bookNo){
        try{
            Long userNo = UserContext.userNo;
            Integer bookLikeYn = userService.checkThisBookLike(bookNo, userNo);

            return ResponseEntity.ok(bookLikeYn);
        } catch (Exception e) {
            return ResponseEntity.ofNullable(-1);
        }
    }

    //나의 리뷰 호출
    @GetMapping("/getMyReviews")
    public Map<String, Object> getMyReviews(@RequestParam("page") int page, @RequestParam("pageSize") int pageSize){
        int offset = (page - 1) * pageSize;
        Long userNo = UserContext.userNo;

        List<ReviewDTO> myReviews = userService.getMyReviews(userNo, offset, pageSize);
        Long totalCnt = userService.getMyReviewCnt(userNo);

        Map<String, Object> response = new HashMap<>();
        response.put("myReviews", myReviews);
        response.put("totalCnt", totalCnt);

        return response;
    }

    //나의 리뷰 삭제
    @DeleteMapping("/delMyReview/{reviewNo}")
    public ResponseEntity<String> deleteBookNote(@PathVariable("reviewNo") Long reviewNo){
        boolean success = userService.delMyReview(reviewNo);
        if(success){
            return ResponseEntity.ok("리뷰가 삭제되었습니다.");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 리뷰를 찾을 수 없습니다.");
        }
    }

    //리뷰신고
    @PostMapping("/complaintReview")
    public ResponseEntity<String> reportHateReview(@RequestBody ReviewDTO dto){
        boolean success = userService.complaintReview(dto.getReviewNo());
        if(success){
            return ResponseEntity.ok("리뷰 신고가 접수되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("신고 요청에 실패하였습니다.");
        }
    }

    //도서신청
    @PostMapping("/registedNewBook")
    public void registedNewBook(@RequestBody RequestedBookDTO dto){
        dto.setUserNo(UserContext.userNo);
        userService.registedNewBook(dto);
    }
}
