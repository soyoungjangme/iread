package com.project.iread.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.iread.UserContext;
import com.project.iread.dto.*;
import com.project.iread.service.UserBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/userBookNote")
public class UserBookNoteController {

    @Autowired
    @Qualifier("userBookService")
    private UserBookService userBookService;

    // 북노트 목록
    @GetMapping("/getMyBookNote")
    public List<BookNoteDTO> getMyBookNote(){
        Long userNo = UserContext.userNo;
        return userBookService.getMyBookNote(userNo);
    }

    //북노트 목록_완독도서카운트
    @GetMapping("/endReadingCnt")
    public Integer endReadingCnt(){
        Long userNo = UserContext.userNo;
        return userBookService.endReadingCnt(userNo);
    }

    //북노트 삭제
    @DeleteMapping("/deleteBookNote/{no}")
    public ResponseEntity<String> deleteBookNote(@PathVariable("no") Integer bookNoteNo){
        boolean success = userBookService.deleteBookNote(bookNoteNo);
        if(success){
            return ResponseEntity.ok("삭제되었습니다.");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 북노트를 찾을 수 없습니다.");
        }
    }

    //북노트
    @GetMapping("/searchResult")
    public ResponseEntity<List<BookDTO>> searchResult(@RequestParam("keyword") String keyword){

        List<BookDTO> booklist = userBookService.getSearchResult(keyword);
        return ResponseEntity.ok(booklist);
    }

    @PostMapping("/readingStart")
    public Integer readingStart(@RequestBody BookNoteDTO dto){
        Long userNo = UserContext.userNo;
        dto.setUserNo(userNo);

        Integer createNo = userBookService.readingStart(dto);
        System.out.println("생성된 bookNoteNo: " + createNo);
        return createNo;
    }

    //chapter저장
    @PostMapping("/storeChapter")
    public ResponseEntity<String> storeChapter(@RequestBody Map<String, Object> data){
        ObjectMapper objectMapper = new ObjectMapper();
        List<ChapterDTO> chapters = objectMapper.convertValue(data.get("chapters"), new TypeReference<List<ChapterDTO>>() {});
        Integer bookNoteNo = (Integer) data.get("bookNoteNo");

        userBookService.storeChapters(chapters, bookNoteNo);
        return ResponseEntity.ok("북노트 기록이 정상적으로 저장되었습니다.");
    }

    //북노트 상세보기
    @GetMapping("/bookNoteDetail")
    public BookNoteDTO bookNoteDetail(@RequestParam("bookNoteNo") Integer bookNoteNo, @RequestParam("bookNo") Long bookNo){
        BookNoteDTO bookNoteDTO = userBookService.bookNoteDetail(bookNoteNo, bookNo);
        return bookNoteDTO;
    }

    //북노트 chapter 호출
    @GetMapping("/chapterData")
    public List<ChapterDTO> getChapterData(@RequestParam("bookNoteNo") Integer bookNoteNo){
        List<ChapterDTO> chapterDTOS = userBookService.getChapterData(bookNoteNo);
        return chapterDTOS;
    }

    //북노트 page저장
    @PostMapping("/storePage")
    public ResponseEntity<String> storePage(@RequestBody Map<String, Object> data){
        // ObjectMapper를 사용하여 pages를 List<PageDTO>로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        List<PageDTO> pages = objectMapper.convertValue(data.get("pages"), new TypeReference<List<PageDTO>>() {});
        Integer bookNoteNo = (Integer) data.get("bookNoteNo");

        userBookService.storePages(pages, bookNoteNo);
        return ResponseEntity.ok("북노트 기록이 정상적으로 저장되었습니다.");
    }

    //page 데이터 호출
    @GetMapping("/pageData")
    public List<PageDTO> getPageData(@RequestParam("bookNoteNo") Integer bookNoteNo){
        List<PageDTO> pageDTOS = userBookService.getPageData(bookNoteNo);
        return pageDTOS;
    }

    //리뷰등록
    @PostMapping("/storeReview")
    public ResponseEntity<String> storeReview(@RequestBody Map<String, Object> data){
        ObjectMapper objectMapper = new ObjectMapper();
        ReviewDTO reviewDTO = objectMapper.convertValue(data.get("review"), new TypeReference<ReviewDTO>() {});
        List<ReviewImgDTO> reviewImgDTOS = objectMapper.convertValue(data.get("images"), new TypeReference<List<ReviewImgDTO>>() {});

        Long userNo = UserContext.userNo;
        reviewDTO.setUserNo(userNo);

        userBookService.storeReview(reviewDTO, reviewImgDTOS);

        return ResponseEntity.ok("도서리뷰가 정상적으로 저장되었습니다.");
    }

    //리뷰호출_북노트
    @GetMapping("/getBookNoteReview")
    public ResponseEntity<Map<String, Object>> getBookNoteReview(@RequestParam("bookNoteNo") Integer bookNoteNo){
        Map<String, Object> bookNoteReview = userBookService.getBookNoteReview(bookNoteNo);
        return ResponseEntity.ok(bookNoteReview);
    }

    //독서종료
    @PostMapping("/readingEnd")
    public void readingEnd(@RequestBody BookNoteDTO dto){
        userBookService.endBookNote(dto);
    }

}
