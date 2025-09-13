import React, { useState } from 'react';
import { MessageSquare, Calendar, Clock, User, Bot } from 'lucide-react';
import { useAppSelector } from '../store/hooks';

const ChatHistory: React.FC = () => {
  const { profile } = useAppSelector((state) => state.user);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMessageIcon = (role: string) => {
    switch (role) {
      case 'user':
        return <User className="w-4 h-4 text-blue-600" />;
      case 'bot':
        return <Bot className="w-4 h-4 text-green-600" />;
      case 'lawyer':
        return <MessageSquare className="w-4 h-4 text-purple-600" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-600" />;
    }
  };

  if (!profile || !profile.conversations || profile.conversations.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No conversations yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Start a new conversation to see your chat history here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Chat History
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your previous conversations with our legal assistant
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Conversations List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            All Conversations
          </h3>
          {profile.conversations.map((conversation: any) => (
            <div
              key={conversation.id}
              className={`bg-white dark:bg-gray-800 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedConversation?.id === conversation.id
                  ? 'border-blue-500 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                    {conversation.title}
                  </h4>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(conversation.createdAt)}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{conversation.chats?.length || 0} messages</span>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {conversation.chats?.length > 0 && formatDate(conversation.chats[conversation.chats.length - 1].createdAt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Conversation Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {selectedConversation ? 'Conversation Details' : 'Select a conversation'}
          </h3>
          
          {selectedConversation ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedConversation.title}
                </h4>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  Started: {formatDate(selectedConversation.createdAt)}
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {selectedConversation.chats?.map((chat: any, index: number) => (
                  <div
                    key={chat.id}
                    className={`p-4 border-b border-gray-100 dark:border-gray-700 ${
                      index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getMessageIcon(chat.role)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                            {chat.role}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(chat.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {chat.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Click on a conversation to view its details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
