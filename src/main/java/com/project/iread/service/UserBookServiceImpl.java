package com.project.iread.service;

import com.project.iread.dto.*;
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
    public Integer readingStart(BookNoteDTO dto) {
        userBookMapper.createBookTable(dto);
        return dto.getBookNoteNo();
    }

    @Override
    public void storeChapters(List<ChapterDTO> chapters, Integer bookNoteNo) {
        // 1. 현재 DB에 저장된 챕터 목록 조회
        List<ChapterDTO> existingChapters = userBookMapper.getChapterData(bookNoteNo);

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
    public BookNoteDTO bookNoteDetail(Integer bookNoteNo, Long bookNo) {
        return userBookMapper.bookNoteDetail(bookNoteNo, bookNo);
    }

    @Override
    public List<ChapterDTO> getChapterData(Integer bookNoteNo) {
        return userBookMapper.getChapterData(bookNoteNo);
    }

    @Override
    public List<PageDTO> getPageData(Integer bookNoteNo) {
        return userBookMapper.getPageData(bookNoteNo);
    }

    @Override
    public void storePages(List<PageDTO> pageDTOS, Integer bookNoteNo) {
        //챕터 저장 방식과 동일 (insert & update & delete)

        List<PageDTO> existingPages = userBookMapper.getPageData(bookNoteNo);

        Set<Long> existingPerPageNos = existingPages.stream()
                .map(PageDTO::getPerPageNo)
                .collect(Collectors.toSet());

        Set<Long> receivedPerPageNos = pageDTOS.stream()
                .map(PageDTO::getPerPageNo)
                .filter(Objects::nonNull) // null 값 제외
                .collect(Collectors.toSet());

        for (Long perPageNo : existingPerPageNos) {
            if (!receivedPerPageNos.contains(perPageNo)) {
                userBookMapper.deletePage(perPageNo); // 삭제 실행
            }
        }

        for (PageDTO page : pageDTOS) {
            if (page.getPerPageNo() == null) {
                // Insert 실행
                userBookMapper.insertPage(page);
            } else {
                // Update 실행
                userBookMapper.updatePage(page);
            }
        }
    }
}
