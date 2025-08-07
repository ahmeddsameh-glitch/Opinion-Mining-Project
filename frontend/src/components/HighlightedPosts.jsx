    import { useState } from 'react';
    import coffeeMakerImg from '../images/coffeeMaker.jpeg';
    import '../styles/HighlightedPosts.css';
    import '../styles/comments.css';

    export default function HighlightedPosts({ comments }) {
    const [likedComments, setLikedComments] = useState({});
    const [inputValues, setInputValues] = useState({}); // To store reply input per post
    const [postReplies, setPostReplies] = useState({}); // To store replies per post (by idx)

    const toggleLike = (idx) => {
        setLikedComments((prev) => ({
        ...prev,
        [idx]: !prev[idx],
        }));
    };

    // Handle reply textarea change
    const handleInputChange = (idx, value) => {
        setInputValues((prev) => ({
        ...prev,
        [idx]: value,
        }));
    };

    // Handle submit reply for a post
    const handleSubmitComment = (idx) => {
        const reply = inputValues[idx]?.trim();
        if (!reply) return; // Don't submit empty replies

        setPostReplies((prev) => ({
        ...prev,
        [idx]: prev[idx] ? [...prev[idx], reply] : [reply],
        }));

        setInputValues((prev) => ({
        ...prev,
        [idx]: '', // Clear textarea after submit
        }));
    };

    const customPost = {
        id: 'custom-0',
        user: 'Dr Ramakrishna',
        text: 'What do you think of this coffee maker?',
        image: coffeeMakerImg,
        label: 'neutral',
    };

   
    const postsToRender = [customPost, ...comments];

    return (
        <div className="big-container"> 
        <div className="container">
        {postsToRender.map((post, idx) => {
            const sentiment = post.label.toLowerCase();

            const bgColor =
            sentiment === 'positive'
                ? '#e6f4ea'
                : sentiment === 'negative'
                ? '#fdecea'
                : '#f0f2f5';

            // Replies for this post idx (empty array if none)
            const postCommentsForIdx = postReplies[idx] || [];

            if (post.id === 'custom-0') {
            return (
                <article
                key={post.id}
                className="fb-post"
                style={{ backgroundColor: bgColor }}
                >
                <header className="fb-post-header">
                    <div className="avatar custom">R</div>
                    <div className="username">{post.user}</div>
                </header>

                <p className="post-text">{post.text}</p>

                <div className="post-image-container">
                    <img src={post.image} alt="Coffee Maker" />
                </div>

                <button
                    onClick={() => toggleLike(idx)}
                    className={`like-button ${likedComments[idx] ? 'liked' : ''}`}
                    aria-pressed={likedComments[idx] ? 'true' : 'false'}
                >
                    {likedComments[idx] ? '👍 Liked' : '👍 Like'}
                </button>

                {/* Replies section */}
                {postCommentsForIdx.length > 0 && (
                    <div className="comments-container">
                    <strong>Replies:</strong>
                    <ul>
                        {postCommentsForIdx.map((c, i) => (
                        <li key={i}>{c}</li>
                        ))}
                    </ul>
                    </div>
                )}

                {/* Reply textarea and button */}
                <textarea
                    className="reply-textarea"
                    rows="2"
                    value={inputValues[idx] || ''}
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                    placeholder="Write a reply..."
                />

                <button
                    onClick={() => handleSubmitComment(idx)}
                    className="reply-submit-btn"
                >
                    Submit Reply
                </button>
                </article>
            );
            }

            // Normal comment posts
            return (
            <article
                key={idx}
                className="fb-post"
                style={{ backgroundColor: bgColor }}
            >
                <header className="fb-post-header">
                <div className="avatar comment">{post.text.charAt(0).toUpperCase()}</div>
                <div
                    className={`sentiment-label ${
                    sentiment === 'positive'
                        ? 'sentiment-positive'
                        : sentiment === 'negative'
                        ? 'sentiment-negative'
                        : 'sentiment-neutral'
                    }`}
                >
                    Sentiment: {post.label}
                </div>
                </header>

                <p className="post-text">{post.text}</p>

                <div className="tokens">Tokens: {post.tokenized.join(', ')}</div>

                <button
                onClick={() => toggleLike(idx)}
                className={`like-button ${likedComments[idx] ? 'liked' : ''}`}
                aria-pressed={likedComments[idx] ? 'true' : 'false'}
                >
                {likedComments[idx] ? '👍 Liked' : '👍 Like'}
                </button>

                {/* Replies section */}
                {postCommentsForIdx.length > 0 && (
                <div className="comments-container">
                    <strong>Replies:</strong>
                    <ul>
                    {postCommentsForIdx.map((c, i) => (
                        <li key={i}>{c}</li>
                    ))}
                    </ul>
                </div>
                )}

                {/* Reply textarea and button */}
                <textarea
                className="reply-textarea"
                rows="2"
                value={inputValues[idx] || ''}
                onChange={(e) => handleInputChange(idx, e.target.value)}
                placeholder="Write a reply..."
                />

                <button
                onClick={() => handleSubmitComment(idx)}
                className="reply-submit-btn"
                >
                Submit Reply
                </button>
            </article>
            );
        })}
        </div>
        </div>
    );
    }
