package org.jalapaochatbot.jalapaochatbot.models;

import java.util.List;

//classe responsavel pelo conteudo em si
public class FaqAnswer {
    private List<String> keywords;
   private   String answer;

    public FaqAnswer() {
    }


    public FaqAnswer(List<String> keywords, String answer) {
        this.keywords = keywords;
        this.answer = answer;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
