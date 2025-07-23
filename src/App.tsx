import { useState } from "react";
import {
  Search,
  Clock,
  List,
  MoreVertical,
  Plus,
  FolderPlus,
} from "lucide-react";

import { mockForms } from "./data"; //importing from data.ts

export interface Form {
  id: string;
  name: string;
  lastUpdated: string;
  updatedBy: string;
}

export default function FormsUI() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const formsPerPage = 7;
  const [filteredForms, setFilteredForms] = useState<Form[]>(mockForms);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on search
    const filtered = mockForms.filter(
      (form) =>
        form.name.toLowerCase().includes(value.toLowerCase()) ||
        form.updatedBy.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredForms(filtered);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredForms.length / formsPerPage);
  const startIdx = (currentPage - 1) * formsPerPage;
  const endIdx = startIdx + formsPerPage;
  const currentForms = filteredForms.slice(startIdx, endIdx);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <FolderPlus className="w-4 h-4 mr-2" />
                Create folder
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Form
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Navigation */}
        <div className="mb-6">
          <nav className="text-sm text-gray-600">Home</nav>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Clock className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <List className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for forms"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Forms Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
            <div className="col-span-5">Name</div>
            <div className="col-span-3">Last Updated</div>
            <div className="col-span-3">Updated By</div>
            <div className="col-span-1"></div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-200">
            {currentForms.map((form) => (
              <div
                key={form.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer"
              >
                <div className="col-span-5">
                  <span className="text-gray-900 font-medium">{form.name}</span>
                </div>
                <div className="col-span-3">
                  <span className="text-gray-600">{form.lastUpdated}</span>
                </div>
                <div className="col-span-3">
                  <span className="text-gray-600">{form.updatedBy}</span>
                </div>
                <div className="col-span-1 flex justify-end">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredForms.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">
                No forms found matching your search.
              </p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {filteredForms.length > formsPerPage && (
          <div className="flex justify-end mt-4 space-x-2">
            <button
              className={`px-3 py-1 rounded border ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-3 py-1 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`px-3 py-1 rounded border ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
