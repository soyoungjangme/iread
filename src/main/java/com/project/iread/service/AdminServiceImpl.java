package com.project.iread.service;

import com.project.iread.dto.BookDTO;
import com.project.iread.dto.GenreDTO;
import com.project.iread.dto.UserDTO;
import com.project.iread.mapper.AdminMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("adminService")
public class AdminServiceImpl implements AdminService{

    @Autowired
    private AdminMapper adminMapper;

    @Override
    public List<String> getIsbn() {
        return adminMapper.getIsbn();
    }

    @Override
    public void registBook(BookDTO bookDTO) {
        adminMapper.registBook(bookDTO);
    }

    @Override
    public Long totalCount() {
        return adminMapper.totalCount();
    }

    @Override
    public Long searchTotalCount(String keyword) {
        return adminMapper.searchTotalCount(keyword);
    }

    @Override
    public List<BookDTO> getAllBook(int offset, int pageSize) {
        return adminMapper.getAllBook(offset,pageSize);
    }

    @Override
    public List<BookDTO> getSearchBook(String keyword, int offset, int pageSize) {
        return adminMapper.getSearchBook(keyword, offset, pageSize);
    }

    @Override
    @Transactional
    public void registGenre(List<GenreDTO> newGenre) {
        // 기존에 등록된 장르 가져오기
        List<GenreDTO> existingGenres = adminMapper.getGenre();

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
            adminMapper.registGenre(genresToAdd);
        }

//        // 기존 장르 삭제
//        if (!genresToDelete.isEmpty()) {
//            adminMapper.deleteGenre(genresToDelete);
//        }
        // 기존 장르 삭제
        if (!genresToDelete.isEmpty()) {
            for (GenreDTO genre : genresToDelete) {
                // 해당 장르에 등록된 도서가 있는지 확인
                int bookCount = adminMapper.countBooksByGenreName(genre.getGenreName());
                if (bookCount > 0) {
                    throw new RuntimeException("해당 장르에 등록된 도서가 존재합니다. 삭제할 수 없습니다.");
                }
            }
            adminMapper.deleteGenre(genresToDelete);
        }
    }

    @Override
    public List<GenreDTO> getGenre() {
        return adminMapper.getGenre();
    }

    @Override
    public boolean deleteBook(Long bookNo) {
        return adminMapper.deleteBook(bookNo);
    }

    @Override
    public List<UserDTO> getUserInfo(String userActivatedYN, String keyword) {
        return adminMapper.getUserInfo(userActivatedYN, keyword);
    }

    @Override
    public void changeUserState(Long userNo, String userActivatedYN) {
        adminMapper.changeUserState(userNo, userActivatedYN);
    }
}
