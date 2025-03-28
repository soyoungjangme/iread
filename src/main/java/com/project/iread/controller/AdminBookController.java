package com.project.iread.controller;

import com.project.iread.dto.BookDTO;
import com.project.iread.dto.GenreDTO;
import com.project.iread.dto.RequestedBookDTO;
import com.project.iread.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/adminBook")
public class AdminBookController {

    @Autowired
    @Qualifier("adminService")
    private AdminService adminService;

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
                    adminService.registBook(dto);
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
        try{
            adminService.registBook(bookInfo);
            return ResponseEntity.ok("성공적으로 등록되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("도서 리스트 전달에 실패하였습니다."); //400 반환
        }
    }

    //등록된 도서 isbn호출
    @GetMapping("/getIsbn")
    public List<String> getIsbn(){
        List<String> result = adminService.getIsbn();
        return result;
    }

    //도서목록_전체
    @GetMapping("/getAllBook")
    public Map<String, Object> getAllBooks(@RequestParam("page") int page,
                                           @RequestParam("pageSize") int pageSize){
        int offset = (page -1) * pageSize;
        List<BookDTO> bookList = adminService.getAllBook(offset, pageSize);
        Long totalCount = adminService.totalCount();

        Map<String, Object> response = new HashMap<>();
        response.put("books", bookList);
        response.put("totalCount", totalCount);

        return response;
    }

    //도서목록_검색결과
    @GetMapping("/searchResult")
    public Map<String, Object> getSearchResult(@RequestParam("keyword") String keyword,
                                                 @RequestParam("page") int page,
                                                 @RequestParam("pageSize") int pageSize){
        int offset = (page-1) * pageSize;
        List<BookDTO> searchResult = adminService.getSearchBook(keyword, offset, pageSize);
        Long totalCount = adminService.searchTotalCount(keyword);
        System.out.println("totalCount2 " + totalCount);

        Map<String, Object> response = new HashMap<>();
        response.put("books", searchResult);
        response.put("totalCount", totalCount);

        return response;
    }

    //도서목록_삭제
    @DeleteMapping("/deleteBook")
    public ResponseEntity<String> deleteBook(@RequestParam("bookNo") Long bookNo){
        boolean success = adminService.deleteBook(bookNo);
        if(success){
            return ResponseEntity.ok("삭제되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당도서를 찾을 수 없습니다.");
        }
    }



}
