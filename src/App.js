import logo from './logo.svg';
import './normalize.css';
import './App.css';
import { useState } from 'react';

function App() {

  // add state for input and chat log
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "Hello, I'm ChatGPT"
  },{
    user: "me",
    message: "Can you help me with my assignment?"
  }]);

  async function handleSubmit(e) { 
    e.preventDefault();
    setChatLog([...chatLog, { user: "me", message: `${input}`}]);
    setInput("");

    /* fetch response to the api combining the chat log array of messages
    and sending it as a message to localhost:3000 as a post */
    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          messages: chatLog.map((message) => message.message).
            join(" ")
        })
      });
    const data = await response.json();
    console.log(data);


  }

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button">
          <span>+</span>
          New Chat
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>

        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input-textare" ></input>
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user == "gpt" && "chatgpt"}`}>
            <div className="chat-message-center">
        <div className={`avatar ${message.user == "gpt" && "chatgpt"}`}>

          {message.user == "gpt" && <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    style={{
      fill: "#000",
    }}
    viewBox="0 0 256 256"
  >
    <path
      fill="#fff"
      strokeMiterlimit={10}
      d="M11.135 1.018a5.753 5.753 0 0 0-.797.015c-2.224.2-4.002 1.761-4.729 3.787a5.569 5.569 0 0 0-3.937 3.137c-.938 2.027-.475 4.344.916 5.986a5.571 5.571 0 0 0 .744 4.979c1.286 1.826 3.525 2.583 5.643 2.2a5.569 5.569 0 0 0 4.687 1.845c2.225-.2 4.002-1.761 4.729-3.787a5.571 5.571 0 0 0 3.94-3.137c.937-2.027.474-4.346-.917-5.988.547-1.662.3-3.49-.746-4.977-1.286-1.826-3.525-2.583-5.643-2.2a5.55 5.55 0 0 0-3.89-1.86zm-.11 1.496c.897.035 1.73.36 2.407.908-.113.056-.232.094-.342.158L9.076 5.896a1 1 0 0 0-.5.856l-.058 5.486L6.75 11.19V6.785c0-2.136 1.558-4.043 3.684-4.254.199-.02.396-.025.591-.017zm5.1 1.742c1.274.007 2.515.57 3.293 1.654.653.91.892 1.992.728 3.037-.105-.07-.198-.153-.308-.217l-4.012-2.316a1.002 1.002 0 0 0-.99-.006l-4.783 2.696.023-2.055 3.815-2.201c.693-.4 1.47-.597 2.234-.592zM5.283 6.473c-.008.126-.033.247-.033.375v4.632c0 .353.186.68.49.86l4.725 2.797-1.791 1.006-3.815-2.204c-1.85-1.068-2.722-3.372-1.841-5.318a4.092 4.092 0 0 1 2.265-2.148zm10.043 1.384 3.815 2.204c1.85 1.068 2.724 3.372 1.843 5.318a4.094 4.094 0 0 1-2.267 2.148c.008-.125.033-.248.033-.375v-4.63a1 1 0 0 0-.49-.862l-4.725-2.797zm-3.3 1.854 1.968 1.168-.027 2.289-1.992 1.12-1.97-1.167.026-2.289zm3.456 2.05 1.768 1.05v4.404c0 2.136-1.558 4.043-3.684 4.254a4.092 4.092 0 0 1-2.998-.89c.113-.057.232-.095.342-.16l4.014-2.315a1 1 0 0 0 .5-.856zm-1.535 3.135-.023 2.055-3.815 2.201c-1.85 1.068-4.282.674-5.527-1.062a4.092 4.092 0 0 1-.728-3.037c.105.07.198.153.308.217l4.012 2.316c.306.176.682.179.99.006z"
      fontFamily="none"
      fontSize="none"
      fontWeight="none"
      style={{
        mixBlendMode: "normal",
      }}
      textAnchor="none"
      transform="scale(10.66667)"
    />
  </svg> }
              </div>
              <div className="message">
                {message.message}
              </div>
            </div>
          </div>
  )
}

export default App;
