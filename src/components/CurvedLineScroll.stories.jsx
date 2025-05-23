// CurvedLineScroll.stories.jsx
import React from 'react';
import CurvedLineScroll from './CurvedLineScroll';

export default {
  title: 'Resume/CurvedLineScroll',
  component: CurvedLineScroll,
};

export const Default = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#f9fafb', // match bg-gray-50
    padding: '1rem',
  }}>
    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#800020', marginBottom: '1rem' }}>
      My Resume
    </h1>
    <div style={{ width: '100%', maxWidth: '1024px' }}> {/* max-w-4xl */}
      <CurvedLineScroll />
    </div>
  </div>
);
