package com.project.iread.mapper;

import com.project.iread.dto.BookDTO;
import com.project.iread.dto.GenreDTO;
import com.project.iread.dto.UserDTO;
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

    List<UserDTO> getUserInfo(@Param("userActivatedYN") String userActivatedYN, @Param("keyword") String keyword); //필터링 조회
    void changeUserState(@Param("userNo") Long userNo, @Param("userActivatedYN") String userActivatedYN);

}
