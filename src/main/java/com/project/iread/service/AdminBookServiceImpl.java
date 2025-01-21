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
    public List<BookDTO> getAllBook() {
        return adminBookMapper.getAllBook();
    }

    @Override
    public List<BookDTO> getSearchBook(String keyword) {
        return adminBookMapper.getSearchBook(keyword);
    }

    @Override
    @Transactional
    public void registGenre(List<String> newGenre) {
        // 기존에 등록된 장르 가져오기
        List<String> existingGenres = adminBookMapper.getGenre();

        // 새 장르 중에서 기존에 없는 장르만 필터링
        List<String> genresToAdd = newGenre.stream()
                .filter(genre -> !existingGenres.contains(genre))
                .toList();

        // 기존에 있는 장르 중, 새 장르에 없는 것들만 필터링 (삭제할 장르)
        List<String> genresToDelete = existingGenres.stream()
                .filter(genre -> !newGenre.contains(genre))
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
    public List<String> getGenre() {
        return adminBookMapper.getGenre();
    }
}
