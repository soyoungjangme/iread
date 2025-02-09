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

    // 북노트 목록
    @GetMapping("/getMyBookNote")
    public List<BookNoteDTO> getMyBookNote(){ //유저정보 변수로 전달예정
        return userBookService.getMyBookNote();
    }

    //북노트
    @GetMapping("/searchResult")
    public ResponseEntity<List<BookDTO>> searchResult(@RequestParam("keyword") String keyword){

        List<BookDTO> booklist = userBookService.getSearchResult(keyword);
        return ResponseEntity.ok(booklist);
    }

    @PostMapping("/readingStart")
    public Long readingStart(@RequestBody BookNoteDTO dto){
        Long createNo = userBookService.readingStart(dto);
        System.out.println("생성된 bookNoteNo: " + createNo);
        return createNo;
    }

    @PostMapping("/storeChapter")
    public ResponseEntity<String> storeChapter(@RequestBody List<ChapterDTO> chapters){
        System.out.println("챕터별 내용: " + chapters.toString());

        for(ChapterDTO chapter : chapters){
            if(chapter.getPerChapterNo() == null){
                //insert
                userBookService.insertChapter(chapter);
            }else{
                //update
                System.out.println("update");
            }
        }

        return ResponseEntity.ok("챕터별 기록이 저장되었습니다.");
    }

}
