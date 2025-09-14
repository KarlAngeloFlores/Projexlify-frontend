import { X, FolderX, CircleX } from 'lucide-react';
import { useState, useEffect } from 'react';
import Button from '../Button';
import '../../styles/animations.css'

const DeleteProjectModal = ({ isOpen, onClose, onDeleteProject, project }) => {
  const [remark, setRemark] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    if (!isSubmitting) {
      setError('');
      setRemark('');
      onClose();
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await onDeleteProject(project.id, remark); // ✅ pass remarks
      handleClose();
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if(isOpen) {
        console.log('PROJECT:', project)
    }
  }, [isOpen]);

  if (!isOpen) return null; // ✅ only render if open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="modal-animation relative bg-gray-900 rounded-2xl w-full max-w-md shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
              <FolderX className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Delete Project</h2>
              <p className="text-sm text-gray-400">
                Please confirm and provide remarks for this deletion.
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Remarks *
          </label>
          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            rows={3}
            placeholder="Enter reason for deletion..."
            className=" resize-none w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-700">
          <Button
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
<Button
  type="button"
  buttonType="delete"
  onClick={handleSubmit}
  disabled={isSubmitting}
>
  {isSubmitting ? 'Deleting...' : 'Delete'}
</Button>

        </div>
      </div>
    </div>
  );
};

export default DeleteProjectModal;
