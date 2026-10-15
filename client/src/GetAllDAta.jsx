
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function GetAllDAta() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getfeedback")
      .then((response) => setFeedbacks(response.data))
      .catch(() => setError("Unable to load feedback."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading feedback...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>Submitted Feedback</h1>
      <Link to="/">Back to Form</Link>

      {feedbacks.length === 0 && <p>No feedback submitted yet.</p>}

      {feedbacks.map((item) => (
        <div className="feedback-card" key={item._id}>
          <p><strong>Name:</strong> {item.q1}</p>
          <p><strong>Department:</strong> {item.q2}</p>
          <p><strong>Session:</strong> {item.q3}</p>
          <p><strong>Feedback:</strong> {item.q4}</p>
          <p><strong>Suggestions:</strong> {item.q5}</p>
          <small>
            Submitted: {new Date(item.submittedAt).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}

export default GetAllDAta;
