import { useState } from "react";

interface CreateFolderModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (folderName: string) => void;
}

export default function CreateFolderModal({
  open,
  onClose,
  onConfirm,
}: CreateFolderModalProps) {
  const [folderName, setFolderName] = useState("");
  const [touched, setTouched] = useState(false);

  const handleConfirm = () => {
    if (folderName.trim()) {
      onConfirm(folderName.trim());
      setFolderName("");
      setTouched(false);
    } else {
      setTouched(true);
    }
  };

  const handleClose = () => {
    setFolderName("");
    setTouched(false);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(2px)",
      }}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={handleClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex flex-col items-center mb-4">
          <div className="bg-blue-100 rounded-full p-3 mb-2">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path
                fill="#2563eb"
                d="M10.414 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8.414A2 2 0 0 0 21.414 7l-4.414-4.414A2 2 0 0 0 15.586 2H12a2 2 0 0 0-1.414.586zM12 4h3.586L20 8.414V18H4V6h6V4z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-1">Create folder</h2>
          <p className="text-gray-500 text-sm">
            Folder will help to organize forms
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Folder name <span className="text-red-500">*</span>
          </label>
          <input
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              touched && !folderName.trim()
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            onBlur={() => setTouched(true)}
            autoFocus
          />
          {touched && !folderName.trim() && (
            <div className="text-red-500 text-xs mt-1">
              Folder name is required
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
