package com.project.iread.service;

import com.project.iread.dto.BookDTO;
import com.project.iread.dto.GenreDTO;
import com.project.iread.mapper.AdminBookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("adminBookService")
public class AdminBookServiceImpl implements AdminBookService{

    @Autowired
    private AdminBookMapper adminBookMapper;

    @Override
    public List<String> getIsbn() {
        return adminBookMapper.getIsbn();
    }

    @Override
    public void registBook(BookDTO bookDTO) {
        adminBookMapper.registBook(bookDTO);
    }

    @Override
    public Long totalCount() {
        return adminBookMapper.totalCount();
    }

    @Override
    public List<BookDTO> getAllBook(int offset, int pageSize) {
        return adminBookMapper.getAllBook(offset,pageSize);
    }

    @Override
    public List<BookDTO> getSearchBook(String keyword) {
        return adminBookMapper.getSearchBook(keyword);
    }

    @Override
    @Transactional
    public void registGenre(List<GenreDTO> newGenre) {
        // 기존에 등록된 장르 가져오기
        List<GenreDTO> existingGenres = adminBookMapper.getGenre();


        // 새 장르 중에서 기존에 없는 장르만 필터링 (genreName 기준)
        List<GenreDTO> genresToAdd = newGenre.stream()
                .filter(newItem -> existingGenres.stream()
                        .noneMatch(existingItem -> existingItem.getGenreName().equals(newItem.getGenreName())))
                .toList();

        // 기존 장르 중, 새 장르에 없는 것들만 필터링 (genreName 기준, 삭제할 장르)
        List<GenreDTO> genresToDelete = existingGenres.stream()
                .filter(existingItem -> newGenre.stream()
                        .noneMatch(newItem -> newItem.getGenreName().equals(existingItem.getGenreName())))
                .toList();

        // 새로운 장르 등록
        if (!genresToAdd.isEmpty()) {
            adminBookMapper.registGenre(genresToAdd);
        }

        // 기존 장르 삭제
        if (!genresToDelete.isEmpty()) {
            adminBookMapper.deleteGenre(genresToDelete);
        }
    }

    @Override
    public List<GenreDTO> getGenre() {
        return adminBookMapper.getGenre();
    }

    @Override
    public boolean deleteBook(Long bookNo) {
        return adminBookMapper.deleteBook(bookNo);
    }
}
