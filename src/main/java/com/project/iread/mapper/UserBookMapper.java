package com.project.iread.mapper;

import com.project.iread.dto.BookDTO;
import com.project.iread.dto.BookNoteDTO;
import com.project.iread.dto.ChapterDTO;
import com.project.iread.dto.PageDTO;
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
//    List<ChapterDTO> checkChapter(Integer bookNoteNo);
    List<ChapterDTO> getChapterData(Integer bookNoteNo);

    List<PageDTO> getPageData(Integer bookNoteNo);
    void insertPage(PageDTO pageDTO);
    void updatePage(PageDTO pageDTO);
    void deletePage(Long perPageNo);
}
