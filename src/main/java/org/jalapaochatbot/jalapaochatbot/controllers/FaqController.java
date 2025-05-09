package org.jalapaochatbot.jalapaochatbot.controllers;

import org.jalapaochatbot.jalapaochatbot.dto.MessageRequest;
import org.jalapaochatbot.jalapaochatbot.dto.MessageResponse;

import org.jalapaochatbot.jalapaochatbot.services.FaqService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class FaqController {

    private FaqService faqService;

    public FaqController(FaqService faqService){
        this.faqService = faqService;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping
    public ResponseEntity<MessageResponse> answerQuestion(@RequestBody MessageRequest request){

        String answer = this.faqService.getAnswer(request.message());
        MessageResponse messageResponse = new MessageResponse(answer);
       return ResponseEntity.ok(messageResponse);
    }
}
