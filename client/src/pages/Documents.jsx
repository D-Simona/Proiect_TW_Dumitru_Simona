import React, { useState, useContext, useEffect } from 'react';
import { DocumentContext } from '../context/DocumentContext';
import DocumentList from '../components/DocumentList';
import DocumentForm from '../components/DocumentForm';
import '../styles/Documents.css';

export default function Documents() {
  const { documents, fetchDocuments, createDocument, loading, error } = useContext(DocumentContext);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleCreate = async (data) => {
    try {
      await createDocument(data);
      setShowForm(false);
    } catch (err) {
      console.error('Create error:', err);
    }
  };

  const filteredDocuments = filter === 'all' 
    ? documents 
    : documents.filter(doc => doc.classification === filter);

  return (
    <div className="documents-container">
      <div className="documents-header">
        <h1>Document Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : 'Add Document'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="form-section">
          <DocumentForm onSubmit={handleCreate} />
        </div>
      )}

      <div className="filter-section">
        <label>Filter by Classification:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="public">Public</option>
          <option value="internal">Internal</option>
          <option value="confidential">Confidential</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredDocuments.length === 0 ? (
        <p className="no-documents">No documents found</p>
      ) : (
        <DocumentList documents={filteredDocuments} />
      )}
    </div>
  );
}
