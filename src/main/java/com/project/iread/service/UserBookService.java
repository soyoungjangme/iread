package com.project.iread.service;

import com.project.iread.dto.BookDTO;
import com.project.iread.dto.BookNoteDTO;
import com.project.iread.dto.ChapterDTO;

import java.util.List;

public interface UserBookService {

    List<BookNoteDTO> getMyBookNote();
    List<BookDTO> getSearchResult(String keyword);
    Long readingStart(BookNoteDTO dto);
    void storeChapters(List<ChapterDTO> chapterDTOS);
//    void insertChapter(ChapterDTO chapterDTO);
//    void updateChapter(ChapterDTO chapterDTO);
    BookNoteDTO bookNoteDetail(Long bookNoteNo, Long bookNo);
    List<ChapterDTO> getChapterData(Long bookNoteNo);
}
