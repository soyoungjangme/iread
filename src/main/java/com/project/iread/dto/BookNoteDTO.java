package com.project.iread.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class BookNoteDTO {

    private Integer bookNoteNo;
    private String startDate;
    private String endDate;
    private Long bookNo;
    private Long userNo;

    // books테이블의 property
    private String title;
    private String image;
}
