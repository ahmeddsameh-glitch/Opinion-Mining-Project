import { useEffect, useState } from 'react';
import './styles/App.css';
import { fetchComments } from './services/postService';
import Sidebar from './components/Sidebar';

function App() {
  const [comments, setComments] = useState([]);
  const [sentiments, setSentiments] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchComments();
      setComments(data);
      console.log(comments);
      const mockSentiments = data.map(({ label }, index) => ({
        id: index + 1,
        sentiment: label,
      }));
      setSentiments(mockSentiments);
    };
    getData();
  }, []);
  useEffect(() => {
    console.log(comments);
  }, [comments]);
  return (
    <div className="container">
      <main className="main-content">
        <h1>Comment Sentiment Dashboard</h1>

        {comments.length === 0 ? (
          <p>Loading comments...</p>
        ) : (
          <ul className="comment-list">
            {comments.map((comment, idx) => (
              <li key={idx} className="comment">
                <div className="comment-text">{comment.text}</div>
                <div className="comment-label">Sentiment: {comment.label}</div>
                <div className="comment-tokenized">
                  Tokens: {comment.tokenized.join(', ')}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Sidebar sentiments={sentiments} />
    </div>
  );
}

export default App;
