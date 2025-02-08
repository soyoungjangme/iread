package com.project.iread.controller;

import com.project.iread.dto.BookDTO;
import com.project.iread.dto.BookNoteDTO;
import com.project.iread.dto.ChapterDTO;
import com.project.iread.service.UserBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userBook")
public class UserBookController {

    @Autowired
    @Qualifier("userBookService")
    private UserBookService userBookService;

    @GetMapping("/searchResult")
    public ResponseEntity<List<BookDTO>> searchResult(@RequestParam("keyword") String keyword){

        List<BookDTO> booklist = userBookService.getSearchResult(keyword);
        return ResponseEntity.ok(booklist);
    }

    @PostMapping("/readingStart")
    public void readingStart(@RequestBody BookNoteDTO date){
        System.out.println("독서시작일: "+date.getStartDate());
    }

    @PostMapping("/storeChapter")
    public ResponseEntity<String> storeChapter(@RequestBody List<ChapterDTO> chapters){
        System.out.println("챕터별 내용: " + chapters.toString());

        return ResponseEntity.ok("챕터별 기록이 저장되었습니다.");
    }

}
