package com.project.iread.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserDTO {

    private Long userNo;
    private String userId;
    private String userPw;

    private String userName;
    private String userNick;
    private String userPhone;
    private String userBirth;
    private String userRegDate;
    private String userActivatedYN;

    private Integer bookNoteCnt;
    private Integer reviewCnt;

}
