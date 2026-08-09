import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Loader2, ArrowLeft, User } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth';

const Conversations = () => {
  const navigate = useNavigate();
  const { authorizationToken, isLoggedIn, user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('Please login to view messages');
      navigate('/login');
      return;
    }
    fetchConversations();
  }, [isLoggedIn, navigate]);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/conversations`, {
        headers: { Authorization: authorizationToken },
      });
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      } else {
        throw new Error('Failed to fetch conversations');
      }
    } catch (error) {
      toast.error('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  const currentUserId = user?._id;

  const getOtherParticipant = (conversation) => {
    return conversation.participants?.find(p => p._id?.toString() !== currentUserId?.toString()) || conversation.participants?.[0];
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-[#1C1B1B] border border-white/10 p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Messages</h1>
              <p className="text-sm text-gray-500">Conversations with travelers</p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
            </div>
          ) : conversations.length === 0 ? (
            <div className="text-center py-16">
              <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No messages yet</h3>
              <p className="text-gray-400">Start a conversation from a trip card.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {conversations.map((conversation) => {
                const other = getOtherParticipant(conversation);
                const unread = conversation.unreadCount?.find(
                  (uc) => uc.userId?.toString() === currentUserId?.toString()
                )?.count || 0;
                return (
                  <button
                    key={conversation._id}
                    onClick={() => navigate(`/conversations/${conversation._id}`)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-cyan-500/30 transition-all text-left"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {other?.username?.charAt(0).toUpperCase() || <User className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold truncate">{other?.username || 'Traveler'}</p>
                        {unread > 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-xs font-medium">
                            {unread}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 truncate">
                        {conversation.lastMessage?.content || 'No messages yet'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Conversations;
