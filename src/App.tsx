import { useState } from "react";
import { Clock, List } from "lucide-react";
import Header from "./components/Header";
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
      <Header />
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
          <SearchBar
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for forms"
          />
        </div>
        {/* Forms Table */}
        {currentForms.length > 0 ? (
          <Table forms={currentForms} />
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 px-6 py-12 text-center">
            <span className="text-gray-500">
              No forms found matching your search.
            </span>
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
