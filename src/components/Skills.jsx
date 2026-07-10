import { SiPython, SiReact, SiDocker, SiLinux, SiGit } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import Bento from "./bento/Bento";
import Reveal from "./Reveal";

const skills = [
  {
    title: "Python",
    description: "Automation • Backend • Problem Solving",
    label: "Language",
    color: "#120F17",
    icon: SiPython,
  },
  {
    title: "React",
    description: "Frontend Development",
    label: "Framework",
    color: "#120F17",
    icon: SiReact,
  },
  {
    title: "AWS",
    description: "EC2 • RDS • VPC",
    label: "Cloud",
    color: "#120F17",
    icon: FaAws,
  },
  {
    title: "Docker",
    description: "Containers • Compose",
    label: "DevOps",
    color: "#120F17",
    icon: SiDocker,
  },
  {
    title: "Linux",
    description: "CLI • Bash",
    label: "OS",
    color: "#120F17",
    icon: SiLinux,
  },
  {
    title: "Git",
    description: "GitHub • Version Control",
    label: "Tools",
    color: "#120F17",
    icon: SiGit,
  },
];

export default function Skills() {
  return (
    <div className="section-shell">
      <div className="section-inner">
        <span className="section-kicker">what i work with</span>
        <Reveal as="h2" className="mb-12 text-4xl font-semibold text-white">
          Skills
        </Reveal>

        <Reveal delay={0.15} y={20}>
          <Bento
            items={skills}
            enableTilt
            enableBorderGlow
            enableSpotlight
            enableStars
          />
        </Reveal>
      </div>
    </div>
  );
}
