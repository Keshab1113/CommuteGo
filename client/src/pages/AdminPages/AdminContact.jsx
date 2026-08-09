import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Trash2, CheckCircle, Clock, Loader2, Mail, Phone, MapPin, Eye, MessageSquare } from 'lucide-react';
import { toast } from "react-toastify";
import { adminDataApi } from '../../services/api/adminApi';
import DeleteConfirmModal from '../../components/ui/DeleteConfirmModal';
import SimpleSelect from '../../components/ui/SimpleSelect';

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const response = await adminDataApi.getAllFeedbacks();
      // Filter only contacts (type === 'contact' or no type)
      const allData = response.data;
      const contactData = allData.filter(item => item.type === 'contact' || !item.type);
      setContacts(contactData);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch contacts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const deleteContact = async (id) => {
    try {
      await adminDataApi.deleteFeedback(id);
      toast.success("Contact deleted successfully");
      fetchContacts();
    } catch (error) {
      toast.error("Failed to delete contact");
    }
  };

  const markAsDone = async (id) => {
    try {
      await adminDataApi.updateFeedback(id, { isDone: true });
      toast.success("Marked as resolved");
      fetchContacts();
    } catch (error) {
      toast.error("Failed to update contact");
    }
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;
    setIsDeleting(true);
    try {
      await adminDataApi.deleteFeedback(deleteItem);
      toast.success("Contact deleted successfully");
      fetchContacts();
    } catch (error) {
      toast.error("Failed to delete contact");
    } finally {
      setIsDeleting(false);
      setDeleteItem(null);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch =
      contact.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' ||
      (filter === 'done' && contact.isDone) ||
      (filter === 'pending' && !contact.isDone);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Contacts</h1>
          <p className="text-sm text-gray-500">Manage contact form submissions</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl bg-[#1C1B1B] border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <SimpleSelect
            value={filter}
            onChange={(value) => setFilter(value)}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'done', label: 'Resolved' },
              { value: 'pending', label: 'Pending' },
            ]}
            triggerClassName="px-4 h-10 rounded-xl bg-[#1C1B1B] border-white/10 text-white text-sm"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-[#1C1B1B] border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{contacts.length}</p>
              <p className="text-xs text-gray-500">Total Contacts</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-xl bg-[#1C1B1B] border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{contacts.filter(c => c.isDone).length}</p>
              <p className="text-xs text-gray-500">Resolved</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-xl bg-[#1C1B1B] border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{contacts.filter(c => !c.isDone).length}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-[#1C1B1B] border border-white/10 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-[#0a0a0a]">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Name</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Email</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Phone</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Subject</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Status</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-medium text-white">{contact.fullname}</p>
                      <p className="text-xs text-gray-500">{new Date(contact.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="py-4 px-6">
                      <a href={`mailto:${contact.email}`} className="text-sm text-cyan-400 hover:underline">{contact.email}</a>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-400">{contact.phone || '—'}</td>
                    <td className="py-4 px-6 text-sm text-gray-400">{contact.subject || '—'}</td>
                    <td className="py-4 px-6">
                      {contact.isDone ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                          <CheckCircle className="w-3 h-3" /> Resolved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-medium">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedContact(contact)}
                          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-cyan-400 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {!contact.isDone && (
                          <button
                            onClick={() => markAsDone(contact._id)}
                            className="p-2 rounded-lg hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-400 transition-colors"
                            title="Mark as Resolved"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => setDeleteItem(contact._id)}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredContacts.length === 0 && (
            <div className="py-12 text-center">
              <Mail className="w-12 h-12 mx-auto mb-4 text-gray-600" />
              <p className="text-gray-500">No contacts found</p>
            </div>
          )}
        </motion.div>
      )}

      <DeleteConfirmModal
        open={!!deleteItem}
        onOpenChange={(open) => {
          if (!open) setDeleteItem(null);
        }}
        title="Delete Contact"
        description="Are you sure you want to delete this contact? This action cannot be undone."
        onConfirm={confirmDelete}
        isLoading={isDeleting}
      />

      {/* Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1C1B1B] border border-white/10 rounded-2xl p-6 max-w-lg w-full mx-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Contact Details</h3>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Name</p>
                  <p className="font-medium text-white">{selectedContact.fullname}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a href={`mailto:${selectedContact.email}`} className="font-medium text-cyan-400 hover:underline">{selectedContact.email}</a>
                </div>
              </div>
              {selectedContact.phone && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="font-medium text-white">{selectedContact.phone}</p>
                  </div>
                </div>
              )}
              {selectedContact.subject && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Subject</p>
                    <p className="font-medium text-white">{selectedContact.subject}</p>
                  </div>
                </div>
              )}
              <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/10">
                <p className="text-sm text-gray-400 mb-2">Message</p>
                <p className="text-white leading-relaxed">{selectedContact.message}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <p className="text-xs text-gray-500">
                  Received: {new Date(selectedContact.createdAt).toLocaleString()}
                </p>
                {!selectedContact.isDone && (
                  <button
                    onClick={() => {
                      markAsDone(selectedContact._id);
                      setSelectedContact(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors text-sm font-medium"
                  >
                    Mark as Resolved
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminContact;
