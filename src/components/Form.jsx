import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap components
import "./form.css";

function Form() {
  const [formData, setFormData] = useState({
    textInput: "",
    emailInput: "",
    passwordInput: "",
    textareaInput: "",
    selectInput: "",
    radioInput: "",
    checkboxInput1: false,
    checkboxInput2: false,
  });

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for controlling modal visibility

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleSubmit(event);
      }
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });

    if (name === "textInput" && value.trim() === "") {
      setErrors({ ...errors, [name]: "Text Input is required" });
    } else if (name === "emailInput" && !isValidEmail(value)) {
      setErrors({ ...errors, [name]: "Invalid Email" });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (key === "textInput" && formData[key].trim() === "") {
          setErrors({ ...errors, [key]: "Text Input is required" });
          return;
        } else if (key === "emailInput" && !isValidEmail(formData[key])) {
          setErrors({ ...errors, [key]: "Invalid Email" });
          return;
        }
      }
    }
    simulateFormSubmission(formData);
  };

  const simulateFormSubmission = (formData) => {
    setTimeout(() => {
      const isSuccess = Math.random() < 0.8;
      if (isSuccess) {
        setSubmissionStatus("success");
        setShowModal(true);
      } else {
        setSubmissionStatus("error");
      }
    }, 1000);
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const closeModal = () => {
    setShowModal(false);
    setSubmissionStatus(null);
  };

  return (
    <div>
      {submissionStatus === "error" && (
        <div className="alert alert-danger">
          Form submission failed. Please try again.
        </div>
      )}

      {/* Error messages container */}
      <div>
        {Object.keys(errors).map((key) => (
          <div className="alert alert-danger" key={key}>
            {errors[key]}
          </div>
        ))}
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          <p> Name:</p> <br />
          <input
            type="text"
            name="textInput"
            value={formData.textInput}
            onChange={handleChange}
          />
          {errors.textInput && (
            <div className="alert alert-danger">{errors.textInput}</div>
          )}
        </label>
        <label>
          <p>Email:</p> <br />
          <input
            type="email"
            name="emailInput"
            value={formData.emailInput}
            onChange={handleChange}
          />
          {errors.emailInput && (
            <div className="alert alert-danger">{errors.emailInput}</div>
          )}
        </label>
        <label>
          <p>Password:</p> <br />
          <input
            type="password"
            name="passwordInput"
            value={formData.passwordInput}
            onChange={handleChange}
          />
        </label>
        <label>
          <p>Textarea:</p> <br />
          <textarea
            name="textareaInput"
            value={formData.textareaInput}
            onChange={handleChange}
          />
        </label>
        <label>
          <p>Select Dropdown:</p> <br />
          <select
            name="selectInput"
            value={formData.selectInput}
            onChange={handleChange}
          >
            <option value="">Select One</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </label>
        <div className="fifthLabel">
          <label>
            Option 1
            <input
              type="radio"
              name="radioInput"
              value="option1"
              checked={formData.radioInput === "option1"}
              onChange={handleChange}
            />
          </label>
          <label>
            Option 2
            <input
              type="radio"
              name="radioInput"
              value="option2"
              checked={formData.radioInput === "option2"}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="fifthLabel">
          <label>
            Checkbox 1
            <input
              type="checkbox"
              name="checkboxInput1"
              checked={formData.checkboxInput1}
              onChange={handleChange}
            />
          </label>
          <label>
            Checkbox 2
            <input
              type="checkbox"
              name="checkboxInput2"
              checked={formData.checkboxInput2}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>

      {submissionStatus === "success" && (
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Form submitted successfully!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>Form Data</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(formData).map((key) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>
                      {typeof formData[key] === "boolean"
                        ? formData[key].toString()
                        : formData[key]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Form;
