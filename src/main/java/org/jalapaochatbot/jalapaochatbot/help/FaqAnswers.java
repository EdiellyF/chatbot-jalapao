package org.jalapaochatbot.jalapaochatbot.help;

import org.jalapaochatbot.jalapaochatbot.models.FaqAnswer;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

//classe que representa o arquivo .json, classe estatica
public  class FaqAnswers {
    private ArrayList<FaqAnswer> answers;
    private String defaultAnswer;

    public FaqAnswers(){
        try {
            JSONTokener tokener = new JSONTokener(new FileInputStream("src/main/resources/static/answers.json"));
            JSONObject faqData = new JSONObject(tokener);
            JSONArray faqArray = faqData.getJSONArray("faq");
            this.answers = new ArrayList<>();
            for (int i = 0; i < faqArray.length(); i++){
                JSONObject faqEntry = faqArray.getJSONObject(i);
                JSONArray keywordsArray = faqEntry.getJSONArray("keywords");
                List<String> keywords = new ArrayList<>();
                for (int j = 0; j < keywordsArray.length(); j++) {
                    keywords.add(keywordsArray.getString(j));
                }
                String answer = faqEntry.getString("answer");
                this.answers.add(new FaqAnswer(keywords, answer));
            }

            this.defaultAnswer = faqData.getString("default");

        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }


    public ArrayList<FaqAnswer> getAnswers() {
        return answers;
    }

    public String getDefaultAnswer() {
        return defaultAnswer;
    }
}
