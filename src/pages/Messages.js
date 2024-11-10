import React, { useState } from 'react';
import './Messages.css';

const Messages = () => {
  // Store conversation data in state to ensure rerenders
  const [conversations, setConversations] = useState([
    { id: 1, name: 'Emma Lee - Seller', messages: [
      { text: 'Hi! I’m interested in the laptop you’re selling. Is it still available?', type: 'received' },
      { text: 'Yes, it’s still available! Are you looking to buy it soon?', type: 'sent' },
    ] },
    { id: 2, name: 'Ryan Kim - Buyer', messages: [
      { text: 'Is the backpack in good condition?', type: 'received' },
      { text: 'Yes, it’s lightly used and in great shape!', type: 'sent' },
    ] },
    { id: 3, name: 'Sophia Patel - Interested', messages: [
      { text: 'Can you tell me more about the textbook bundle?', type: 'received' },
      { text: 'It includes all the essentials for first-year students.', type: 'sent' },
    ] },
  ]);

  const [activeConversation, setActiveConversation] = useState(null);
  const [messageText, setMessageText] = useState('');

  const openConversation = (conversation) => {
    setActiveConversation(conversation);
  };

  const handleInputChange = (e) => {
    setMessageText(e.target.value);
  };

  const sendMessage = () => {
    if (messageText.trim() === '') return;

    const newMessage = { text: messageText, type: 'sent' };
    setMessageText(''); // Clear input field after sending

    // Update the messages in the active conversation
    const updatedConversations = conversations.map(conversation =>
      conversation.id === activeConversation.id
        ? { ...conversation, messages: [...conversation.messages, newMessage] }
        : conversation
    );

    setConversations(updatedConversations);

    // Update the active conversation with new message
    setActiveConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
  };

  return (
    <div className="messages-page">
      <aside className="sidebar">
        <h2>Conversations</h2>
        <ul className="conversation-list">
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              className="conversation"
              onClick={() => openConversation(conversation)}
            >
              {conversation.name}
            </li>
          ))}
        </ul>
      </aside>

      <section className="chat-area">
        {activeConversation ? (
          <>
            <h2>Chat with {activeConversation.name}</h2>
            <div className="chat-messages">
              {activeConversation.messages.map((message, index) => (
                <p key={index} className={`message ${message.type}`}>
                  {message.text}
                </p>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageText}
                onChange={handleInputChange}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <p className="no-conversation-selected">Select a conversation to start chatting</p>
        )}
      </section>
    </div>
  );
};

export default Messages;
