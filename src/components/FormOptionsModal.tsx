import React, { useRef, useEffect } from 'react';
import {
  Pencil, // For Edit
  Eye, // For Preview (assuming a general eye icon for view)
  ClipboardList, // For View Submission (assuming a clipboard/list icon)
  Copy, // For Duplicate
  Share2, // For Share
  FolderOpen, // For Move to Folder (assuming an open folder icon)
  Trash2, // For Delete
} from 'lucide-react';

interface FormOptionsModalProps {
  position: { x: number; y: number } | null;
  onClose: () => void;
  onEdit: () => void;
  onPreview: () => void;
  onViewSubmission: () => void;
  onDuplicate: () => void;
  onShare: () => void;
  onMoveToFolder: () => void;
  onDelete: () => void;
}

export default function FormOptionsModal({
  position,
  onClose,
  onEdit,
  onPreview,
  onViewSubmission,
  onDuplicate,
  onShare,
  onMoveToFolder,
  onDelete,
}: FormOptionsModalProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    // Bind the event listener
    if (position) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [position, onClose]);

  if (!position) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute bg-white rounded-xl shadow-xl w-48 p-2 z-50" // Increased width for more options
      style={{
        top: position.y,
        left: position.x,
        transform: 'translate(-100%, 0)', // Adjust to appear to the left of the click
      }}
    >
      <div className="flex flex-col space-y-1">
        {/* Edit Option */}
        <button
          className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 w-full text-left"
          onClick={() => { onEdit(); onClose(); }}
        >
          <Pencil className="w-4 h-4 mr-2" />
          <span className="font-medium text-sm">Edit</span>
        </button>

        {/* Preview Option */}
        <button
          className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 w-full text-left"
          onClick={() => { onPreview(); onClose(); }}
        >
          <Eye className="w-4 h-4 mr-2" />
          <span className="font-medium text-sm">Preview</span>
        </button>

        {/* View Submission Option */}
        <button
          className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 w-full text-left"
          onClick={() => { onViewSubmission(); onClose(); }}
        >
          <ClipboardList className="w-4 h-4 mr-2" />
          <span className="font-medium text-sm">View Submission</span>
        </button>

        {/* Duplicate Option */}
        <button
          className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 w-full text-left"
          onClick={() => { onDuplicate(); onClose(); }}
        >
          <Copy className="w-4 h-4 mr-2" />
          <span className="font-medium text-sm">Duplicate</span>
        </button>

        {/* Share Option */}
        <button
          className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 w-full text-left"
          onClick={() => { onShare(); onClose(); }}
        >
          <Share2 className="w-4 h-4 mr-2" />
          <span className="font-medium text-sm">Share</span>
        </button>

        {/* Move to Folder Option */}
        <button
          className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 w-full text-left"
          onClick={() => { onMoveToFolder(); onClose(); }}
        >
          <FolderOpen className="w-4 h-4 mr-2" />
          <span className="font-medium text-sm">Move to Folder</span>
        </button>

        {/* Delete Option */}
        <button
          className="flex items-center px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
          onClick={() => { onDelete(); onClose(); }}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          <span className="font-medium text-sm">Delete</span>
        </button>
      </div>
    </div>
  );
}