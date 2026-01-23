import React, { useState } from 'react';
import '../styles/DocumentForm.css';

export default function DocumentForm({ onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    classification: initialData?.classification || 'internal',
    count: initialData?.count || 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'count' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.category) {
      onSubmit(formData);
      setFormData({
        name: '',
        category: '',
        classification: 'internal',
        count: 1
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="document-form">
      <div className="form-group">
        <label>Document Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          placeholder="e.g., Invoice, Report, Contract"
        />
      </div>

      <div className="form-group">
        <label>Classification</label>
        <select
          name="classification"
          value={formData.classification}
          onChange={handleChange}
        >
          <option value="public">Public</option>
          <option value="internal">Internal</option>
          <option value="confidential">Confidential</option>
        </select>
      </div>

      <div className="form-group">
        <label>Count</label>
        <input
          type="number"
          name="count"
          value={formData.count}
          onChange={handleChange}
          min="1"
        />
      </div>

      <button type="submit" className="btn-submit">
        {initialData ? 'Update' : 'Create'} Document
      </button>
    </form>
  );
}
