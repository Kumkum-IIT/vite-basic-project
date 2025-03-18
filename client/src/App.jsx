import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";

function App() {
  const [count, setCount] = useState(0)
  const [array, setArray] = useState([])
  const [formData, setFormData] = useState({
    question: 'What is your name?',
    optionA: 'Kumkum',
    optionB: 'Rakesh',
    optionC: 'Anadhya',
    optionD: 'Raj',
    correctAnswer: 'A',
    selectedAnswer: ''
  })
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleOptionSelect = (option) => {
    setFormData({
      ...formData,
      selectedAnswer: option
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        question: formData.question,
        optionA: formData.optionA,
        optionB: formData.optionB,
        optionC: formData.optionC,
        optionD: formData.optionD,
        correctAnswer: formData.correctAnswer,
        selectedAnswer: formData.selectedAnswer
      };
      
      const response = await axios.post('http://localhost:8080/api/questions', dataToSend);
      setMessage('Answer submitted successfully!');
      setFormData({
        ...formData,
        selectedAnswer: ''
      });
      setTimeout(() => {
        window.location.reload(); // {{ edit_1 }}
      }, 1500);
    } catch (error) {
      setMessage('Error submitting answer: ' + error.message);
      console.error('Error submitting form:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Quiz Creator</h1>
      
      {message && <div className="message">{message}</div>}
      
      <form onSubmit={handleSubmit} className="quiz-form">
        <div className="form-group">
          <label>Question: {formData.question}</label>
        </div>
        
        <div className="form-group">
          <label>
            <input
              type="radio"
              name="selectedAnswer"
              value="A"
              checked={formData.selectedAnswer === 'A'}
              onChange={() => handleOptionSelect('A')}
              required
            />
            A: {formData.optionA}
          </label>
        </div>
        
        <div className="form-group">
          <label>
            <input
              type="radio"
              name="selectedAnswer"
              value="B"
              checked={formData.selectedAnswer === 'B'}
              onChange={() => handleOptionSelect('B')}
            />
            B: {formData.optionB}
          </label>
        </div>
        
        <div className="form-group">
          <label>
            <input
              type="radio"
              name="selectedAnswer"
              value="C"
              checked={formData.selectedAnswer === 'C'}
              onChange={() => handleOptionSelect('C')}
            />
            C: {formData.optionC}
          </label>
        </div>
        
        <div className="form-group">
          <label>
            <input
              type="radio"
              name="selectedAnswer"
              value="D"
              checked={formData.selectedAnswer === 'D'}
              onChange={() => handleOptionSelect('D')}
            />
            D: {formData.optionD}
          </label>
        </div>
        
        <button type="submit" className="submit-btn">Submit Answer</button>
      </form>
      
    </>
  )
}

export default App
