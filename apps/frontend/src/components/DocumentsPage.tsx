import React, { useState } from 'react';
import { FileText, Upload, Download, Eye, Trash2, Plus, Search, Filter } from 'lucide-react';
import { useAppSelector } from '../store/hooks';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  category: 'contract' | 'legal' | 'personal' | 'other';
}

const DocumentsPage: React.FC = () => {
  const { profile } = useAppSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Mock documents data - in real app, this would come from API
  const mockDocuments: Document[] = [
    {
      id: '1',
      name: 'Employment Contract.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: '2025-09-10',
      category: 'contract'
    },
    {
      id: '2',
      name: 'Property Agreement.docx',
      type: 'DOCX',
      size: '1.8 MB',
      uploadDate: '2025-09-08',
      category: 'legal'
    },
    {
      id: '3',
      name: 'Legal Consultation Notes.pdf',
      type: 'PDF',
      size: '856 KB',
      uploadDate: '2025-09-05',
      category: 'legal'
    },
    {
      id: '4',
      name: 'Personal Documents.zip',
      type: 'ZIP',
      size: '5.2 MB',
      uploadDate: '2025-09-01',
      category: 'personal'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Documents' },
    { value: 'contract', label: 'Contracts' },
    { value: 'legal', label: 'Legal Documents' },
    { value: 'personal', label: 'Personal' },
    { value: 'other', label: 'Other' }
  ];

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'contract': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'legal': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'personal': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Document Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your legal documents and files
            </p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={16} />
            Upload Document
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocuments.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {doc.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {doc.type} • {doc.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Eye size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Download size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Trash2 size={16} className="text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(doc.category)}`}>
                  {categories.find(c => c.value === doc.category)?.label}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(doc.uploadDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No documents found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm || filterCategory !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Upload your first document to get started.'
            }
          </p>
          {!searchTerm && filterCategory === 'all' && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Upload Document
            </button>
          )}
        </div>
      )}

      {/* Upload Modal Placeholder */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Upload Document
            </h3>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Drag and drop files here, or click to select
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Choose Files
              </button>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;
