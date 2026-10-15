
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function App() {
  const [feedback, setFeedback] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post(
        "http://localhost:5000/api/feedback",
        feedback
      );

      setMessage("Feedback submitted successfully!");

      setFeedback({
        q1: "",
        q2: "",
        q3: "",
        q4: "",
        q5: "",
      });
    } catch (error) {
      console.error(error);
      setMessage("Submission failed. Check the backend server.");
    }
  };

  return (
    <div className="container">
      <h1>Online Survey Application</h1>
      <p className="subtitle">We value your feedback!</p>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          name="q1"
          value={feedback.q1}
          onChange={handleChange}
          required
        />

        <label>Department</label>
        <input
          name="q2"
          value={feedback.q2}
          onChange={handleChange}
          required
        />

        <label>Session title</label>
        <input
          name="q3"
          value={feedback.q3}
          onChange={handleChange}
          required
        />

        <label>Feedback</label>
        <textarea
          name="q4"
          value={feedback.q4}
          onChange={handleChange}
          required
        />

        <label>Suggestions</label>
        <textarea
          name="q5"
          value={feedback.q5}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Feedback</button>

        {message && <p role="status">{message}</p>}
      </form>

      <Link to="/getAllData">View All Feedback</Link>
    </div>
  );
}

export default App;
