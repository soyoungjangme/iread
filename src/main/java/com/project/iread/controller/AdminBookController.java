package com.project.iread.controller;

import com.project.iread.dto.BookDTO;
import com.project.iread.dto.GenreDTO;
import com.project.iread.service.AdminBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/adminBook")
public class AdminBookController {

    @Autowired
    @Qualifier("adminBookService")
    private AdminBookService adminBookService;

    // 네이버 도서 검색 api
    @GetMapping("/searchBook")
    public ResponseEntity<String> bookApi(@RequestParam("query") String query) {
        if (query == null || query.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("검색어를 입력하세요."); //400 반환
        }

        String clientId = "gq6geVvoGry2ivKjmIn5"; // 네이버 API Client ID
        String clientSecret = "GXXIzqFD96"; // 네이버 API Client Secret
        String apiURL = "https://openapi.naver.com/v1/search/book.json?query=" + query + "&display=100";

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", clientId);
        headers.set("X-Naver-Client-Secret", clientSecret);

        HttpEntity<String> requestEntity = new HttpEntity<>(headers); //HTTP 요청 보낼 내용(헤더)
        RestTemplate restTemplate = new RestTemplate(); //HTTP 응답 받기

        try {
            //네이버 api 호출
            ResponseEntity<String> response = restTemplate.exchange(
                    apiURL,
                    HttpMethod.GET,
                    requestEntity,
                    String.class
            );

            return ResponseEntity.ok(response.getBody()); // 결과 반환
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("네이버 API 호출 중 오류가 발생 " + e.getMessage());
        }
    }

    //도서등록하기_네이버api
    @PostMapping("/registBook")
    public ResponseEntity<String> registBook(@RequestBody List<BookDTO> bookList){
        if(bookList != null && !bookList.isEmpty()){
            try{
                for(BookDTO dto : bookList){
                    adminBookService.registBook(dto);
                }
                //모든 책이 등록 성공
                return ResponseEntity.ok("성공적으로 등록되었습니다.");
            } catch (Exception e){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("도서등록 중 오류 발생" + e.getMessage());
            }

        } else {
            return ResponseEntity.badRequest().body("도서 리스트 전달에 실패하였습니다."); //400 반환
        }
    }

    //도서등록_직접등록
    @PostMapping("/registWriteBook")
    public ResponseEntity<String> registWriteBook(@RequestBody BookDTO bookInfo){
        System.out.println("확인 " + bookInfo);
        try{
            adminBookService.registBook(bookInfo);
            return ResponseEntity.ok("성공적으로 등록되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("도서 리스트 전달에 실패하였습니다."); //400 반환
        }
    }

    //등록된 도서 isbn호출
    @GetMapping("/getIsbn")
    public List<String> getIsbn(){
        List<String> result = adminBookService.getIsbn();
        return result;
    }

    //도서목록 호출
    @GetMapping("/getAllBook")
    public ResponseEntity<List<BookDTO>> getAllBooks(){
        try{
            List<BookDTO> bookList = adminBookService.getAllBook();
            return ResponseEntity.ok(bookList);
        } catch (Exception e) {
            System.err.println("도서목록 호출 중 오류: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 500 오류 반환
        }
    }

    //도서목록_검색결과
    @GetMapping("/searchResult")
    public ResponseEntity<List<BookDTO>> getSearchResult(@RequestParam("keyword") String keyword){
        System.out.println("keyword " + keyword);

        try {
            List<BookDTO> searchResult = adminBookService.getSearchBook(keyword);
            System.out.println("검색결과 " + searchResult);
            return ResponseEntity.ok(searchResult);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 500 오류 반환
        }
    }

    //도서목록_삭제
    @DeleteMapping("/deleteBook")
    public ResponseEntity<String> deleteBook(@RequestParam("bookNo") Long bookNo){
        try{
            boolean success = adminBookService.deleteBook(bookNo);
            if(success){
                return ResponseEntity.ok("삭제되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당도서를 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("도서삭제 중 오류 발생" + e.getMessage());
        }
    }

    //장르등록
    @PostMapping("/registGenre")
    public ResponseEntity<String> registGenre(@RequestBody List<GenreDTO> newGenre){
        try{
            adminBookService.registGenre(newGenre);
            return ResponseEntity.ok("성공적으로 등록되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("장르등록 중 오류 발생" + e.getMessage());
        }
    }

    //기존장르 호출
    @GetMapping("/getGenre")
    public ResponseEntity<List<GenreDTO>> getGenre(){
        try{
            List<GenreDTO> genreList = adminBookService.getGenre();
            return ResponseEntity.ok(genreList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
