import React, { useState, useEffect } from "react";
import "./form.css";
import { Modal, Button, Alert } from "react-bootstrap";
import { FaComments, FaRobot, FaBrain } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

function Form() {
  const [formData, setFormData] = useState({
    textInput: "",
    emailInput: "",
    passwordInput: "",
    textareaInput: "",
    selectInput: "",
    genderInput: "",
    humanInput: false,
    aiInput: false,
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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
    let newValue = type === "checkbox" ? checked : value;

    if (name === "textInput") {
      const hasSpecialChars = /[!@#$%^&*()_+\\|}\]{[:"><?';~`]/.test(value); // Regex for special characters
      setNameError(hasSpecialChars ? "Special characters are not allowed" : "");
    }

    if (name === "emailInput") {
      const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Regex for email format
      setEmailError(!isValidFormat ? "Invalid Email" : "");
    }

    if (name === "passwordInput") {
      const isValidPassword =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value); // Regex for password format
      setPasswordError(
        !isValidPassword
          ? "Password must be 6-16 characters long and contain at least one digit and one special character"
          : ""
      );
    }

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(formData).some((value) => value === "")) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      return;
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fieldLabels = {
    textInput: "Name",
    emailInput: "Email",
    passwordInput: "Password",
    textareaInput: "Comments",
    selectInput: "Country",
    genderInput: "Gender",
    humanInput: "Human",
    aiInput: "AI",
  };

  return (
    <div>
      {showAlert && (
        <Alert variant="danger">Fill all the Fields Before submitting</Alert>
      )}
      {(nameError || emailError || passwordError) && (
        <Alert variant="danger">
          {nameError && <div>{nameError}</div>}
          {emailError && <div>{emailError}</div>}
          {passwordError && <div>{passwordError}</div>}
        </Alert>
      )}

      <form className="form-container" onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <label key={key}>
            <p>
              {fieldLabels[key]} {key === "textInput" && <IoPeople />}
              {key === "emailInput" && <MdEmail />}
              {key === "passwordInput" && <RiLockPasswordFill />}
              {key === "textareaInput" && <FaComments />}
            </p>{" "}
            <br />
            {key === "selectInput" ? (
              <select name={key} value={formData[key]} onChange={handleChange}>
                <option value="">Other</option>
                <option value="option1">Albania</option>
                <option value="option2">Kynea</option>
                <option value="option3">Canada</option>
              </select>
            ) : key === "genderInput" ? (
              <div className="genderBox">
                <label>
                  Male
                  <input
                    type="radio"
                    name={key}
                    value="Male"
                    checked={formData[key] === "Male"}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Female
                  <input
                    type="radio"
                    name={key}
                    value="Female"
                    checked={formData[key] === "Female"}
                    onChange={handleChange}
                  />
                </label>
              </div>
            ) : key === "humanInput" || key === "aiInput" ? (
              <div>
                <label>
                  {key === "humanInput" ? "Human" : "AI"}
                  <input
                    type="checkbox"
                    name={key}
                    checked={formData[key]}
                    onChange={handleChange}
                  />
                </label>
              </div>
            ) : (
              <input
                type={key === "passwordInput" ? "password" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
              />
            )}
          </label>
        ))}
        <button type="submit">Submit</button>
      </form>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <p style={{ color: "green" }}>Form submitted successfully!</p>{" "}
          </Modal.Title>
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
                  <td>{fieldLabels[key]}</td>
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
    </div>
  );
}

export default Form;
