import React, { useState, useEffect } from "react";
import { X, ClipboardEdit, AlertCircle, CheckCircle } from "lucide-react";

const UpdateTaskModal = ({ isOpen, onClose, onUpdateTask, task }) => {
  const [formData, setFormData] = useState({
    projectId: "",
    taskId: "",
    name: "",
    contents: "",
    newStatus: "todo",
    remark: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  //fill data from initial data
  useEffect(() => {
    if (task) {
      setFormData({
        projectId: task.projectId || "",
        taskId: task.taskId || "",
        name: task.name || "",
        contents: task.contents || "",
        newStatus: task.status || "todo",
        remark: task.remark || "",
      });
    }
  }, [task]);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      const taskData = {
        projectId: formData.projectId,
        taskId: formData.taskId,
        name: formData.name.trim(),
        contents: formData.contents.trim(),
        newStatus: formData.newStatus.trim(),
        remark: formData.remark.trim(),
      };

      await onUpdateTask(task.id, formData.name, formData.contents, formData.newStatus, formData.remark);
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
      setErrors({ submit: error.message || "Failed to update task. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setErrors({});
      onClose();
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
      <div className="relative w-full max-w-md bg-gray-800/95 backdrop-blur-md rounded-2xl border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
              <ClipboardEdit className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Update Task</h2>
              <p className="text-sm text-gray-400">Modify task details</p>
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

        {/* Form */}
        <div className="p-6">
          <div className="space-y-2">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Task Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInfoChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all border-gray-600 focus:ring-blue-500`}
              />
            </div>

            {/* Contents */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contents *
              </label>
              <textarea
                name="contents"
                value={formData.contents}
                onChange={handleInfoChange}
                rows={3}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-white resize-none focus:outline-none focus:ring-2 transition-all border-gray-600 focus:ring-blue-500`}
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status *
              </label>
              <select
                name="newStatus"
                value={formData.newStatus}
                onChange={handleInfoChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all border-gray-600 focus:ring-blue-500`}
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* Remark */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Remark *
              </label>
              <textarea
                name="remark"
                value={formData.remark}
                onChange={handleInfoChange}
                rows={2}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 bg-gray-900/50 border rounded-lg text-white resize-none focus:outline-none focus:ring-2 transition-all border-gray-600 focus:ring-blue-500`}
              />
            </div>

            {errors.submit && (
              <div className="px-4 py-2 bg-red-900/20 border border-red-500/30 rounded-lg text-sm text-red-400 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {errors.submit}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-6 py-3 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                !formData.name.trim() ||
                !formData.contents.trim()
              }
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Update Task
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskModal;