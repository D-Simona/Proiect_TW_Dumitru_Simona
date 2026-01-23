import React, { useState, useContext } from 'react';
import DocumentForm from './DocumentForm';
import { DocumentContext } from '../context/DocumentContext';
import '../styles/DocumentList.css';

export default function DocumentList({ documents }) {
  const [editingId, setEditingId] = useState(null);
  const { updateDocument, deleteDocument } = useContext(DocumentContext);

  const handleUpdate = async (data) => {
    try {
      await updateDocument(editingId, data);
      setEditingId(null);
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDocument(id);
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  return (
    <div className="documents-list">
      {documents.map((doc) => (
        <div key={doc.id} className="document-card">
          {editingId === doc.id ? (
            <DocumentForm 
              initialData={doc}
              onSubmit={handleUpdate}
            />
          ) : (
            <>
              <div className="document-info">
                <h3>{doc.name}</h3>
                <p><strong>Category:</strong> {doc.category}</p>
                <p><strong>Classification:</strong> 
                  <span className={`classification ${doc.classification}`}>
                    {doc.classification}
                  </span>
                </p>
                <p><strong>Count:</strong> {doc.count}</p>
                <p className="created-at">Created: {new Date(doc.created_at).toLocaleDateString()}</p>
              </div>
              <div className="document-actions">
                <button 
                  onClick={() => setEditingId(doc.id)} 
                  className="btn-edit"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(doc.id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
