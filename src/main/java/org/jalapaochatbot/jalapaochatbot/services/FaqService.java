package org.jalapaochatbot.jalapaochatbot.services;

import org.jalapaochatbot.jalapaochatbot.help.FaqAnswers;
import org.jalapaochatbot.jalapaochatbot.models.FaqAnswer;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class FaqService {

   private FaqAnswers faqAnswers = new FaqAnswers();

    public String getAnswer(String message){

        List<String> words = List.of(message.toLowerCase().split("\\s+"));

            for (FaqAnswer entry: faqAnswers.getAnswers()){
                for (String keyword : entry.getKeywords()){
                    if (words.contains(keyword)){
                             return  entry.getAnswer();
                    }
                }
            }

            return faqAnswers.getDefaultAnswer();

    }

}
