// src/components/OpenAIComponent.js

"use client";

import React, { useState } from "react";
import { getOpenAIResponse, getOpenAIImage } from "../openaiService";

const OpenAIComponent = () => {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isImageLoading, setIsImageLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsImageLoading(true);
        setErrorMessage(""); // Clear previous error messages
        try {
            // Fetch the text response
            const aiResponse = await getOpenAIResponse(input);
            setResponse(aiResponse.choices[0].message.content);

            // Attempt to fetch the image response
            try {
                const imageResponse = await getOpenAIImage(input);
                setImageUrl(imageResponse.data[0].url);
            } catch (imageError) {
                setErrorMessage("We couldn’t generate the image due to safety system restrictions. Please try rephrasing your prompt.");
                setImageUrl("");
            }
        } catch (error) {
            setResponse("Error fetching response from OpenAI.");
            setImageUrl("");
        } finally {
            setIsImageLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-8 py-4 bg-gray-100 rounded shadow animate-fade">
            <h1 className="my-1 font-sans text-gray-900 text-2xl font-medium border-b border-gray-20">
                OpenAI Integration with React and NextJS
            </h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows="5"
                    cols="50"
                    placeholder="Type your prompt here..."
                />
                <br />
                <button
                    className="w-full text-white font-bold bg-emerald-500 hover:bg-emerald-600 p-5 py-2 px-4 rounded"
                    type="submit"
                >
                    Get Response and Image
                </button>
            </form>
            <div>
                <h2 className="my-1 font-sans font-medium text-gray-900 text-left">Response:</h2>
                <p className="my-1 mb-3.5 bg-white text-black p-5 rounded">{response}</p>
                {errorMessage && <p className="text-red-900 font-bold">{errorMessage}</p>}
                {isImageLoading && <p className="my-1 font-sans font-medium text-gray-900 text-left">Loading image...</p>}
                {imageUrl && !isImageLoading && (
                    <div className="my-3">
                        <h2 className="my-1 font-sans font-medium text-gray-900 text-left">
                            Generated Image:
                        </h2>
                        <div className="flex justify-center">
                            <img
                                src={imageUrl}
                                alt="Generated from OpenAI"
                                className="rounded border shadow"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OpenAIComponent;