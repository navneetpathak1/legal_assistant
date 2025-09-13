import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Mic, Bot, User, Loader2, AlertCircle } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserData';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { setCurrentConversation } from '../store/slices/userSlice';

interface Message {
  id: number;
  role: 'user' | 'bot' | 'lawyer';
  message: string;
  createdAt: string;
}

const ChatArea: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { profile, error } = useUserProfile();
  const dispatch = useDispatch<AppDispatch>();
  const { isDark } = useSelector((state: RootState) => state.theme);
  const { currentConversation } = useSelector((state: RootState) => state.user);

  const [localMessages, setLocalMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (currentConversation?.chats && currentConversation.chats.length > 0) {
      setLocalMessages(currentConversation.chats);
    } else {
      setLocalMessages([]);
    }
  }, [currentConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isLoading) {
      scrollToBottom();
    }
  }, [isLoading, localMessages.length]);

  const handleSendMessage = async () => {
    if (!message.trim() || !profile) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    setLocalMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/v1/users/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: profile.id,
          message: message.trim(),
          country: profile.country,
          conversationId: currentConversation?.id || null
        })
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage: Message = {
          id: Date.now() + 1,
          role: 'bot',
          message: data.reply,
          createdAt: new Date().toISOString()
        };

        setLocalMessages(prev => [...prev, botMessage]);
        
        if (data.conversationId && (!currentConversation || currentConversation.id !== data.conversationId)) {
          dispatch(setCurrentConversation({
            id: data.conversationId,
            title: message.trim().slice(0, 30) + '...',
            chats: [...localMessages, userMessage, botMessage],
            createdAt: new Date().toISOString()
          }));
        }
        
        setTimeout(scrollToBottom, 100);
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (err) {
      console.error('Send message error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`flex flex-col ${isDark ? 'bg-gray-900' : 'bg-white'} h-full`}>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {localMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'bot' && (
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={20} className="text-white" />
                </div>
              )}
              
              <div className={`max-w-3xl ${msg.role === 'user' ? 'order-first' : ''}`}>
                <div
                  className={`rounded-2xl px-6 py-4 ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white ml-auto'
                      : isDark 
                        ? 'bg-gray-800 border border-gray-700 text-gray-100'
                        : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.message}</div>
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={20} className="text-white" />
                </div>
              )}
            </div>
          ))}

          {/* Welcome Message */}
          {localMessages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot size={32} className="text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Welcome to Legal Assistant
              </h3>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
                I'm here to help you with legal questions and provide guidance on various legal matters. 
                Ask me anything about laws, regulations, legal procedures, or get advice on legal situations.
              </p>
            </div>
          )}

          {/* Loading Message */}
          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot size={20} className="text-white" />
              </div>
              <div className="max-w-3xl">
                <div className={`rounded-2xl px-6 py-4 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                  <div className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-blue-500" />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex gap-4 justify-start">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle size={20} className="text-white" />
              </div>
              <div className="max-w-3xl">
                <div className="rounded-2xl px-6 py-4 bg-red-50 border border-red-200 text-red-800">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} className="text-red-500" />
                    <span>Error: {error}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className={`border-t ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'} p-4`}>
        <div className="max-w-4xl mx-auto">
          <div className={`flex items-end gap-3 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-2`}>
            <button className={`p-3 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded-xl transition-colors`}>
              <Paperclip size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
            </button>
            
            <div className="flex-1">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything about legal matters..."
                className={`w-full bg-transparent resize-none border-none outline-none p-2 ${isDark ? 'text-gray-100 placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'} max-h-32`}
                rows={1}
                onKeyPress={handleKeyPress}
                disabled={isLoading || !profile}
              />
            </div>

            <button className={`p-3 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded-xl transition-colors`}>
              <Mic size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
            </button>
            
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!message.trim() || isLoading || !profile}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
          
          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} text-center mt-3`}>
            Legal AI Assistant can make mistakes. Please verify important information.
            {!profile && (
              <span className="block mt-1 text-red-500">Please log in to start chatting</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;