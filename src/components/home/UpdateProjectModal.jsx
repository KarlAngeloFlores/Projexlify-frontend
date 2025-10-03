import { X, FolderUp, CheckCircle, AlertCircle, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../Button";
import '../../styles/animations.css';

const UpdateProjectModal = ({ isOpen, onClose, onUpdateProject, project }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    newStatus: "",
    remark: "",
  });

  useEffect(() => {
    if (isOpen && project) {
      setFormData({
        name: project.name || "",
        description: project.description || "",
        newStatus: project.status || "",
        remark: "",
      });
    }
  }, [project, isOpen]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInfoChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ name: "", description: "", newStatus: "", remark: "" });
      setErrors({});
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    try {
      await onUpdateProject(
        project.id,
        formData.name,
        formData.description,
        formData.newStatus,
        formData.remark
      );
      handleClose();
    } catch (error) {
      console.error("Error updating project:", error);
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/**Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/**Modal */}
      <div className="modal-animation relative w-full max-w-md bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl transform transition-all">
        {/**Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <FolderUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Update Your Project
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Change status and details of your project
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

        {/**Form Content */}
        <div className="p-6">
          <div className="space-y-2">
            {/* Project Name */}

            <div className="flex w-full gap-4">
              {/* Project Name */}
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInfoChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter project name"
                  maxLength={100}
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  disabled={isSubmitting}
                />
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-500 text-right">
                  {formData.name.length}/100
                </div>
              </div>

              {/* Project Status */}
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Status *
                </label>
                <select
                  name="newStatus"
                  value={formData.newStatus}
                  onChange={handleInfoChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                >
                  <option value="planned">Planned</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInfoChange}
                placeholder="Describe your project goals and objectives"
                rows={3}
                maxLength={250}
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
                disabled={isSubmitting}
              />
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-500 text-right">
                {formData.description.length}/250
              </div>
            </div>

            {/* Update remarks */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Remarks
              </label>
              <textarea
                name="remark"
                value={formData.remark}
                onChange={handleInfoChange}
                placeholder="Describe your changes in the project"
                rows={2}
                maxLength={200}
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
                disabled={isSubmitting}
              />
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-500 text-right">
                {formData.remark.length}/200
              </div>
            </div>
            {errors.submit && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg">
                <div className="flex items-center text-sm text-red-700 dark:text-red-400">
                  <CircleX size={18} className="mr-2 flex-shrink-0" />
                  {errors.submit}
                </div>
              </div>
            )}

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
                type="button"
                onClick={handleSubmit}
                disabled={
                  isSubmitting ||
                  !formData.name.trim() ||
                  !formData.description.trim()
                }
              >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Updating...' : 'Update Project'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProjectModal;