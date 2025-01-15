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
    <div className='container'>
      <h1 className='bg-blue-500 font-bold my-1 py-5 px-4 rounded'>OpenAI Integration with React</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows="5"
          cols="50"
          placeholder="Type your prompt here..."
        />
        <br />
        <button className="w-full bg-red-500 text-white font-bold p-5 py-2 px-4 rounded hover:bg-red-700" type="submit">Get Response</button>
      </form>
      <div>
        <h2 className='my-1'>Response:</h2>
        <p className=' bg-white text-black font-bold p-5 rounded'>{response}</p>
      </div>
    </div>
  );
};

export default OpenAIComponent;