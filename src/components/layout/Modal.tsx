// components/Modal.jsx
import { useState } from 'react';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-primary/90 p-8 rounded-lg max-w-md w-full mx-4 border border-white/10 backdrop-blur-md animate-[fadeIn_0.3s_ease-in]">
        <button 
          onClick={onClose}
          className="float-right text-white/70 hover:text-accent transition-colors"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}