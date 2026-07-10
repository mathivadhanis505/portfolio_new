import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import Bento from "./bento/Bento";
import Reveal from "./Reveal";

const links = [
  {
    title: "Email",
    label: "Email",
    description: "mathivadhanis967@gmail.com",
    href: "mailto:mathivadhanis967@gmail.com",
    // mailto: links must NOT use target="_blank" — browsers ignore it and
    // it causes opener security issues. Email client opens natively.
    external: false,
    icon: FaEnvelope,
    color: "#120F17",
  },
  {
    title: "GitHub",
    label: "GitHub",
    description: "mathivadhanis505",
    href: "https://github.com/mathivadhanis505",
    external: true,
    icon: FaGithub,
    color: "#120F17",
  },
  {
    title: "LinkedIn",
    label: "LinkedIn",
    description: "mathivadhani-s",
    href: "https://www.linkedin.com/in/mathivadhani-s-5827b1382",
    external: true,
    icon: FaLinkedin,
    color: "#120F17",
  },
];

const Contact = () => {
  return (
    <div className="section-shell">
      <div className="section-inner">
        <span className="section-kicker">let's talk</span>
        <Reveal as="h2" className="mb-4 text-4xl font-semibold text-white">
          Contact
        </Reveal>

        <Reveal delay={0.1} className="mb-16 max-w-lg text-white/50">
          Got something in mind? Reach out — happy to talk projects, ideas,
          or just say hi.
        </Reveal>

        <Reveal delay={0.15} y={20}>
          <Bento
            items={links}
            enableTilt
            enableBorderGlow
            enableSpotlight
            enableStars
          />
        </Reveal>
      </div>
    </div>
  );
};

export default Contact;
