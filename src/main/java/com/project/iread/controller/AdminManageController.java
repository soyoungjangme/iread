package com.project.iread.controller;

import com.project.iread.dto.UserDTO;
import com.project.iread.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adminManage")
public class AdminManageController {

    @Autowired
    @Qualifier("adminService")
    private AdminService adminService;

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

}
