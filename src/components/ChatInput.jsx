import { useState } from 'react';
import './ChatInput.css';

function ChatInput({ message, onSend }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="chat-input-container">
      {message && (
        <div className="chat-message-display">
          {message}
        </div>
      )}
      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="chat-send-button">
          ➤
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
