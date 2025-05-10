package org.jalapaochatbot.jalapaochatbot.services;

import java.text.Normalizer;
import java.util.*;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.jalapaochatbot.jalapaochatbot.help.FaqAnswers;
import org.jalapaochatbot.jalapaochatbot.models.FaqAnswer;
import org.springframework.stereotype.Service;


@Service
public class FaqService {

   private FaqAnswers faqAnswers = new FaqAnswers();
   private OllamaService ollamaService;

   private Map<String, String> cache = new HashMap<>();

   public FaqService(OllamaService ollamaService){
       this.ollamaService = ollamaService;
   }

    public String getAnswer(String message) throws JsonProcessingException {
       message = message.toLowerCase();
       if (cache.containsKey(message)){
           return cache.get(message);
       }
       Set<String> words = normalizeWords(message);
        for (FaqAnswer entry: faqAnswers.getAnswers()){
                for (String keyword : entry.getKeywords()){
                    if (words.contains(keyword.toLowerCase())){
                        cache.put(message, entry.getAnswer());
                             return  entry.getAnswer();
                    }
                }
            }
        StringBuilder contexto = new StringBuilder();
        contexto.append("Você é um assistente especializado sobre o Jalapão.\n");
        contexto.append("Por favor, responda com informações úteis sobre Jalapão.\n");
        contexto.append("Se o usuário perguntar algo irrelevante, educadamente redirecione para tópicos sobre Jalapão.\n");
        contexto.append("Aqui estão algumas perguntas e respostas para contexto:\n\n");


        int count = 0;
        outer:
        for (FaqAnswer entry : faqAnswers.getAnswers()) {
            for (String keyword : entry.getKeywords()) {
                if (message.contains(keyword.toLowerCase())) {
                    contexto.append("Pergunta: ").append(entry.getKeywords().get(0)).append("\n");
                    contexto.append("Resposta: ").append(entry.getAnswer()).append("\n\n");
                    count++;
                    if (count >=5) break outer;
                }
            }
        }

        contexto.append("Usuário perguntou: ").append(message).append("\n");
        contexto.append("Resposta:");
        String respostaGerada = ollamaService.gerarResposta(contexto.toString());
        cache.put(message, respostaGerada);

        return respostaGerada;
    }


    private Set<String> normalizeWords(String message) {
        return Arrays.stream(message.split("\\s+"))
                .map(word -> Normalizer.normalize(word, Normalizer.Form.NFD))
                .map(word -> word.replaceAll("\\p{InCombiningDiacriticalMarks}+", ""))
                .map(word -> word.replaceAll("[^a-zA-Z0-9]", "").toLowerCase())
                .filter(word -> !word.isEmpty())
                .collect(Collectors.toSet());
    }

}
