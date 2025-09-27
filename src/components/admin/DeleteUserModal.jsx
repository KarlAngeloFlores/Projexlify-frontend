import { X, UserX } from 'lucide-react';
import { useState, useEffect } from 'react';
import Button from '../Button';
import '../../styles/animations.css';

const DeleteUserModal = ({ isOpen, onClose, onDeleteUser, user }) => {
  const [confirmUsername, setConfirmUsername] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    if (!isSubmitting) {
      setError('');
      setConfirmUsername('');
      onClose();
    }
  };

  const handleSubmit = async () => {
    if (confirmUsername !== user.username) {
      setError('Username does not match. Please type it exactly.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onDeleteUser(user.id); 
      handleClose();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to delete user');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
              <UserX className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Delete User
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Please confirm by typing the username to proceed.
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
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            This action will{' '}
            <span className="text-red-600 dark:text-red-400 font-semibold">
              permanently delete
            </span>{' '}
            the account{' '}
            <span className="font-bold text-gray-900 dark:text-white">
              {user?.username}
            </span>.
          </p>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Type username <span className="text-gray-900 dark:text-white">{user?.username}</span> to confirm:
          </label>
          <input
            type="text"
            value={confirmUsername}
            onChange={(e) => setConfirmUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            disabled={isSubmitting}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="button"
            buttonType="delete"
            onClick={handleSubmit}
            disabled={isSubmitting || confirmUsername !== user?.username}
          >
            {isSubmitting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
