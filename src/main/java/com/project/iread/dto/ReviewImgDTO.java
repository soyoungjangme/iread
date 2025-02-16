package com.project.iread.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Setter
@Getter
public class ReviewImgDTO {

    private Long reviewImgNo;
    private String reviewImgURL;
    private Long reviewNo;
}
