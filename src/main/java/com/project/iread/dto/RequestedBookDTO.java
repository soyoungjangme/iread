package com.project.iread.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class RequestedBookDTO {

    private Long requestNo;
    private String requestBookName;
    private String requestBookAuthor;
    private String requestRegDate;
    private String requestCheckStatus;
    private Long userNo;

}
