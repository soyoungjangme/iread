package com.project.iread.mapper;

import com.project.iread.dto.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserBookMapper {

    List<BookNoteDTO> getMyBookNote();

    List<BookDTO> getSearchResult(String keyword);
    void createBookTable(BookNoteDTO dto);
    BookNoteDTO bookNoteDetail(@Param("bookNoteNo") Integer bookNoteNo, @Param("bookNo") Long bookNo);

    void insertChapter(ChapterDTO chapterDTO);
    void updateChapter(ChapterDTO chapterDTO);
    void deleteChapter(Long perChapterNo);
    List<ChapterDTO> getChapterData(Integer bookNoteNo);

    List<PageDTO> getPageData(Integer bookNoteNo);
    void insertPage(PageDTO pageDTO);
    void updatePage(PageDTO pageDTO);
    void deletePage(Long perPageNo);

    void insertReview(ReviewDTO reviewDTO);
    void insertReviewImg(@Param("reviewImgs") List<ReviewImgDTO> reviewImgDTOS, @Param("reviewNo") Long reviewNo);
    ReviewDTO getReviewData(Integer bookNoteNo);
    List<ReviewImgDTO> getReviewImgData(Long reviewNo);
    void updateReview(ReviewDTO reviewDTO);
    void deleteReviewImg(Long reviewImgNo);

    void endBookNote(BookNoteDTO bookNoteDTO);
}
