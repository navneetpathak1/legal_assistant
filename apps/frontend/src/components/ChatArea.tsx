import React, { useState } from 'react';
import { Send, Paperclip, Mic, Bot, User } from 'lucide-react';

const ChatArea: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI legal assistant. I can help you with contract reviews, legal questions, document analysis, and connect you with qualified lawyers. How can I assist you today?",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      type: 'user',
      content: "I need help reviewing an employment contract. Can you guide me through the key points I should look for?",
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: 3,
      type: 'bot',
      content: "Absolutely! When reviewing an employment contract, here are the key areas to focus on:\n\n1. **Compensation & Benefits**: Salary, bonuses, health insurance, retirement plans\n2. **Job Responsibilities**: Clear definition of your role and expectations\n3. **Termination Clauses**: Notice periods, severance packages, grounds for termination\n4. **Non-Compete & Non-Disclosure**: Restrictions on future employment and confidentiality\n5. **Work Schedule**: Hours, overtime policies, vacation time\n\nWould you like me to elaborate on any of these points, or do you have a specific section you'd like to discuss?",
      timestamp: new Date(Date.now() - 60000)
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user' as const,
        content: message,
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-gray-50">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.type === 'bot' && (
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot size={20} className="text-white" />
              </div>
            )}
            
            <div className={`max-w-3xl ${msg.type === 'user' ? 'order-first' : ''}`}>
              <div
                className={`rounded-2xl px-6 py-4 ${
                  msg.type === 'user'
                    ? 'bg-blue-500 text-white ml-auto'
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
              <div className={`text-xs text-gray-500 mt-2 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                {formatTime(msg.timestamp)}
              </div>
            </div>

            {msg.type === 'user' && (
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-gray-600" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-4 bg-gray-100 rounded-2xl p-2">
            <button className="p-3 hover:bg-gray-200 rounded-xl transition-colors">
              <Paperclip size={20} className="text-gray-600" />
            </button>
            
            <div className="flex-1">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything about legal matters..."
                className="w-full bg-transparent resize-none border-none outline-none p-2 text-gray-800 placeholder-gray-500 max-h-32"
                rows={1}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>

            <button className="p-3 hover:bg-gray-200 rounded-xl transition-colors">
              <Mic size={20} className="text-gray-600" />
            </button>
            
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!message.trim()}
            >
              <Send size={20} />
            </button>
          </div>
          
          <div className="text-xs text-gray-500 text-center mt-3">
            Legal AI Assistant can make mistakes. Please verify important information.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;