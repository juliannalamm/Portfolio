import React, { useState } from 'react';

const ImageModal = ({ src, alt, onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
      onClick={onClose}
    >
      <img src={src} alt={alt} className="max-w-3xl max-h-full" />
    </div>
  );
};

const ClickableImage = ({ src, alt, className }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={className}
        onClick={() => setModalOpen(true)}
        style={{ cursor: 'pointer' }}
      />
      {modalOpen && (
        <ImageModal src={src} alt={alt} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
};

export default ClickableImage;
