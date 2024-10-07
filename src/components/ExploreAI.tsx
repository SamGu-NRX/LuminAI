import '@/styles/ExploreAI.scss';
import '@/styles/App.scss';
import PropTypes from 'prop-types';

// Background Component
const Background = () => {
    return <div className="background">{/* Existing SVGs for the background */}</div>;
};
  
  // Activities Component
const Activities = () => {
    return (
      <section className="activities" style={{ transform: 'translateX(25%)' }}>
        {/* Existing activities */}
      </section>
    );
};
  
  // GridItem Component
const GridItem = ({ type, title, description }) => {
    return (
      <div className="custom-grid grid-item" data-type={type}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  };
  
  GridItem.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

const AiTypes = () => {
  const aiTypes = [
    {
        type: 'cnn',
        title: 'Convolutional Neural Networks (CNN)',
        description: 'CNNs are special neural networks great for recognizing patterns in images, like finding faces or objects.',
    }, {
        type: 'fnn',
        title: 'Feedforward Neural Networks (FNN)',
        description: 'FNNs are the simplest type of artificial neural network where connections between the nodes do not form a cycle.',
    }, {
        type: 'llm',
        title: 'Large Language Models (Transformer)',
        description: 'LLMs use transformers to understand and generate human language, making them useful for tasks like translation and answering questions.',
    }, {
        type: 'linear-algebra',
        title: 'Linear Algebra',
        description: 'Linear Algebra is a field of math that helps represent data using vectors and matrices, essential for creating and training neural networks.',
    }, {
        type: 'statistics',
        title: 'Statistics',
        description: 'Statistics involves using probability to understand data, make predictions, and estimate the accuracy of models.',
    }, {
        type: 'knn',
        title: 'K-Nearest Neighbors (KNN)',
        description: 'KNN is a simple method that classifies data points based on how similar they are to their nearest neighbors.',
    }, {
        type: 'bert',
        title: 'Bidirectional Encoder Representations from Transformers (BERT)',
        description: 'BERT is a transformer-based model that reads text both ways (left-to-right and right-to-left) to understand context better.',
    }, {
        type: 'k-means',
        title: 'K-means Clustering',
        description: 'K-means Clustering groups data points into clusters based on their similarities, useful for finding patterns in data.',
    }, {
        type: 'rnn',
        title: 'Recurrent Neural Networks (RNN)',
        description: 'RNNs are designed to recognize patterns in sequences of data, like time series or text, making them great for tasks like language modeling.',
    }, {
        type: 'svm',
        title: 'Support Vector Machines (SVM)',
        description: 'SVMs are models that classify data by finding the best boundary that separates different categories.',
    }, {
        type: 'q-learning',
        title: 'Q-Learning',
        description: 'Q-Learning is a type of reinforcement learning where an agent learns to make decisions by trying different actions and learning from the outcomes.',
    }, {
        type: 'ppo',
        title: 'Proximal Policy Optimization (PPO)',
        description: 'PPO is a reinforcement learning method that improves how an agent learns to make decisions, balancing exploration and exploitation.',
    }, {
        type: 'dt',
        title: 'Decision Trees (DT)',
        description: 'Decision Trees are models that make decisions by splitting data into branches based on feature values, like a flowchart.',
    }, {
        type: 'isolation-forest',
        title: 'Isolation Forest',
        description: 'Isolation Forest is an algorithm for detecting anomalies by isolating data points using random splits, making it easier to identify outliers.',
    }
  ];
      

  return (
    <section className="ai-types">
      <h2>Introduction to AI Types</h2>
      <div className="grid-container">
        {aiTypes.map((aiType, index) => (
          <GridItem key={index} {...aiType} />
        ))}
      </div>
    </section>
  );
};


const ExploreAI = () => {
    return (
        <div className="ExploreAI">
          <Background />
          <Activities />
          <AiTypes />
        </div>
    );
};


export default ExploreAI;
