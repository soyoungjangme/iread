package com.project.iread.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Setter
@Getter
public class ChapterDTO {

    private Long perChapterNo;
    private String chapterNo;
    private String chapterTitle;
    private String chapterContent;
    private Integer bookNoteNo;
}
