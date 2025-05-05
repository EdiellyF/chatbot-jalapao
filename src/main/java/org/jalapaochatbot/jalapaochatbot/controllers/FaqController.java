package org.jalapaochatbot.jalapaochatbot.controllers;

import org.jalapaochatbot.jalapaochatbot.dto.MessageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class FaqController {

    @PostMapping
    public ResponseEntity<String> answerQuestion(@RequestBody MessageRequest request){
        System.out.println(request.message());
       return ResponseEntity.ok("deu certo!");
    }
}
