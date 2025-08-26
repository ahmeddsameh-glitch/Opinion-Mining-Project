// src/components/Modal.jsx
import React from 'react';
import '../styles/App.css'; // optional extra styles if you want to keep it separate

export default function Modal({ newReview, setNewReview, onSave, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-bar">
        <h2>Add Review</h2>
        <input
          type="text"
          placeholder="Name"
          value={newReview.name}
          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          value={newReview.rating}
          onChange={(e) =>
            setNewReview({ ...newReview, rating: Number(e.target.value) })
          }
        />
        <textarea
          placeholder="Comment"
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Avatar URL"
          value={newReview.avatar}
          onChange={(e) =>
            setNewReview({ ...newReview, avatar: e.target.value })
          }
        />

        <div className="modal-actions">
          <button onClick={onSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
