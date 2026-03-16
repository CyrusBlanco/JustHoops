import { useState } from 'react';
import Modal from './components/Modal';

function TestModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <button 
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-orange-500 text-white rounded-lg"
      >
        Test Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Test Modal"
      >
        <p className="text-white">If you see this, Modal works! ✅</p>
      </Modal>
    </div>
  );
}

export default TestModal;