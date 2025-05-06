package org.jalapaochatbot.jalapaochatbot.services;

import org.jalapaochatbot.jalapaochatbot.help.FaqAnswers;
import org.jalapaochatbot.jalapaochatbot.models.FaqAnswer;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FaqService {

   private FaqAnswers faqAnswers = new FaqAnswers();

    public String getAnswer(String message){

        List<String> words = new ArrayList<>(Arrays.asList(message.toLowerCase().split("\\s+")));

        for (FaqAnswer entry: faqAnswers.getAnswers()){
                for (String keyword : entry.getKeywords()){
                    if (words.contains(keyword.toLowerCase())){
                             return  entry.getAnswer();
                    }
                }
            }

            return faqAnswers.getDefaultAnswer();

    }

}
