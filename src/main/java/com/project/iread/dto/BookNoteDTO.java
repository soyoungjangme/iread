package com.project.iread.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class BookNoteDTO {

    private String bookNoteNo;
    private String startDate;
    private String endDate;
    private Long bookNo;
    private Long userNo;
}
