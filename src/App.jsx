import { io } from "socket.io-client";
import "./App.css";
import { useEffect, useState } from "react";

const socket = io("http://localhost:8000"); // Connect to backend server

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Listen for incoming messages
    socket.on("chat message", (msg) => {
      setMessages([...messages, msg]);
    });

    // cleanup
    return () => {
      socket.off("chat message");
    };
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("chat message", message); // Emit message to server
      setMessage(""); // Clear input field
    }
  };

  return (
    <div className="App container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Real-Time Chat</h1>

      <ul id="messages" className="mb-4">
        {messages.map((msg, index) => (
          <li key={index} className="p-2 bg-gray-100 mb-1 rounded">
            {msg}
          </li>
        ))}
      </ul>

      <form onSubmit={sendMessage} className="flex">
        <input
          className="flex-grow p-2 border border-gray-300 rounded-l"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoComplete="off"
        />
        <button
          type="submit"
          className="py-2 px-6 bg-blue-500 text-white rounded-r"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
