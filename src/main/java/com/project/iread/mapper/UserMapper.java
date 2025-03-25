package com.project.iread.mapper;

import com.project.iread.dto.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {
// userBookNote
    List<BookNoteDTO> getMyBookNote(Long userNo);
    Integer endReadingCnt(Long userNo);
    boolean deleteBookNote(Integer bookNoteNo);

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

// userBook
    List<BookDTO> getAllBook(@Param("offset") int offset, @Param("limit") int limit);
    BookDTO getBookInfo(Long bookNo);
    List<ReviewDTO> getReviews(Long bookNo);

    Integer checkBookLike(@Param("bookNo") Long bookNo, @Param("userNo") Long userNo);
    void bookLikeOn(@Param("bookNo") Long bookNo, @Param("userNo") Long userNo);
    void bookLikeOff(@Param("bookNo") Long bookNo, @Param("userNo") Long userNo);
    List<Long> getMyBookLikes(Long userNo);

    List<ReviewDTO> getMyReviews(@Param("userNo") Long userNo, @Param("offset") int offset, @Param("limit") int limit);
    boolean delMyReview(Long reviewNo);
    boolean complaintReview(Long reviewNo);
    Long getMyReviewCnt(Long userNo);

    void registedNewBook(RequestedBookDTO dto);
}
