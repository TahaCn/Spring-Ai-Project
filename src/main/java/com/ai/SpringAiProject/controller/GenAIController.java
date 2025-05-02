package com.ai.SpringAiProject.controller;

import com.ai.SpringAiProject.service.ChatService;
import com.ai.SpringAiProject.service.ImageService;
import com.ai.SpringAiProject.service.RecipeService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.ai.image.ImageGeneration;
import org.springframework.ai.image.ImageResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class GenAIController {

    private final ChatService chatService;
    private final ImageService imageService;
    private final RecipeService recipeService;

    public GenAIController(ChatService chatService, ImageService imageService, RecipeService recipeService) {
        this.imageService = imageService;
        this.chatService = chatService;
        this.recipeService = recipeService;
    }

    @GetMapping("ask-ai")
    public String getResponse(@RequestParam String prompt){
        return  chatService.getResponse(prompt);
    }

    @GetMapping("ask-ai-options")
    public String getResponseOption(@RequestParam String prompt){
        return chatService.getResponseOptions(prompt);
    }
    /*@GetMapping("generate-image")
    public void generateImage(HttpServletResponse response, @RequestParam String prompt) throws IOException {
        ImageResponse imageResponse = imageService.generateImage(prompt);
        String imageUrl = imageResponse.getResult().getOutput().getUrl();
        response.sendRedirect(imageUrl);
    }*/
    @GetMapping("generate-image")
    public List<String> generateImage(HttpServletResponse response,
                                      @RequestParam String prompt){
        ImageResponse imageResponse = imageService.generateImage(prompt);

        List<String> imageUrls = imageResponse.getResults().stream()
                .map(result -> result.getOutput().getUrl())
                .collect(Collectors.toList());
        return imageUrls;
    }

    @GetMapping("/recipe-creator")
    public String recipeCreator(@RequestParam String ingredients,
                                      @RequestParam(defaultValue = "any") String cuisine,
                                      @RequestParam(defaultValue = "") String dietaryRestriction){
        return recipeService.createRecipe(ingredients,cuisine,dietaryRestriction);
    }
}
