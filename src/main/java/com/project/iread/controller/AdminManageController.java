package com.project.iread.controller;

import com.project.iread.dto.UserDTO;
import com.project.iread.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/adminManage")
public class AdminManageController {

    @Autowired
    @Qualifier("adminService")
    private AdminService adminService;

    @GetMapping("/getUserInfo")
    public List<UserDTO> getUsers(){
        return adminService.getUserInfo();
    }
}
