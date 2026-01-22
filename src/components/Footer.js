import React from "react";

export default function Footer() {
  return (
    <div>
      {/* Footer */}
      <footer className="home-footer">
        <p className="copyright my-3 fs-6 text-white">Contect me if found something wrong</p>
        <div className="footer-links">
          <a
            href="https://www.instagram.com/saadsaifsheikh/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <i className="ri-instagram-line"></i> Instagram
          </a>
          <a href="mailto:gcsaadsaif123@gmail.com" className="footer-link">
            <i className="ri-mail-line"></i> Email
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-saad-saif-10b38a360/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <i className="fa-brands fa-linkedin-in"></i> Linkedin
          </a>
          <a
            href="https://github.com/M-Saad-saif"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <i className="fa-brands fa-github"></i>Github
          </a>
        </div>
      </footer>
    </div>
  );
}
