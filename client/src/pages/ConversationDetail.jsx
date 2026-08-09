import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, Loader2, ArrowLeft, User } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth';

const ConversationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authorizationToken, isLoggedIn, user } = useAuth();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('Please login to view messages');
      navigate('/login');
      return;
    }
    fetchConversation();
    fetchMessages();
    markAsRead();
  }, [id, isLoggedIn, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchConversation = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/conversations/${id}`, {
        headers: { Authorization: authorizationToken },
      });
      if (response.ok) {
        const data = await response.json();
        setConversation(data);
      }
    } catch (error) {
      console.error('Failed to fetch conversation:', error);
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/conversations/${id}/messages`, {
        headers: { Authorization: authorizationToken },
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        throw new Error('Failed to fetch messages');
      }
    } catch (error) {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/conversations/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: authorizationToken },
      });
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ conversationId: id, content: newMessage.trim() }),
      });

      if (response.ok) {
        setNewMessage('');
        fetchMessages();
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to send message');
      }
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const currentUserId = user?._id;
  const otherParticipant = conversation?.participants?.find(p => p._id?.toString() !== currentUserId?.toString()) || conversation?.participants?.[0];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-8">
      <div className="max-w-3xl mx-auto px-4 h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate('/conversations')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-semibold">
              {otherParticipant?.username?.charAt(0).toUpperCase() || <User className="w-5 h-5" />}
            </div>
            <div>
              <p className="font-semibold">{otherParticipant?.username || 'Traveler'}</p>
              <p className="text-xs text-gray-500">{otherParticipant?.email}</p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 rounded-3xl bg-[#1C1B1B] border border-white/10 p-4 md:p-6 flex flex-col overflow-hidden"
        >
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <p>Send your first message</p>
                  </div>
                ) : (
                  messages.map((message) => {
                    const isMe = message.senderId?._id?.toString() === currentUserId?.toString();
                    return (
                      <div
                        key={message._id}
                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                            isMe
                              ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-br-none'
                              : 'bg-[#0a0a0a] border border-white/10 text-gray-300 rounded-bl-none'
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className={`text-[10px] mt-1 ${isMe ? 'text-white/70' : 'text-gray-500'}`}>
                            {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSend} className="mt-4 flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 rounded-xl bg-[#0a0a0a] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                />
                <button
                  type="submit"
                  disabled={sending || !newMessage.trim()}
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-medium hover:from-cyan-600 hover:to-emerald-600 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ConversationDetail;
