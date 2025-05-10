package org.jalapaochatbot.jalapaochatbot.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OllamaService {



    @Value("${ollama.api.url}")
    private String OLLAMA_API_URL;

    private final RestTemplate restTemplate;

    public OllamaService(RestTemplate restTemplate){
        this.restTemplate = restTemplate;
    }

    public String gerarResposta(String prompt) throws JsonProcessingException {




        Map<String, Object> body = new HashMap<>();
        body.put("model", "gemma3:1b");
        body.put("prompt", prompt);
        body.put("stream", false);

        // Convertendo o corpo para JSON manualmente
        String jsonBody = new ObjectMapper().writeValueAsString(body);

        // Header
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Criação da requisição com o corpo JSON em String
        HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);

        // Envio da requisição
        ResponseEntity<Map> response = restTemplate.exchange(
                OLLAMA_API_URL,
                HttpMethod.POST,
                request,
                Map.class
        );

        Map<String, Object> responseBody = response.getBody();

        if (responseBody.containsKey("response")) {
            return responseBody.get("response").toString();
        } else {
            return "Desculpa, não consegui compreender!";
        }
    }

}
