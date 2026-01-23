import React, { createContext, useState, useCallback } from 'react';
import { documentService } from '../services/api';

export const DocumentContext = createContext();

export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await documentService.getAll();
      setDocuments(response.data.data);
      return response.data.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch documents';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createDocument = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await documentService.create(data);
      setDocuments([...documents, response.data.data]);
      return response.data.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create document';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [documents]);

  const updateDocument = useCallback(async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await documentService.update(id, data);
      setDocuments(documents.map(doc => doc.id === id ? response.data.data : doc));
      return response.data.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update document';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [documents]);

  const deleteDocument = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await documentService.delete(id);
      setDocuments(documents.filter(doc => doc.id !== id));
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete document';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [documents]);

  return (
    <DocumentContext.Provider value={{
      documents,
      loading,
      error,
      fetchDocuments,
      createDocument,
      updateDocument,
      deleteDocument
    }}>
      {children}
    </DocumentContext.Provider>
  );
};
