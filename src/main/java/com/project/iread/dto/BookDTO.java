package com.project.iread.dto;

import lombok.*;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class BookDTO {

    private Long bookNo; //자동생성
    private String isbn;
    private String title;
    private String link;
    private String image;
    private String author;
    private String discount;
    private String publisher;
    private String pubdate;
    private String description;
    private Long bookLike; //default 0
    private String bookActivated; //default 'Y'
    private Long genreNo;
}
