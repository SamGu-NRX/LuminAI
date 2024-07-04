import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <h1>Authenticating</h1>
      <div className="loading-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default Loading;
