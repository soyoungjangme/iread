package com.project.iread.service;

import com.project.iread.dto.BookDTO;
import com.project.iread.dto.BookNoteDTO;
import com.project.iread.dto.ChapterDTO;
import com.project.iread.dto.GenreDTO;
import com.project.iread.mapper.UserBookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

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
    public void storeChapters(List<ChapterDTO> chapters) {
        // 1. 현재 DB에 저장된 챕터 목록 조회
        List<ChapterDTO> existingChapters = userBookMapper.checkChapter();

        // 2. 현재 DB에 저장된 챕터들의 perChapterNo 목록 저장
        Set<Long> existingPerChapterNos = existingChapters.stream()
                .map(ChapterDTO::getPerChapterNo)
                .collect(Collectors.toSet());

        // 3. 전달받은 챕터들의 perChapterNo 목록 저장
        Set<Long> receivedPerChapterNos = chapters.stream()
                .map(ChapterDTO::getPerChapterNo)
                .filter(Objects::nonNull) // null 값 제외
                .collect(Collectors.toSet());

        // 4. DB에는 있는데, 전달받은 목록에는 없는 챕터를 삭제
        for (Long perChapterNo : existingPerChapterNos) {
            if (!receivedPerChapterNos.contains(perChapterNo)) {
                userBookMapper.deleteChapter(perChapterNo); // 삭제 실행
            }
        }

        // 5. Insert & Update 처리
        for (ChapterDTO chapter : chapters) {
            if (chapter.getPerChapterNo() == null) {
                userBookMapper.insertChapter(chapter); // Insert 실행
            } else {
                userBookMapper.updateChapter(chapter); // Update 실행
            }
        }
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
