import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  // 👇 Fade-up animation for cards
  useEffect(() => {
    const cards = document.querySelectorAll(".project-card-view");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("show"), i * 120);
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => cards.forEach((card) => observer.unobserve(card));
  }, []);

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white", textAlign: "center", marginBottom: "2rem" }}>
          Here are a few projects I've worked on recently.
        </p>

        <Row className="project-grid">
          <Col>
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Centralized Certificate Collection"
              description="Developed a centralized system for collecting certificates for a college-level Faculty-Student Development Program using PHP and HTML."
              ghLink="https://github.com/Rajashekharvn/centralized_certificate_collection"
            />
          </Col>

          <Col>
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Data Hub Collaboration"
              description="A secure data-sharing platform built with PHP and HTML during a National Hackathon. Enables safe collaboration with data protection and an intuitive interface."
              ghLink="https://github.com/Rajashekharvn/secured-data-hub-collaboration"
            />
          </Col>

          <Col>
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Hamster Combat"
              description="Hamster Combat Key Generator bot and web app built with JavaScript, HTML, and CSS. Generates unique keys and offers an intuitive interface for management."
              ghLink="https://github.com/Rajashekharvn/hmkey"
              demoLink="https://hmkey.vercel.app/"
            />
          </Col>
        </Row>
      </Container>

      <style>{`
        /* 🌌 Background (same cosmic feel) */
.project-section {
  position: relative;
  padding-top: 40px;
  padding-bottom: 60px;
  background: linear-gradient(
      to bottom,
      rgba(10, 3, 22, 0.95),
      rgba(20, 7, 35, 0.95)
    ),
    url("https://www.transparenttextures.com/patterns/stardust.png");
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  z-index: 1;
}

.project-section #tsparticles {
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0 !important;
  pointer-events: none !important;
}

/* 🔠 Heading */
.project-heading {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.purple {
  color: #c084f5;
}

/* 🧱 Grid layout — 3 cards per row */
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  gap: 2rem;
  justify-items: center;
  align-items: stretch;
}

@media (max-width: 992px) {
  .project-grid {
    grid-template-columns: repeat(2, minmax(280px, 1fr));
  }
}

@media (max-width: 600px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}

/* ✨ Project Card Styling */
.project-card-view {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(192, 132, 245, 0.25);
  border-radius: 16px;
  width: 100%;
  max-width: 380px;
  min-height: 430px;
  transition: all 0.4s ease;
  overflow: hidden;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Subtle shine overlay */
.project-card-view::before {
  content: "";
  position: absolute;
  top: -60%;
  left: -60%;
  width: 220%;
  height: 220%;
  background: radial-gradient(
    circle at top left,
    rgba(192, 132, 245, 0.15),
    transparent 70%
  );
  opacity: 0.2;
  z-index: 0;
  transition: opacity 0.5s ease;
}

.project-card-view:hover::before {
  opacity: 0.5;
}

/* Hover glow + lift */
.project-card-view:hover {
  transform: translateY(-8px);
  border-color: rgba(192, 132, 245, 0.45);
  box-shadow: 0 0 35px rgba(192, 132, 245, 0.45);
}

/* 📸 Image */
.project-card-view img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  transition: transform 0.5s ease;
}

.project-card-view:hover img {
  transform: scale(1.05);
}

/* 📝 Card Content */
.project-card-view .card-body {
  flex: 1;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  z-index: 2;
}

.project-card-view .card-title {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
}

.project-card-view .card-text {
  color: #d4c6ef;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.2rem;
  flex-grow: 1;
}

/* 🔘 Buttons */
.project-card-view .btn {
  border-radius: 8px;
  border: 1px solid rgba(192, 132, 245, 0.4);
  color: #c084f5;
  background-color: transparent;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  padding: 0.4rem 1rem;
  backdrop-filter: blur(4px);
}

.project-card-view .btn:hover {
  background-color: #c084f5;
  color: #fff;
  box-shadow: 0 0 18px rgba(192, 132, 245, 0.6);
}

/* 🎞️ Fade-up animation for entry */
.project-card-view {
  opacity: 0;
  transform: translateY(30px);
}
.project-card-view.show {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.6s ease;
}

      `}</style>
    </Container>
  );
}

export default Projects;
