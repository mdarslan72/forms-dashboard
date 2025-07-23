import { MoreVertical } from "lucide-react";
import type { Form } from "../App";

interface TableProps {
  forms: Form[];
}

export default function Table({ forms }: TableProps) {
  return (
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
        {forms.map((form) => (
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
    </div>
  );
}
