package com.project.iread.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class AdminBookController {

    @GetMapping("/api/searchBook")
    public ResponseEntity<String> bookApi(@RequestParam("query") String query) {
        if (query == null || query.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("검색어를 입력하세요.");
        }

        String clientId = "gq6geVvoGry2ivKjmIn5"; // 네이버 API Client ID
        String clientSecret = "GXXIzqFD96"; // 네이버 API Client Secret
        String apiURL = "https://openapi.naver.com/v1/search/book.json?query=" + query;

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
                    .body("네이버 API 호출 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}
