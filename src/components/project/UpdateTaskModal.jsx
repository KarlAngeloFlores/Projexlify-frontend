import React, { useState, useEffect } from "react";
import { X, ClipboardEdit, CheckCircle, CircleX } from "lucide-react";
import Button from "../Button";
import "../../styles/animations.css";

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

  // Fill data from initial task
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
      await onUpdateTask(
        task.id,
        formData.name.trim(),
        formData.contents.trim(),
        formData.newStatus.trim(),
        formData.remark.trim()
      );
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
      setErrors({
        submit: error.message || "Failed to update task. Please try again.",
      });
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
      <div className="modal-animation relative w-full max-w-md 
        bg-white/95 dark:bg-gray-800/95 backdrop-blur-md 
        rounded-2xl border border-gray-200 dark:border-gray-700 
        shadow-2xl transform transition-all"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
              <ClipboardEdit className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Update Task
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Modify task details
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 text-gray-600 dark:text-gray-400 
              hover:text-gray-900 dark:hover:text-white 
              hover:bg-gray-100 dark:hover:bg-gray-700 
              rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Task Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInfoChange}
                maxLength={100}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 
                  border border-gray-300 dark:border-gray-600 
                  rounded-lg text-gray-900 dark:text-white 
                  placeholder-gray-500 dark:placeholder-gray-400 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent transition-all"
              />
            </div>

            {/* Contents */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contents *
              </label>
              <textarea
                name="contents"
                value={formData.contents}
                onChange={handleInfoChange}
                maxLength={300}
                rows={3}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 
                  border border-gray-300 dark:border-gray-600 
                  rounded-lg text-gray-900 dark:text-white 
                  placeholder-gray-500 dark:placeholder-gray-400 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status *
              </label>
              <select
                name="newStatus"
                value={formData.newStatus}
                onChange={handleInfoChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 
                  border border-gray-300 dark:border-gray-600 
                  rounded-lg text-gray-900 dark:text-white 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent transition-all"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* Remark */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Remark *
              </label>
              <textarea
                name="remark"
                value={formData.remark}
                onChange={handleInfoChange}
                maxLength={200}
                rows={2}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 
                  border border-gray-300 dark:border-gray-600 
                  rounded-lg text-gray-900 dark:text-white 
                  placeholder-gray-500 dark:placeholder-gray-400 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent transition-all resize-none"
              />
            </div>

            {errors.submit && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 
                border border-red-200 dark:border-red-500/30 rounded-lg"
              >
                <div className="flex items-center text-sm text-red-700 dark:text-red-400">
                  <CircleX size={18} className="mr-2 flex-shrink-0" />
                  {errors.submit}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              buttonType="update"
              type="submit"
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                !formData.name.trim() ||
                !formData.contents.trim()
              }
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
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
