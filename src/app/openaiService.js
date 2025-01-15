// src/openaiService.js

import OpenAI from "openai";

const openai = new OpenAI({ 
    dangerouslyAllowBrowser: true,
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY 
});

export const getOpenAIResponse = async (input) => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: input }],
        model: "gpt-4o-mini",
      });
  
      return completion;
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
      throw error;
    }
  };