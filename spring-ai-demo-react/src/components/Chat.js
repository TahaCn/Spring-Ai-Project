import React, { useState } from "react";

function Chat() {

  const [prompt, setPrompt] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const askAi = async () => {
    try {
      const response = await fetch(`http://localhost:8081/ask-ai?prompt=${prompt}`);
      const data = await response.text();
      console.log(data);
      setChatResponse(data); 
    } catch (error) {
      console.error("Error fetching chat response:", error);
      setChatResponse('');
    }
  }
  return(
    <div>
      <h2>Chat with Ai</h2>
      <input type="text"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      placeholder="Enter a prompt for ai"/>

      <button onClick={askAi}>Ask AI</button>
      
      <div className="output">
        <p>{chatResponse}</p>
      </div>
    </div>
  );
}

export default Chat;