import { useEffect, useState } from 'react';
import { useGlobalState } from './store/GlobalContext.jsx';
import './styles/App.css';

const reviews = [
  {
    name: 'Floyd Miles',
    rating: 1,
    comment: 'Absolutely terrible. Never ordering again.',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
  },
  {
    name: 'Ronald Richards',
    rating: 3,
    comment: 'It was fine. Not great, not awful.',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
  {
    name: 'Elena Max',
    rating: 5,
    comment: 'the best thing i ever had in my life.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'John Doe',
    rating: 4,
    comment: 'Pretty good, enjoyed it.',
    avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
  },
  {
    name: 'Jane Smith',
    rating: 2,
    comment: 'Not what I expected.',
    avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
  },
];

function App() {
  const { likedComments, inputValues, postReplies } = useGlobalState();
  const [reviewResults, setReviewResults] = useState([]);
  const [currentBatch, setCurrentBatch] = useState(0);

  const BATCH_SIZE = 3;

  useEffect(() => {
    async function fetchSentiments() {
      try {
        const res = await fetch('http://127.0.0.1:5000/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reviews }),
        });

        const data = await res.json();

        if (res.ok) {
          const merged = reviews.map((r, idx) => ({
            ...r,
            sentiment: data.results[idx] || 'unknown',
          }));
          setReviewResults(merged);
        } else {
          console.error('Backend error:', data);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    }

    fetchSentiments();
  }, []);

  const sentimentColor = (sentiment) => {
    if (sentiment === 'positive') return '#10b981';
    if (sentiment === 'negative') return '#ef4444';
    if (sentiment === 'neutral') return '#6b7280';
    return '#d1d5db'; // fallback gray
  };

  const nextBatch = () => {
    if ((currentBatch + 1) * BATCH_SIZE < reviewResults.length) {
      setCurrentBatch(currentBatch + 1);
    }
  };

  const prevBatch = () => {
    if (currentBatch > 0) {
      setCurrentBatch(currentBatch - 1);
    }
  };

  const start = currentBatch * BATCH_SIZE;
  const end = start + BATCH_SIZE;
  const visibleReviews = reviewResults.slice(start, end);

  return (
    <div className="container">
      <div className="main-content">
        <button className="prev" onClick={prevBatch}>
          ⏮ Prev
        </button>
        <button className="next" onClick={nextBatch}>
          Next ⏭
        </button>

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO9M6esMKQyW8GrIhTUEYUnFekqwyNzquAwg&s"
          alt="Product"
          className="product-image"
        />

        <h1>Chicken Macdo Reviews</h1>

        <div className="grid-container">
          {visibleReviews.map((r, idx) => (
            <div
              key={idx}
              className="grid-item"
              style={{ backgroundColor: sentimentColor(r.sentiment) }}
            >
              <img src={r.avatar} alt={r.name} className="avatar" />
              <h3>{r.name}</h3>
              <div className="stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg key={i} className="star" viewBox="0 0 24 24">
                    <path
                      fill={i < Math.floor(r.rating) ? '#f5c518' : '#ccc'}
                      d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.93
                 1.432 8.293L12 18.896l-7.368 4.633
                 1.432-8.293-6.064-5.93 8.332-1.151z"
                    />
                  </svg>
                ))}
              </div>
              <p>
                {r.comment} ({r.sentiment})
              </p>
            </div>
          ))}

          {/* Add one "Add Review" card if batch < 3 */}
          {visibleReviews.length < BATCH_SIZE && (
            <div className="grid-item add-review">
              <h3>Add Review</h3>
              <p>Be the first to share your thoughts!</p>
              <button className="add-btn">+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
