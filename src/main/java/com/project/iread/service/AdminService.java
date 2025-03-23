package com.project.iread.service;

import com.project.iread.dto.BookDTO;
import com.project.iread.dto.GenreDTO;
import com.project.iread.dto.ReviewDTO;
import com.project.iread.dto.UserDTO;

import java.util.List;

public interface AdminService {

    List<String> getIsbn();
    void registBook(BookDTO bookDTO); //api 도서등록
    Long totalCount();
    Long searchTotalCount(String keyword);
    List<BookDTO> getAllBook(int offset, int pageSize);
    List<BookDTO> getSearchBook(String keyword, int offset, int pageSize);
    void registGenre(List<GenreDTO> newGenre);
    List<GenreDTO> getGenre();
    boolean deleteBook(Long bookNo);

    //회원관리
    List<UserDTO> getUserInfo(String userActivatedYN, String keyword);
    void changeUserState(Long userNo, String userActivatedYN);
    //신고관리
    List<ReviewDTO> getComplaintReview(String reviewOpenYN, String keyword);
    void changeReviewStatus(Long reviewNo, String reviewOpenYN);
}
