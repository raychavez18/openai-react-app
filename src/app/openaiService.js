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

export const getOpenAIImage = async (input) => {
  try {
      const imageResponse = await openai.images.generate({
          model: "dall-e-2",
          prompt: input,
          n: 1,
          size: "256x256",
      });
      return imageResponse;
  } catch (error) {
      console.error("Error generating image:", error);
      if (error.response && error.response.status === 400) {
          throw new Error("Safety system restriction.");
      }
      throw error;
  }
};