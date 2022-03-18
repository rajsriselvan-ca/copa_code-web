import React, { useState, useEffect } from 'react'
import './chatbot.css'
import Chatbot from 'react-chatbot-kit';
import config from "./Config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import 'react-chatbot-kit/build/main.css';


function ChatRender() {
    return (
      <div className="chat-box">
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
    );
  }
  
  export default ChatRender;