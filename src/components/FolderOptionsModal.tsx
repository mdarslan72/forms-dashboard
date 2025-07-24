import React, { useEffect, useRef } from 'react'; // Import useRef
import { Pencil, Trash2 } from 'lucide-react';

interface FolderOptionsModalProps {
  position: { x: number; y: number } | null;
  onClose: () => void;
  onRename: () => void;
  onDelete: () => void;
}

export default function FolderOptionsModal({
  position,
  onClose,
  onRename,
  onDelete,
}: FolderOptionsModalProps) {
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
      className="absolute bg-white rounded-xl shadow-xl w-full max-w-xs p-2 z-50"
      style={{
        top: position.y,
        left: position.x,
        transform: 'translate(-100%, 0)', // Adjust to appear to the left of the click
      }}
    >
      <div className="flex flex-col space-y-1">
        {/* Rename Folder Option */}
        <button
          className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          onClick={() => {
            onRename();
            onClose(); // Close this dropdown after selecting rename
          }}
        >
          <Pencil className="w-4 h-4 mr-2 text-blue-500" />
          <span className="font-medium text-sm">Rename Folder</span>
        </button>

        {/* Delete Folder Option */}
        <button
          className="flex items-center px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
          onClick={() => {
            onDelete();
            onClose(); // Close this dropdown after selecting delete
          }}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          <span className="font-medium text-sm">Delete Folder</span>
        </button>
      </div>
    </div>
  );
}