package com.project.iread.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Setter
@Getter
public class PageDTO {

    private Long perPageNo;
    private Integer pageIndex;
    private String startPage;
    private String endPage;
    private String pageContent;
    private Integer bookNoteNo;
}
