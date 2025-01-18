package com.project.iread.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@Controller
public class HomeController {

    @Value("${react.build.path}")
    private String reactBuildPath;

    @GetMapping({"/", "/iread/**"})
    public String home(Model model) throws IOException {
        // asset-manifest.json 파일 읽기
        ObjectMapper objectMapper = new ObjectMapper();
        File manifestFile = new File(reactBuildPath + "/asset-manifest.json");

        // asset-manifest.json이 존재하는지 확인
        if (!manifestFile.exists()) {
            throw new IOException("asset-manifest.json 파일이 존재하지 않습니다.");
        }

        // JSON 파일을 Map으로 변환
        Map<String, Object> assetManifest = objectMapper.readValue(manifestFile, Map.class);

        // 로그 추가하여 assetManifest 확인
        //System.out.println("Asset Manifest: " + assetManifest);

        // 모델에 assetManifest를 전달
        model.addAttribute("assetManifest", assetManifest);

        return "layout";  // "layout.html" 템플릿 반환
    }
}
