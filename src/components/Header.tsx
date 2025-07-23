import { FolderPlus, Plus } from "lucide-react";

interface HeaderProps {
  onAddForm?: () => void;
  onCreateFolder?: () => void;
}

export default function Header({ onAddForm, onCreateFolder }: HeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Forms</h1>
            <p className="text-gray-600 mt-1">
              Create, manage, and organise forms effortlessly to capture lead
              info and engage users, all without coding
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <span className="mr-2">🤖</span>
              Form Features
            </button>
            <button
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={onCreateFolder}
            >
              <FolderPlus className="w-4 h-4 mr-2" />
              Create folder
            </button>
            <button
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={onAddForm}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
