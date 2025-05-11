import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [name, setName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [showSurp, setShowSurp] = useState(false); 
  const [selectedOps, setSelectedOps] = useState([]);

  const questions = [
    {
      text: "What is your major",
      type: "single",
      options: ["Business", "ComputerScience", "Education", "Law", "Psychology(fuck you i want that)", "Other..."],
    },
    {
      text: "Do you read fanfics Or real books?",
      type: "single",
      options: ["Fanfics", "Books", "Both", "other.."],
    },
    {
      text: "What is your favorite genre? (multi selection allowed)",
      type: "multi",
      options: ["Romance", "Comedy", "Horror", "Thriller", "Angst", "a/b/o"],
    },
  ];

  if (currentQuestion === -1) {
    return (
      <div className="name-input-container">
        <h1>Welcome to malie's quiz :3 I hope you enjoy it ♥ </h1>
        <p>Enter your name first!!</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name..."
          className="name-input"
        />
        <button
          onClick={() => name.trim() && setCurrentQuestion(0)}
          className="start-button"
          disabled={!name.trim()}
        >
          Start Quiz!!
        </button>
      </div>
    );
  }

  if (showSurp) {
  const isDio = name.toLowerCase() === "dio";
  return (
    <div className={`surprise-screen ${isDio ? "dio-blessed" : ""}`}>
      {isDio ? (
        <>
          <img 
            src={process.env.PUBLIC_URL + "/tendio.jpeg"} 
            alt="Blessing"
            className="blessed-image"
          />
          <h1 className="gold-text">
            You are Blessed with eternal Happiness, Love and joy. 
            <br />May ten remain forever Your soulmate, And may Johnny remain forever far away from him ♥ 
          </h1>
          <p className="surprise-subtext">
            The universe smiles upon you     
          </p>
          <div className="bunny">🐇</div>
        </>
      ) : (
        <>
          <h1>{name.toUpperCase()}, You are cursed with eternal misery, doom and restlessness</h1>
          <h2>May jeno haunt your Dreams EVERY night.</h2>
          <p className="surprise-subtext">
            You're forever cursed
          </p>
        </>
      )}
    </div>
  );
}
  const handleAnswer = (answer) => {
    if (questions[currentQuestion].type === "multi") {
      setSelectedOps(prev =>
        prev.includes(answer)
          ? prev.filter(item => item !== answer)
          : [...prev, answer]
      );
    } else {
      proceedToNext();
    }
  };

  const proceedToNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOps([]);
    } else {
      setShowSurp(true);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="quiz-container">
      <h1>Question {currentQuestion + 1}:</h1>
      <h2>{currentQ.text}</h2>

      {currentQ.type === "multi" ? (
        <div className="multi-options">
          {currentQ.options.map((option, i) => (
            <div key={i} className="option-item">
              <label>
                <input
                  type="checkbox"
                  checked={selectedOps.includes(option)}
                  onChange={() => handleAnswer(option)}
                  className="option-checkbox"
                />
                {option}
              </label>
            </div>
          ))}
          <button
            onClick={proceedToNext}
            disabled={selectedOps.length === 0}
            className="submit-button"
          >
            {currentQuestion === questions.length - 1 ? "See Results" : "Next Question"}
          </button>
        </div>
      ) : (
        <div className="single-options">
          {currentQ.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(option)}
              className="answer-button"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;