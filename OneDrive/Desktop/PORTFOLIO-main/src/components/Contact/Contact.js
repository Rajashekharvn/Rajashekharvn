// src/components/Contact/Contact.jsx
import React, { useEffect, useState } from "react";
import { Container, Alert, Spinner } from "react-bootstrap";
import Particle from "../Particle";
import { AiOutlineMail } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { EMAIL, PHONE, LOCATION, FORMSPREE_ENDPOINT } from "../../config/contact";
import "./Contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // disable pointer events on particle canvas
  useEffect(() => {
    const nodes = document.querySelectorAll("#tsparticles, canvas, .tsparticles-canvas-el");
    nodes.forEach((n) => {
      try {
        n.style.pointerEvents = "none";
      } catch (e) {
        // ignore if node styling fails
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: "danger", message: "⚠️ Please fill in all fields." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({ type: "danger", message: "📧 Please enter a valid email address." });
      return;
    }

    setIsSubmitting(true);

    try {
      if (FORMSPREE_ENDPOINT) {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });

        if (res.ok) {
          setStatus({ type: "success", message: "✅ Message sent successfully!" });
          setName("");
          setEmail("");
          setMessage("");
        } else {
          setStatus({ type: "danger", message: "❌ Failed to send message. Try again later." });
        }
      } else {
        const subject = encodeURIComponent(`Portfolio Contact: ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, "_blank");
        setStatus({
          type: "success",
          message: "✉️ Email client opened — send to complete.",
        });
      }
    } catch (err) {
      console.error("Form error:", err);
      setStatus({ type: "danger", message: "🌐 Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container fluid className="about-section contact-section" id="contact">
      <Particle />
      <Container className="contact-inner">
        <div className="text-center" style={{ paddingTop: 20 }}>
          <h1 className="project-heading">
            <strong className="purple">Get In Touch</strong>
          </h1>
          <p className="contact-subtitle">
            Let’s collaborate, discuss a project, or just connect!
          </p>
        </div>

        {/* Use a plain flex container (not Bootstrap Row) to avoid grid specificity overrides */}
        <div className="contact-content" role="region" aria-label="Contact content">
          {/* Left info card */}
          <div className="contact-info-col">
            <div className="contact-card contact-info-card">
              <ul className="contact-info-list">
                <li>
                  <AiOutlineMail className="contact-icon" aria-hidden="true" />
                  <a href={`mailto:${EMAIL}`} className="contact-link">{EMAIL}</a>
                </li>
                <li>
                  <FaPhoneAlt className="contact-icon" aria-hidden="true" />
                  <a href={`tel:${PHONE}`} className="contact-link">{PHONE}</a>
                </li>
                <li>
                  <MdLocationOn className="contact-icon" aria-hidden="true" />
                  <span className="contact-text">{LOCATION}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right contact form */}
          <div className="contact-form-col">
            <div className="contact-card contact-form-wrapper">
              {status.message && (
                <Alert variant={status.type} className="contact-alert" role="status">
                  {status.message}
                </Alert>
              )}
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group mb-3">
                  <label htmlFor="name" className="form-label">Name *</label>
                  <input
                    id="name"
                    type="text"
                    className="form-control contact-input"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control contact-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message"
                    className="form-control contact-input contact-textarea"
                    rows={5}
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-purple contact-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <><Spinner animation="border" size="sm" /> Sending...</> : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </Container>
  );
}

export default Contact;
