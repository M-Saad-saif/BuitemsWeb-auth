import {
  FaInstagramSquare,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const links = [
  {
    name: "Instagram",
    path: "https://www.instagram.com/saadsaifsheikh/",
    icon: FaInstagramSquare,
  },
  {
    name: "Email",
    path: "mailto:gcsaadsaif123@gmail.com",
    icon: FaEnvelope,
  },
  {
    name: "Linkedin",
    path: "https://www.linkedin.com/in/muhammad-saad-saif-10b38a360/",
    icon: FaLinkedin,
  },
  {
    name: "Github",
    path: "https://github.com/M-Saad-saif",
    icon: FaGithub,},
];

export default function Footer() {
  return (
    <div>
      {/* Footer */}
      <footer className="home-footer">
        <p className="copyright my-3 fs-6 text-white">
          Contect me if found something wrong
        </p>
        <div className="footer-links">
          {links.map((link, index) => {
            const Icon = link.icon;

            return (
              <a key={index} href={link.path} className="footer-link">
                <Icon size={15} /> {link.name}
              </a>
            );
          })}
        </div>
      </footer>
    </div>
  );
}
