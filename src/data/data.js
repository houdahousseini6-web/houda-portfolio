
/* ==========================================
   IMPORT ICONS
========================================== */

import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaJava,
  FaGithub,
  FaLinkedin,
  FaFigma,
  FaNodeJs,
  FaPython,
  FaCode,
  FaDatabase,
  FaCube,
  FaLink,
  FaPlay
} from 'react-icons/fa'

import {
  SiTypescript,
  SiTailwindcss,
  SiThreedotjs,
  SiCplusplus,
  SiFramer,
  SiExpress,
  SiFirebase,
  SiOpencv,
  SiAndroidstudio,
  SiVercel,
  SiUnity,
  SiGit,
  SiPostman
} from 'react-icons/si'

import { HiMail } from 'react-icons/hi'
import { BsPhone } from 'react-icons/bs'


/* ==========================================
   NAVIGATION LINKS
========================================== */

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' }
]


/* ==========================================
   SKILLS & TECHNOLOGIES
   Total: 25 Technologies
========================================== */

export const skills = [

  /* ======================================
     FRONTEND DEVELOPMENT
  ====================================== */

  {
    name: 'HTML5',
    icon: FaHtml5,
    color: '#E34F26',
    category: 'Frontend'
  },

  {
    name: 'CSS3',
    icon: FaCss3Alt,
    color: '#1572B6',
    category: 'Frontend'
  },

  {
    name: 'JavaScript',
    icon: FaJs,
    color: '#F7DF1E',
    category: 'Frontend'
  },

  {
    name: 'TypeScript',
    icon: SiTypescript,
    color: '#3178C6',
    category: 'Frontend'
  },

  {
    name: 'React',
    icon: FaReact,
    color: '#61DAFB',
    category: 'Frontend'
  },

  {
    name: 'Tailwind CSS',
    icon: SiTailwindcss,
    color: '#06B6D4',
    category: 'Frontend'
  },


  /* ======================================
     CREATIVE WEB DEVELOPMENT
  ====================================== */

  {
    name: 'Three.js',
    icon: SiThreedotjs,
    color: '#FFFFFF',
    category: 'Creative'
  },

  {
    name: 'Framer Motion',
    icon: SiFramer,
    color: '#BB82FF',
    category: 'Creative'
  },

  {
    name: 'GSAP',
    icon: FaPlay,
    color: '#88CE02',
    category: 'Creative'
  },

  {
    name: 'Figma',
    icon: FaFigma,
    color: '#F24E1E',
    category: 'Design'
  },


  /* ======================================
     3D DEVELOPMENT & ANIMATION
  ====================================== */

  {
    name: 'Unity',
    icon: SiUnity,
    color: '#FFFFFF',
    category: '3D'
  },

  {
    name: '3ds Max',
    icon: FaCube,
    color: '#38BDF8',
    category: '3D'
  },


  /* ======================================
     BACKEND DEVELOPMENT & DATABASES
  ====================================== */

  {
    name: 'Node.js',
    icon: FaNodeJs,
    color: '#68A063',
    category: 'Backend'
  },

  {
    name: 'Express.js',
    icon: SiExpress,
    color: '#FFFFFF',
    category: 'Backend'
  },

  {
    name: 'Firebase',
    icon: SiFirebase,
    color: '#FFCA28',
    category: 'Backend'
  },

  {
    name: 'SQL',
    icon: FaDatabase,
    color: '#38BDF8',
    category: 'Database'
  },

  {
    name: 'REST APIs',
    icon: SiPostman,
    color: '#FF6C37',
    category: 'Backend'
  },


  /* ======================================
     PROGRAMMING & COMPUTER VISION
  ====================================== */

  {
    name: 'Python',
    icon: FaPython,
    color: '#3776AB',
    category: 'Programming'
  },

  {
    name: 'Java',
    icon: FaJava,
    color: '#ED8B00',
    category: 'Programming'
  },

  {
    name: 'C++',
    icon: SiCplusplus,
    color: '#659AD2',
    category: 'Programming'
  },

  {
    name: 'OpenCV',
    icon: SiOpencv,
    color: '#5C3EE8',
    category: 'AI / CV'
  },


  /* ======================================
     DEVELOPMENT TOOLS & PLATFORMS
  ====================================== */

  {
    name: 'Git & GitHub',
    icon: FaGithub,
    color: '#FFFFFF',
    category: 'Tools'
  },

  {
    name: 'VS Code',
    icon: FaCode,
    color: '#23A9F2',
    category: 'Tools'
  },

  {
    name: 'Android Studio',
    icon: SiAndroidstudio,
    color: '#3DDC84',
    category: 'Tools'
  },

  {
    name: 'Vercel',
    icon: SiVercel,
    color: '#FFFFFF',
    category: 'Tools'
  }

]


/* ==========================================
   PROJECTS
   Existing project data preserved
========================================== */

export const projects = [

  {
    id: 1,
    title: 'Project One',
    description:
      'A modern web application with stunning animations and responsive design.',
    tech: ['React', 'JavaScript', 'CSS'],
    github: 'https://github.com/houda',
    demo: '#',
    image: null,
    category: 'Web'
  },

  {
    id: 2,
    title: 'Project Two',
    description:
      'Creative 3D modeling and cinematic animation project.',
    tech: ['3D Modeling', 'Animation', 'Blender'],
    github: 'https://github.com/houda',
    demo: '#',
    image: null,
    category: '3D'
  },

  {
    id: 3,
    title: 'Project Three',
    description:
      'Elegant animated wedding invitation with custom graphics.',
    tech: ['Illustrator', 'Photoshop', 'Animation'],
    github: '#',
    demo: '#',
    image: null,
    category: 'Design'
  },

  {
    id: 4,
    title: 'Project Four',
    description:
      'Full stack application with modern UI and clean architecture.',
    tech: ['React', 'C#', 'SQL'],
    github: 'https://github.com/houda',
    demo: '#',
    image: null,
    category: 'Web'
  }

]


/* ==========================================
   SERVICES
   Existing service data preserved
========================================== */

export const services = [

  {
    icon: '💻',
    title: 'Web Development',
    description:
      'Modern and responsive websites using React and latest technologies.'
  },

  {
    icon: '🎬',
    title: 'Animation & Video',
    description:
      'Professional animated videos and motion graphics.'
  },

  {
    icon: '🧊',
    title: '3D Modeling',
    description:
      'High quality 3D models and renders for any purpose.'
  },

  {
    icon: '💍',
    title: 'Wedding Cards',
    description:
      'Beautiful and unique animated wedding invitations.'
  },

  {
    icon: '🎨',
    title: 'Design',
    description:
      'Creative designs using Photoshop and Illustrator.'
  }

]


/* ==========================================
   CONTACT INFORMATION
========================================== */

export const contactInfo = [

  {
    icon: HiMail,
    label: 'Email',
    value: 'houdahousseini6@gmail.com',
    href:
      'https://mail.google.com/mail/?view=cm&fs=1&to=houdahousseini6@gmail.com&su=Portfolio%20Inquiry'
  },

  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/houda',
    href:
      'https://www.linkedin.com/in/houda-housseini-10509b351'
  },

  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'github.com/houda',
    href:
      'https://github.com/houdahousseini6-web'
  },

  {
    icon: BsPhone,
    label: 'Phone',
    value: '+961 71 644 310',
    href: 'tel:+96171644310'
  }

]
