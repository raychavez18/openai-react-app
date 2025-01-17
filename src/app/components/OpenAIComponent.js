// src/components/OpenAIComponent.js

"use client";

import React, { useState } from 'react';
import { getOpenAIResponse } from '../openaiService';

const OpenAIComponent = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const aiResponse = await getOpenAIResponse(input);
      setResponse(aiResponse.choices[0].message.content);
    } catch (error) {
      setResponse("Error fetching response from OpenAI.");
    }
  };


  return (
    <div className='container mx-auto px-8 py-4 bg-gray-100 rounded shadow animate-fade'>
        <h1 className='my-1 font-sans text-gray-900 text-2xl font-medium border-b border-gray-20'>OpenAI Integration with React and NextJS</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows="5"
          cols="50"
          placeholder="Type your prompt here..."
        />
        <br />
        <button className="w-full text-white font-bold bg-emerald-500 hover:bg-emerald-600 p-5 py-2 px-4 rounded" type="submit">Get Response</button>
      </form>
      <div>
        <h2 className='my-1 font-sans font-medium text-gray-900 text-left'>Response:</h2>
        <p className='my-1 mb-3.5 bg-white text-black p-5 rounded'>{response}</p>
      </div>
    </div>
  );
};

export default OpenAIComponent;