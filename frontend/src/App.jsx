import { useEffect } from "react";
import { useGlobalState } from "./store/GlobalContext.jsx";
import "./styles/App.css";

const reviews = [
  {
    name: "Floyd Miles",
    rating: 3,
    comment: "not that good.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Ronald Richards",
    rating: 5,
    comment: "the best thing i ever had in my life.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Savannah Nguyen",
    rating: 4.5,
    comment: "very good to be honest.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

function App() {
  const { likedComments, inputValues, postReplies } = useGlobalState();

  useEffect(() => {
    // Send reviews to backend
    fetch("http://127.0.0.1:5000/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reviews }), // must be wrapped in { reviews: [...] }
    })
      .then((res) => res.json())
      .then((data) => console.log("Backend response:", data))
      .catch((err) => console.error("Error sending reviews:", err));
  }, []);

  return (
    <div className="container">
      <div className="main-content">
        {/* Product Image at the top */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO9M6esMKQyW8GrIhTUEYUnFekqwyNzquAwg&s"
          alt="Product"
          className="product-image"
        />

        <h1>Chicken Macdo Reviews</h1>

        <div className="grid-container">
          {reviews.map((r, idx) => (
            <div key={idx} className={`grid-item item${idx + 1}`}>
              <img src={r.avatar} alt={r.name} className="avatar" />
              <h3>{r.name}</h3>
              <div className="stars">
                {Array.from({ length: 5 }, (_, i) => {
                  if (i < Math.floor(r.rating)) {
                    return (
                      <svg
                        key={i}
                        className="star"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#f5c518"
                          d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.93
                             1.432 8.293L12 18.896l-7.368 4.633
                             1.432-8.293-6.064-5.93 8.332-1.151z"
                        />
                      </svg>
                    );
                  } else if (i < r.rating) {
                    // half star
                    return (
                      <svg key={i} className="star" viewBox="0 0 24 24">
                        <defs>
                          <linearGradient id={`half-${idx}-${i}`}>
                            <stop offset="50%" stopColor="#f5c518" />
                            <stop offset="50%" stopColor="#ccc" />
                          </linearGradient>
                        </defs>
                        <path
                          fill={`url(#half-${idx}-${i})`}
                          d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.93
                             1.432 8.293L12 18.896l-7.368 4.633
                             1.432-8.293-6.064-5.93 8.332-1.151z"
                        />
                      </svg>
                    );
                  } else {
                    return (
                      <svg
                        key={i}
                        className="star"
                        viewBox="0 0 24 24"
                      >
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
              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
