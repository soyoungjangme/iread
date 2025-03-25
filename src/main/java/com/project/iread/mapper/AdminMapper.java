package com.project.iread.mapper;

import com.project.iread.dto.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface AdminMapper {

    List<String> getIsbn();
    void registBook(BookDTO bookDTO);
    Long totalCount();
    Long searchTotalCount(String keyword);
    List<BookDTO> getAllBook(@Param("offset") int offset, @Param("pageSize") int pageSize);
    List<BookDTO> getSearchBook(@Param("keyword") String keyword, @Param("offset") int offset, @Param("pageSize") int pageSize);
    void registGenre(List<GenreDTO> newGenre);
    void deleteGenre(List<GenreDTO> newGenre);
    List<GenreDTO> getGenre();
    boolean deleteBook(Long bookNo);
    int countBooksByGenreName(String genreName);
    //회원관리
    List<UserDTO> getUserInfo(@Param("userActivatedYN") String userActivatedYN, @Param("keyword") String keyword); //필터링 조회
    void changeUserState(@Param("userNo") Long userNo, @Param("userActivatedYN") String userActivatedYN);
    //신고관리
    List<ReviewDTO> getComplaintReview(@Param("reviewOpenYN") String reviewOpenYN, @Param("keyword") String keyword);
    void changeReviewStatus(@Param("reviewNo") Long reviewNo, @Param("reviewOpenYN") String reviewOpenYN);
}
