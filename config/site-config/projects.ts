import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    image: "/images/projects/siu-guarani-extension.gif",
    title: "SIU-Guaraní promedio",
    desc: "Chromium Extension to restore abandoned functionality of my university's student portal using client-side techniques.",
    repo: "https://github.com/juliancasaburi/siu-guarani-promedio-extension",
    preview: null,
    tags: [
      { name: "Browser extension"},
      { name: "Scraping"},
    ],
  },
  {
    image: "/images/projects/irisctf-2024.png",
    title: "IRIS CTF 2024",
    desc: "Writeups & automated solve scripts for IrisSec's Capture The Flag competition.",
    repo: "https://github.com/juliancasaburi/irisctf-2024",
    preview: "https://2024.irisc.tf/home.html",
    tags: [
      { name: "CTF"},
      { name: "CyberSecurity"},
      { name: "Forensics"},
    ],
  },
  {
    image: "/images/projects/poctf-2023.png",
    title: "Pointer Overflow CTF 2023",
    desc: "Writeups & automated solve scripts for POCTF 2023, organized by University of Wisconsin - Stevens Point.",
    repo: "https://github.com/juliancasaburi/pointeroverflowctf-2023",
    preview: "https://pointeroverflowctf.com/",
    tags: [
      { name: "CTF"},
      { name: "CyberSecurity"},
      { name: "Forensics"},
    ],
  },
  {
    image: "/images/projects/bizagi-bpm.png",
    title: "Business Process Model and Notation",
    desc: "Business Process Model created using Bizagi Modeler.",
    repo: "https://github.com/juliancasaburi/sistemas-y-organizaciones-bpm",
    preview: "https://raw.githubusercontent.com/juliancasaburi/sistemas-y-organizaciones-bpm/refs/heads/main/bizagi-bpm.png",
    tags: [
      { name: "Business Process Model"},
      { name: "BPMN"},
      { name: "Process-oriented organization"},
      { name: "Bizagi Modeler"},
    ],
  },
  {
    image: "/images/projects/openmu.png",
    title: "OpenMU",
    desc: "Contributed to feature development and code style improvements for OpenMU, an easy-to-use, extendable, and customizable server for the MMORPG 'MU Online'.",
    repo: "https://github.com/MUnique/OpenMU",
    preview: "https://github.com/MUnique/OpenMU",
    tags: [
      { name: "GameServer"},
    ],
  },
  {
    image: "/images/projects/dollar-calc.png",
    title: "Dollar",
    desc: "'Official Dollar' to 'ARS (Pesos Argentinos)' historic prices & 'Dólar Tarjeta' calculator",
    repo: "https://github.com/juliancasaburi/dollar",
    preview: "https://juliancasaburi.github.io/dollar/",
    tags: [
      { name: "Javascript"},
      { name: "React"},
      { name: "NextJS"},
      { name: "shadcn-ui"},
      { name: "API"},
    ],
  },
];
