import { useEffect, useState } from 'react';
import { useGlobalState } from './store/GlobalContext.jsx';
import './styles/App.css';

const reviews = [
  {
    name: 'Floyd Miles',
    rating: 1,
    comment: 'so bad.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Ronald Richards',
    rating: 5,
    comment: 'the best thing i ever had in my life.',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    name: 'Savannah Nguyen',
    rating: 3.5,
    comment: 'not good not bad , neutral.',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

function App() {
  const { likedComments, inputValues, postReplies } = useGlobalState();
  const [reviewResults, setReviewResults] = useState([]);

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
          // Merge sentiments into the reviews array
          const merged = reviews.map((r, idx) => ({
            ...r,
            sentiment: data.results[idx]?.sentiment || 'unknown',
            confidence: data.results[idx]?.confidence || 0,
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

  // function to return color based on sentiment
  const sentimentColor = (sentiment) => {
    if (sentiment === 'positive') return '#73db8bff';
    if (sentiment === 'negative') return '#ed6c6cff';
    if (sentiment === 'neutral') return '#88898aff';
    return 'black'; // fallback
  };

  return (
    <div className="container">
      <div className="main-content">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO9M6esMKQyW8GrIhTUEYUnFekqwyNzquAwg&s"
          alt="Product"
          className="product-image"
        />

        <h1>Chicken Macdo Reviews</h1>

        <div className="grid-container">
          {(reviewResults.length > 0 ? reviewResults : reviews).map(
            (r, idx) => (
              <div
                key={idx}
                className={`grid-item item${idx + 1}`}
                style={{ backgroundColor: sentimentColor(r.sentiment) }}
              >
                <img src={r.avatar} alt={r.name} className="avatar" />
                <h3>{r.name}</h3>
                <div className="stars">
                  {Array.from({ length: 5 }, (_, i) => {
                    if (i < Math.floor(r.rating)) {
                      return (
                        <svg key={i} className="star" viewBox="0 0 24 24">
                          <path
                            fill="#f5c518"
                            d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.93
                             1.432 8.293L12 18.896l-7.368 4.633
                             1.432-8.293-6.064-5.93 8.332-1.151z"
                          />
                        </svg>
                      );
                    } else {
                      return (
                        <svg key={i} className="star" viewBox="0 0 24 24">
                          <path
                            fill="#ccc"
                            d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.93
                             1.432 8.293L12 18.896l-7.368 4.633
                             1.432-8.293-6.064-5.93 8.332-1.151z"
                          />
                        </svg>
                      );
                    }
                  })}
                </div>
                <p>
                  {r.comment}{' '}
                  {r.sentiment &&
                    `(${r.sentiment}, ${r.confidence.toFixed(2)})`}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
