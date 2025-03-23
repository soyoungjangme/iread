package com.project.iread.controller;

import com.project.iread.dto.GenreDTO;
import com.project.iread.dto.ReviewDTO;
import com.project.iread.dto.UserDTO;
import com.project.iread.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adminManage")
public class AdminManageController {

    @Autowired
    @Qualifier("adminService")
    private AdminService adminService;

    /*장르관리*/
    //기존장르 호출
    @GetMapping("/getGenre")
    public ResponseEntity<List<GenreDTO>> getGenre(){
        List<GenreDTO> genreList = adminService.getGenre();
        return ResponseEntity.ok(genreList);
    }

    //장르등록
    @PostMapping("/registGenre")
    public ResponseEntity<String> registGenre(@RequestBody List<GenreDTO> newGenre){
        try{
            adminService.registGenre(newGenre);
            return ResponseEntity.ok("성공적으로 등록되었습니다.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());  // "해당 장르에 등록된 도서가 존재합니다." 메시지가 여기에 들어갑니다.
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("장르등록 중 오류 발생: " + e.getMessage());
        }
    }

    /*회원관리*/
    //유저정보 호출 및 필터링
    @GetMapping("/getUserInfo")
    public List<UserDTO> getUserInfo(@RequestParam(value="state", required = false) String userActivatedYN,
                                     @RequestParam(value = "keyword", required = false) String keyword){
        return adminService.getUserInfo(userActivatedYN, keyword);
    }

    //유저활동상태 변경
    @PatchMapping("/changeUserState")
    public void changeUserState(@RequestBody UserDTO dto){
        Long userNo = dto.getUserNo();
        String userActivatedYN = dto.getUserActivatedYN();

        adminService.changeUserState(userNo, userActivatedYN);
    }

    /*신고관리*/
    //신고리뷰 호출
    @GetMapping("/getComplaintReview")
    public List<ReviewDTO> getComplaintReview(@RequestParam(value="state", required = false) String reviewOpenYN,
                                            @RequestParam(value="keyword", required = false) String keyword){
        return adminService.getComplaintReview(reviewOpenYN, keyword);
    }

    //신고리뷰 상태변경
    @PatchMapping("/changeReviewStatus")
    public void changeReviewStatus(@RequestBody ReviewDTO dto){
        Long reviewNo = dto.getReviewNo();
        String reviewOpenYN = dto.getReviewOpenYN();

        adminService.changeReviewStatus(reviewNo, reviewOpenYN);
    }

}
