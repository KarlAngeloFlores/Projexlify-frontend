import { X, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import Button from '../Button';
import '../../styles/animations.css';

const UpdateUserModal = ({ isOpen, onClose, onUpdateUser, user }) => {
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    if (!isSubmitting) {
      setError('');
      setNewUsername('');
      onClose();
    }
  };

  const handleSubmit = async () => {
    if (!newUsername.trim()) {
      setError('Username cannot be empty.');
      return;
    }

    if (newUsername === user.username) {
      setError('New username must be different from the current one.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onUpdateUser(user.id, newUsername); // ✅ update by id + new username
      handleClose();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to update user');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isOpen && user) {
      setNewUsername(user.username); // Pre-fill current username
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="modal-animation relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Update Username</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter a new username for this account.
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            New Username
          </label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""))}
            maxLength={50}
            placeholder="Enter new username"
            className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isSubmitting}
          />
          {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="button"
            buttonType="update"
            onClick={handleSubmit}
            disabled={isSubmitting || newUsername === user?.username}
          >
            {isSubmitting ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
