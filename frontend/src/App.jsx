import { useEffect, useState } from 'react';
import './styles/App.css';
import { fetchComments } from './services/postService';
import Sidebar from './components/Sidebar';
import HighlightedPosts from './components/HighlightedPosts';

function App() {
  const [comments, setComments] = useState([]);
  const [sentiments, setSentiments] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchComments();
      const firstTen = data.slice(0, 10);

      setComments(firstTen);

      const Sentiments = data.map(({ label }, index) => ({
        id: index + 1,
        sentiment: label,
      }));
      setSentiments(Sentiments);
    };
    getData();
  }, []);

  useEffect(() => {

    console.log('Comments updated:', comments);
  }, [comments]);

  return (
    <div className="container">
      <main className="main-content">
        <h1>Comment Sentiment Dashboard</h1>

        {comments.length === 0 ? (
          <p>Loading comments...</p>
        ) : (
          <>
            <HighlightedPosts comments={comments} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
