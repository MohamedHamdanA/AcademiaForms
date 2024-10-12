import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateForm.css"; // Import the CSS file

const CreateForm = () => {
  const Navigate = useNavigate();
  const department = localStorage.getItem("department");
  const [formTitle, setFormTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", type: "short-answer", options: [] },
  ]);

  // Function to add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", type: "short-answer", options: [] },
    ]);
  };

  // Function to remove a question based on index
  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  // Function to handle changes in question fields
  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  // Function to handle changes in question options
  const handleOptionChange = (index, optIndex, value) => {
    const newOptions = [...questions[index].options];
    newOptions[optIndex] = value;
    handleQuestionChange(index, "options", newOptions);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    if (!department) {
      Navigate("/login");
    }
    e.preventDefault();
    const form = { title: formTitle, questions, department: department };
    try {
      await axios.post("http://localhost:5000/api/forms", form);
      console.log("Form created successfully");
      Navigate("/");
      setFormTitle("");
      setQuestions([{ question: "", type: "short-answer", options: [] }]);
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };

  return (
    <div className="create-form-container">
      <h2 className="form-title">Create New Form</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          placeholder="Form Title"
          required
          className="form-input"
        />

        {/* Render the questions */}
        {questions.map((question, index) => (
          <div key={index} className="question-container">
            <input
              type="text"
              value={question.question}
              onChange={(e) =>
                handleQuestionChange(index, "question", e.target.value)
              }
              placeholder="Question"
              required
              className="form-input"
            />

            <select
              value={question.type}
              onChange={(e) =>
                handleQuestionChange(index, "type", e.target.value)
              }
              className="question-select"
            >
              <option value="short-answer">Short Answer</option>
              <option value="paragraph">Paragraph</option>
              <option value="multiple-choice">Multiple Choice</option>
              <option value="checkboxes">Checkboxes</option>
              <option value="dropdown">Dropdown</option>
            </select>

            {/* Render options if the question type requires them */}
            {(question.type === "multiple-choice" ||
              question.type === "checkboxes" ||
              question.type === "dropdown") && (
              <div className="options-container">
                {question.options.map((option, optIndex) => (
                  <input
                    key={optIndex}
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, optIndex, e.target.value)
                    }
                    placeholder={`Option ${optIndex + 1}`}
                    className="option-input"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newOptions = [...question.options, ""];
                    handleQuestionChange(index, "options", newOptions);
                  }}
                  className="add-option-button"
                >
                  Add Option
                </button>
              </div>
            )}

            {/* Add a Remove Button next to each question */}
            <button
              type="button"
              onClick={() => removeQuestion(index)}
              className="remove-question-button"
            >
              Remove Question
            </button>
          </div>
        ))}
        {/* Add a new question */}
        <button
          type="button"
          onClick={addQuestion}
          className="add-question-button"
        >
          Add Question
        </button>
        {/* Submit the form */}
        <button type="submit" className="submit-button">
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
