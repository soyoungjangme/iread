package com.project.iread.service;

import com.project.iread.dto.*;
import com.project.iread.mapper.UserBookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service("userBookService")
public class UserBookServiceImpl implements UserBookService{

    @Autowired
    private UserBookMapper userBookMapper;

// userBookNote
    @Override
    public List<BookNoteDTO> getMyBookNote(Long userNo) {
        return userBookMapper.getMyBookNote(userNo);
    }

    @Override
    public Integer endReadingCnt(Long userNo) {
        return userBookMapper.endReadingCnt(userNo);
    }

    @Override
    public boolean deleteBookNote(Integer bookNoteNo) {
        return userBookMapper.deleteBookNote(bookNoteNo);
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

    @Override
    public void storeReview(ReviewDTO reviewDTO, List<ReviewImgDTO> reviewImgDTOS) {
        if(reviewDTO.getReviewNo() == null){ //review 첫등록
            userBookMapper.insertReview(reviewDTO); //review 내용 저장
            Long getNo = reviewDTO.getReviewNo();

            if(!reviewImgDTOS.isEmpty()){ //review 이미지 저장
                userBookMapper.insertReviewImg(reviewImgDTOS, getNo);
            }
        }else{
            Long getNo = reviewDTO.getReviewNo();

            //리뷰내용 update
            userBookMapper.updateReview(reviewDTO);

            //img select > delete > insert
            List<ReviewImgDTO> existingImgs = userBookMapper.getReviewImgData(getNo);

            //기존 리뷰이미지 key값 저장
            Set<Long> existingReviewImgNos = existingImgs.stream()
                    .map(ReviewImgDTO::getReviewImgNo)
                    .collect(Collectors.toSet());

            Set<Long> receivedReviewImgNos = reviewImgDTOS.stream()
                    .map(ReviewImgDTO::getReviewImgNo)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toSet());

            //이미지 삭제
            for(Long existingReviewImgNo : existingReviewImgNos){
                if(!receivedReviewImgNos.contains(existingReviewImgNo)){
                    //delete
                    userBookMapper.deleteReviewImg(existingReviewImgNo);
                }
            }

            //새로 등록할 이미지
            List<ReviewImgDTO> newImgs = reviewImgDTOS.stream()
                    .filter(img -> img.getReviewImgNo() == null)
                    .collect(Collectors.toList());

            if(!newImgs.isEmpty()){
                userBookMapper.insertReviewImg(newImgs, getNo);
            }
        }
    }

    @Override
    public Map<String, Object> getBookNoteReview(Integer bookNoteNo) {
        //review 내용 호출
        ReviewDTO reviewData = userBookMapper.getReviewData(bookNoteNo);
        if(reviewData != null){
            Long getReviewNo = reviewData.getReviewNo();

            //review 이미지 호출
            List<ReviewImgDTO> reviewImgData = userBookMapper.getReviewImgData(getReviewNo);

            Map<String, Object> response = new HashMap<>();
            response.put("reviewData", reviewData);
            response.put("reviewImgData", reviewImgData);

            return response;
        }else{
            return null;
        }
    }

    @Override
    public void endBookNote(BookNoteDTO bookNoteDTO) {
        userBookMapper.endBookNote(bookNoteDTO);
    }

    @Override
    public List<BookDTO> getAllBook() {
        return userBookMapper.getAllBook();
    }

// userBook


}
