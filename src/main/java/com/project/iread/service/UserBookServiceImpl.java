package com.project.iread.service;

import com.project.iread.dto.BookDTO;
import com.project.iread.dto.BookNoteDTO;
import com.project.iread.dto.ChapterDTO;
import com.project.iread.mapper.UserBookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userBookService")
public class UserBookServiceImpl implements UserBookService{

    @Autowired
    private UserBookMapper userBookMapper;

    @Override
    public List<BookNoteDTO> getMyBookNote() {
        return userBookMapper.getMyBookNote();
    }

    @Override
    public List<BookDTO> getSearchResult(String keyword) {
        return userBookMapper.getSearchResult(keyword);
    }

    @Override
    public Long readingStart(BookNoteDTO dto) {
        userBookMapper.createBookTable(dto);
        return dto.getBookNoteNo();
    }

    @Override
    public void insertChapter(ChapterDTO chapterDTO) {
        userBookMapper.insertChapter(chapterDTO);
    }

    @Override
    public void updateChapter(ChapterDTO chapterDTO) {
        userBookMapper.updateChapter(chapterDTO);
    }

    @Override
    public BookNoteDTO bookNoteDetail(Long bookNoteNo, Long bookNo) {
        return userBookMapper.bookNoteDetail(bookNoteNo, bookNo);
    }

    @Override
    public List<ChapterDTO> getChapterData(Long bookNoteNo) {
        return userBookMapper.getChapterData(bookNoteNo);
    }
}
