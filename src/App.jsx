import { useState } from 'react'
import './App.css'

const questions = [
  {
    id: 1,
    question: "Which is our favourite Day?",
    options: ["14th september", "16th september", "12th may", "17th march"],
    correctAnswer: "12th may"

  },
  {
    id: 2,
    question: "My favourite Food?",
    options: ["South Indian", "Burger", "Panipuri", "Maggie"],
    correctAnswer: "Panipuri"
  },
  {
    id: 3,
    question: "First Gift from me?",
    options: ["Watch", "Earrings", "Necklace", "Teddy Bear"],
    correctAnswer: "Earrings"
  },
  {
    id: 4,
    question: "First  Cafe we went to?",
    options: ["EarthMonk", "Fressia", "The Pattern", "Craveyard"],
    correctAnswer: "The Pattern"
  },
  {
    id: 5,
    question: "First See you?",
    options: ["Dhaval House", "Dhaval Engagement", "Dhaval Birthday", "Dhaval Marriage"],
    correctAnswer: "Dhaval House"
  },
  {
    id: 6,
    question: "Guess the image place?",
    isImageQuestion: true,
    questionImage: "/images/gs3.jpg",
    options: ["Padra", "Itola", "Bank", "Ajwa"],
    correctAnswer: "Itola"
  }, {
    id: 7,
    question: "Guess the image date ?",
    isImageQuestion: true,
    questionImage: "/images/gs1.jpg",
    options: ["12/05/2024", "12/05/2025", "12/04/2024", "12/04/2025"],
    correctAnswer: "12/05/2024"
  }, {
    id: 8,
    question: "Guess the image place?",
    isImageQuestion: true,
    questionImage: "/images/gs2.jpg",
    options: ["Vishu Birthday", "Heni Birthday", "Bhavu Birthday", "Neha Birthday"],
    correctAnswer: "Bhavu Birthday"
  },
]

function App() {
  const [showInitialScreen, setShowInitialScreen] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [showFinalQuestion, setShowFinalQuestion] = useState(false)
  const [yesEnabled, setYesEnabled] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showWrongAnswerPopup, setShowWrongAnswerPopup] = useState(false)

  // Generate random heart positions and animations using lazy initialization
  const [finalHearts] = useState(() =>
    Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
    }))
  )

  const [questionHearts] = useState(() =>
    Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
    }))
  )

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer)
    const currentQuestion = questions[currentQuestionIndex]
    if (answer !== currentQuestion.correctAnswer) {
      setShowWrongAnswerPopup(true)
    }
  }

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
      } else {
        setShowFinalQuestion(true)
      }
    }
  }

  const handleNoClick = () => {
    setShowPopup(true)
    setTimeout(() => {
      setYesEnabled(true)
    }, 1000)
  }

  const handleYesClick = () => {
    if (yesEnabled) {
      setShowSuccessModal(true)
    }
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
  }

  const handleCloseWrongAnswerPopup = () => {
    setShowWrongAnswerPopup(false)
  }

  const handleLetsGo = () => {
    setShowInitialScreen(false)
  }

  if (showInitialScreen) {
    return (
      <div className="app-container">
        <div className="hearts-background">
          {questionHearts.map((heart, i) => (
            <div key={i} className="floating-heart" style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`
            }}>❤️</div>
          ))}
        </div>
        <div className="initial-screen-container">
          <h1 className="initial-title">💕 Hey Mahima!! 💕</h1>
          <h2 className="initial-subtitle">Are you ready to be my Valentine? 💖</h2>
          <button className="lets-go-button" onClick={handleLetsGo}>
            Let's Go! 🚀
          </button>
        </div>
      </div>
    )
  }

  if (showFinalQuestion) {
    return (
      <div className="app-container">
        <div className="hearts-background">
          {finalHearts.map((heart, i) => (
            <div key={i} className="floating-heart" style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`
            }}>❤️</div>
          ))}
        </div>
        <div className="final-question-container">
          <h1 className="final-question">Will you be my Valentine? 💝</h1>
          <div className="button-container">
            <button
              className={`yes-button ${yesEnabled ? 'enabled' : 'disabled'}`}
              onClick={handleYesClick}
              disabled={!yesEnabled}
            >
              Yes 💖
            </button>
            <button
              className="no-button"
              onClick={handleNoClick}
            >
              No
            </button>
          </div>
        </div>
        {showPopup && (
          <div className="popup-overlay" onClick={handleClosePopup}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <span className="popup-close" onClick={handleClosePopup}>×</span>
              <p className="invalid-choice-text">Invalid choice</p>
              <p>System has detected you are already my valentine. 💕</p>
            </div>
          </div>
        )}
        {showSuccessModal && (
          <div className="popup-overlay" onClick={handleCloseSuccessModal}>
            <div className="success-modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="popup-close" onClick={handleCloseSuccessModal}>×</span>
              <h2 className="success-emoji">💕</h2>
              <h3 className="success-title">Yay! You said YES! 💖</h3>
              <p className="success-message">Happy Valentine's Day Mahima💕</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer

  return (
    <div className="app-container">
      <div className="hearts-background">
        {questionHearts.map((heart, i) => (
          <div key={i} className="floating-heart" style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`
          }}>❤️</div>
        ))}
      </div>
      <div className="question-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <div className="question-number">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <h2 className="question-text">{currentQuestion.question}</h2>
        {currentQuestion.isImageQuestion && currentQuestion.questionImage && (
          <div className="question-image-container">
            <img
              src={currentQuestion.questionImage}
              alt="Question"
              className="question-image"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
        )}
        <div className={`options-container ${currentQuestion.isImageQuestion && currentQuestion.optionImages ? 'image-options' : ''}`}>
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === option
            const isOptionCorrect = option === currentQuestion.correctAnswer
            const hasOptionImages = currentQuestion.isImageQuestion && currentQuestion.optionImages && currentQuestion.optionImages[index]
            return (
              <button
                key={index}
                className={`option-button ${isCorrect && isSelected ? 'correct' :
                  selectedAnswer && isSelected && !isCorrect ? 'incorrect' :
                    isCorrect && isOptionCorrect ? 'correct' : ''
                  } ${hasOptionImages ? 'image-option-button' : ''}`}
                onClick={() => handleAnswerSelect(option)}
                disabled={isCorrect && selectedAnswer !== null}
              >
                {hasOptionImages ? (
                  <div className="image-option-content">
                    <img
                      src={currentQuestion.optionImages[index]}
                      alt={option}
                      className="option-image"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                    <span className="option-label">{option}</span>
                  </div>
                ) : (
                  option
                )}
              </button>
            )
          })}
        </div>
        {selectedAnswer && (
          <div className={`feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
            {isCorrect ? (
              <span>💖 Correct! Great job! 💖</span>
            ) : (
              <span>❌ Wrong answer. Please try again!</span>
            )}
          </div>
        )}
        {isCorrect && (
          <button className="next-button" onClick={handleNext}>
            Next Question ➡️
          </button>
        )}
        {showWrongAnswerPopup && (
          <div className="popup-overlay" onClick={handleCloseWrongAnswerPopup}>
            <div className="popup-content wrong-answer-popup" onClick={(e) => e.stopPropagation()}>
              <span className="popup-close" onClick={handleCloseWrongAnswerPopup}>×</span>
              <h2 className="angry-emoji">😠</h2>
              <p>Wrong answer! Try again! 😤</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
