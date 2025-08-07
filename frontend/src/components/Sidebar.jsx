function Sidebar({ sentiments }) {
  return (
    <aside className="sidebar">
      <h2>Comments Sentiment</h2>
      <ul>
        {sentiments.map(({ id, sentiment }) => (
          <li key={id}>
            Comment #{id}: {sentiment === 'positive' ? '😊 Positive' : '😡 Negative'}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
