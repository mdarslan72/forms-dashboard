import { useState } from "react";
import { Clock, List } from "lucide-react";
import Header from "./components/Header";
import CreateFolderModal from "./components/CreateFolderModal";
import SearchBar from "./components/SearchBar";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import { mockForms } from "./data";

export interface Form {
  id: string;
  name: string;
  lastUpdated: string;
  updatedBy: string;
}

export default function FormsUI() {
  // Filter and view state
  const [sortByRecent, setSortByRecent] = useState(false);
  const [viewType, setViewType] = useState<"list" | "grid">(() => "list");
  // Search handler for SearchBar
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };
  // Folder and form state
  const [folders, setFolders] = useState<{ name: string; forms: Form[] }[]>([]);
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [forms, setForms] = useState<Form[]>(mockForms);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const formsPerPage = 7;
  const [showCreateFolder, setShowCreateFolder] = useState(false);

  // Filtered forms for current view (root or folder)
  const allFolders = folders.map((f) => f.name);
  const isRoot = !activeFolder;
  const visibleForms = isRoot
    ? forms
    : folders.find((f) => f.name === activeFolder)?.forms || [];
  let filteredForms = visibleForms.filter(
    (form) =>
      form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.updatedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (sortByRecent) {
    filteredForms = [...filteredForms].sort(
      (a, b) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );
  }
  const totalPages = Math.ceil(filteredForms.length / formsPerPage);
  const startIdx = (currentPage - 1) * formsPerPage;
  const endIdx = startIdx + formsPerPage;
  const currentForms = filteredForms.slice(startIdx, endIdx);

  // Folder creation
  const handleCreateFolder = (folderName: string) => {
    if (!folders.some((f) => f.name === folderName)) {
      setFolders([...folders, { name: folderName, forms: [] }]);
    }
    setShowCreateFolder(false);
  };

  // Add form (for demo, just adds a mock form)
  const handleAddForm = () => {
    const newForm: Form = {
      id: Math.random().toString(36).slice(2),
      name: `Untitled Form ${Date.now()}`,
      lastUpdated: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      updatedBy: "You",
    };
    if (isRoot) {
      setForms([newForm, ...forms]);
    } else {
      setFolders(
        folders.map((f) =>
          f.name === activeFolder ? { ...f, forms: [newForm, ...f.forms] } : f
        )
      );
    }
  };

  // Navigation
  const handleOpenFolder = (folderName: string) => {
    setActiveFolder(folderName);
    setSearchTerm("");
    setCurrentPage(1);
  };
  const handleBackToRoot = () => {
    setActiveFolder(null);
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        onCreateFolder={() => setShowCreateFolder(true)}
        onAddForm={handleAddForm}
      />
      <CreateFolderModal
        open={showCreateFolder}
        onClose={() => setShowCreateFolder(false)}
        onConfirm={handleCreateFolder}
      />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Navigation */}
        <div className="mb-6">
          <nav className="text-sm text-gray-600 flex items-center space-x-2">
            <span className="cursor-pointer" onClick={handleBackToRoot}>
              Home
            </span>
            {activeFolder && (
              <>
                <span>/</span>
                <span className="text-blue-600 font-medium">
                  {activeFolder}
                </span>
              </>
            )}
          </nav>
        </div>
        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button
              className={`p-2 border rounded-lg ${
                sortByRecent
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
              title="Sort by Last Updated"
              onClick={() => setSortByRecent((s) => !s)}
            >
              <Clock
                className={`w-5 h-5 ${
                  sortByRecent ? "text-blue-600" : "text-gray-500"
                }`}
              />
            </button>
            <button
              className={`p-2 border rounded-lg ${
                viewType === "list"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
              title="Toggle List/Grid View"
              onClick={() =>
                setViewType((v) => (v === "list" ? "grid" : "list"))
              }
            >
              <List
                className={`w-5 h-5 ${
                  viewType === "list" ? "text-blue-600" : "text-gray-500"
                }`}
              />
            </button>
          </div>
          <SearchBar
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for forms"
          />
        </div>
        {/* Folders List (only in root) */}
        {isRoot && allFolders.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
              <div className="col-span-5">Folder Name</div>
              <div className="col-span-3">Forms</div>
              <div className="col-span-4"></div>
            </div>
            <div className="divide-y divide-gray-200">
              {folders.map((folder) => (
                <div
                  key={folder.name}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleOpenFolder(folder.name)}
                >
                  <div className="col-span-5 font-medium text-blue-700 flex items-center">
                    <span className="mr-2">📁</span> {folder.name}
                  </div>
                  <div className="col-span-3 text-gray-600">
                    {folder.forms.length}
                  </div>
                  <div className="col-span-4"></div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Forms Table or Grid */}
        {currentForms.length > 0 ? (
          viewType === "list" ? (
            <Table forms={currentForms} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentForms.map((form) => (
                <div
                  key={form.id}
                  className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      {form.name}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      Last Updated: {form.lastUpdated}
                    </div>
                    <div className="text-xs text-gray-400">
                      Updated By: {form.updatedBy}
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      className="p-1 hover:bg-gray-100 rounded text-gray-400"
                      title="More options"
                    >
                      <span style={{ fontSize: "1.2em" }}>⋮</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 px-6 py-12 text-center">
            <span className="text-gray-500">
              {isRoot && allFolders.length === 0
                ? "No forms found. Start by creating a form or folder."
                : "Start by creating a form"}
            </span>
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleAddForm}
              >
                + Add Form
              </button>
            </div>
          </div>
        )}
        {/* Pagination Controls */}
        {filteredForms.length > formsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
}
