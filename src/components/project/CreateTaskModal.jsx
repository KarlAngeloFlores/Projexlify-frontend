import { useState } from "react";
import { X, ListTodo, AlertCircle, CheckCircle } from "lucide-react";
import Button from "../Button";
import "../../styles/animations.css";

const CreateTaskModal = ({ isOpen, onClose, onCreateTask }) => {
  const [formData, setFormData] = useState({
    name: "",
    status: "todo",
    contents: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Task name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Task name must be at least 3 characters";
    }

    if (!formData.contents.trim()) {
      newErrors.contents = "Task contents are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const taskData = {
        name: formData.name.trim(),
        status: formData.status.trim(),
        contents: formData.contents.trim(),
      };

      await onCreateTask(taskData.name, taskData.status, taskData.contents);

      // Reset on success
      setFormData({ name: "", status: "todo", contents: "" });
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
      setErrors({
        submit: error.message || "Something went wrong. Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ name: "", status: "todo", contents: "" });
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
      <div className="modal-animation relative w-full max-w-md bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <ListTodo className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Create New Task
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fill in task details
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

        {/* Form */}
        <div className="p-6">
          <div className="space-y-2">
            {/* Task Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Task Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInfoChange}
                placeholder="Enter task name"
                maxLength={100}
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-transparent"
                }`}
                disabled={isSubmitting}
              />
              {errors.name && (
                <div className="mt-2 flex items-center text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </div>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInfoChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
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
                placeholder="Enter task contents"
                rows={3}
                maxLength={300}
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all resize-none ${
                  errors.contents
                    ? "border-red-500 dark:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-transparent"
                }`}
                disabled={isSubmitting}
              />
              {errors.contents && (
                <div className="mt-2 flex items-center text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.contents}
                </div>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg">
                <div className="flex items-center text-sm text-red-700 dark:text-red-400">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  {errors.submit}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              buttonType="normal"
              onClick={handleSubmit}
              loading={isSubmitting}
              loadingText="Creating..."
              disabled={!formData.name.trim() || !formData.contents.trim()}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Create Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
