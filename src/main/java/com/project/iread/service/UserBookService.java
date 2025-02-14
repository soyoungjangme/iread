package com.project.iread.service;

import com.project.iread.dto.BookDTO;
import com.project.iread.dto.BookNoteDTO;
import com.project.iread.dto.ChapterDTO;
import com.project.iread.dto.PageDTO;

import java.util.List;

public interface UserBookService {

    List<BookNoteDTO> getMyBookNote();

    List<BookDTO> getSearchResult(String keyword);
    Integer readingStart(BookNoteDTO dto);

    void storeChapters(List<ChapterDTO> chapterDTOS, Integer bookNoteNo);
    BookNoteDTO bookNoteDetail(Integer bookNoteNo, Long bookNo);
    List<ChapterDTO> getChapterData(Integer bookNoteNo);

    List<PageDTO> getPageData(Integer bookNoteNo);
    void storePages(List<PageDTO> pageDTOS, Integer bookNoteNo);
}
