package com.project.iread.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Setter
@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReviewDTO {

    private Long reviewNo;
    private String reviewText;
    private String reviewShort;
    private String reviewRegDate;
    private Integer reviewLikeCnt;
    private Integer reviewComplaintCnt;
//    private String reviewOpenStatus;
    private Long bookNo;
    private Long userNo;
    private Integer bookNoteNo;

    private String title;
    private String userNick;

    private List<ReviewImgDTO> reviewImgDTOS;
}
