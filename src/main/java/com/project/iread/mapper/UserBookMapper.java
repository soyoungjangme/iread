package com.project.iread.mapper;

import com.project.iread.dto.BookDTO;
import com.project.iread.dto.BookNoteDTO;
import com.project.iread.dto.ChapterDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserBookMapper {

    List<BookNoteDTO> getMyBookNote();
    List<BookDTO> getSearchResult(String keyword);
    void createBookTable(BookNoteDTO dto);
    void insertChapter(ChapterDTO chapterDTO);
    void updateChapter(ChapterDTO chapterDTO);
}
