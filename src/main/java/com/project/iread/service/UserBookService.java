package com.project.iread.service;

import com.project.iread.dto.*;

import java.util.List;
import java.util.Map;

public interface UserBookService {

    List<BookNoteDTO> getMyBookNote();

    List<BookDTO> getSearchResult(String keyword);
    Integer readingStart(BookNoteDTO dto);

    void storeChapters(List<ChapterDTO> chapterDTOS, Integer bookNoteNo);
    BookNoteDTO bookNoteDetail(Integer bookNoteNo, Long bookNo);
    List<ChapterDTO> getChapterData(Integer bookNoteNo);

    List<PageDTO> getPageData(Integer bookNoteNo);
    void storePages(List<PageDTO> pageDTOS, Integer bookNoteNo);

    void storeReview(ReviewDTO reviewDTO, List<ReviewImgDTO> reviewImgDTOS);
    Map<String, Object> getBookNoteReview(Integer bookNoteNo);

    void endBookNote(BookNoteDTO bookNoteDTO);
}
