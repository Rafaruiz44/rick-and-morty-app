import React from 'react';

const Loader = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <div style={{
        border: '6px solid #f3f3f3',
        borderRadius: '50%',
        borderTop: '6px solid #3498db',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite',
      }} />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
