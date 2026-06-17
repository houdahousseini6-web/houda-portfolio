import {
    FaReact,
    FaJs,
    FaHtml5,
    FaCss3Alt,
    FaJava,
    FaGithub,
    FaLinkedin,
    FaDribbble,
    FaFigma,
  } from 'react-icons/fa'
  
  import {
    SiBlender,
    SiThreedotjs,
    SiCplusplus,
  } from 'react-icons/si'
  
  import { HiMail } from 'react-icons/hi'
  import { BsPhone } from 'react-icons/bs'
  
  // ─── NAV LINKS ───────────────────────────────────────────
  export const navLinks = [
    { id: 'home',     label: 'Home'     },
    { id: 'about',    label: 'About'    },
    { id: 'skills',   label: 'Skills'   },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'contact',  label: 'Contact'  },
  ]
  
  // ─── SKILLS ──────────────────────────────────────────────
  export const skills = [
    { name: 'React',       icon: FaReact,     color: '#61DAFB', category: 'dev'    },
    { name: 'JavaScript',  icon: FaJs,        color: '#F7DF1E', category: 'dev'    },
    { name: 'HTML5',       icon: FaHtml5,     color: '#E34F26', category: 'dev'    },
    { name: 'CSS3',        icon: FaCss3Alt,   color: '#1572B6', category: 'dev'    },
    { name: 'C++',         icon: SiCplusplus, color: '#00599C', category: 'dev'    },
    { name: 'Java',        icon: FaJava,      color: '#ED8B00', category: 'dev'    },
    { name: 'C#',          icon: FaFigma,     color: '#239120', category: 'dev'    },
    { name: 'Photoshop',   icon: FaFigma,     color: '#31A8FF', category: 'design' },
    { name: 'Illustrator', icon: FaFigma,     color: '#FF9A00', category: 'design' },
    { name: '3D Modeling', icon: SiBlender,   color: '#F5792A', category: 'design' },
    { name: 'Three.js',    icon: SiThreedotjs,color: '#FFFFFF', category: 'dev'    },
    { name: 'Figma',       icon: FaFigma,     color: '#F24E1E', category: 'design' },
  ]
  
  // ─── PROJECTS ────────────────────────────────────────────
  export const projects = [
    {
      id: 1,
      title: 'Project One',
      description: 'A modern web application with stunning animations and responsive design.',
      tech: ['React', 'JavaScript', 'CSS'],
      github: 'https://github.com/houda',
      demo: '#',
      image: null,
      category: 'Web',
    },
    {
      id: 2,
      title: 'Project Two',
      description: 'Creative 3D modeling and cinematic animation project.',
      tech: ['3D Modeling', 'Animation', 'Blender'],
      github: 'https://github.com/houda',
      demo: '#',
      image: null,
      category: '3D',
    },
    {
      id: 3,
      title: 'Project Three',
      description: 'Elegant animated wedding invitation with custom graphics.',
      tech: ['Illustrator', 'Photoshop', 'Animation'],
      github: '#',
      demo: '#',
      image: null,
      category: 'Design',
    },
    {
      id: 4,
      title: 'Project Four',
      description: 'Full stack application with modern UI and clean architecture.',
      tech: ['React', 'C#', 'SQL'],
      github: 'https://github.com/houda',
      demo: '#',
      image: null,
      category: 'Web',
    },
  ]
  
  // ─── SERVICES ────────────────────────────────────────────
  export const services = [
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Modern and responsive websites using React and latest technologies.',
    },
    {
      icon: '🎬',
      title: 'Animation & Video',
      description: 'Professional animated videos and motion graphics.',
    },
    {
      icon: '🧊',
      title: '3D Modeling',
      description: 'High quality 3D models and renders for any purpose.',
    },
    {
      icon: '💍',
      title: 'Wedding Cards',
      description: 'Beautiful and unique animated wedding invitations.',
    },
    {
      icon: '🎨',
      title: 'Design',
      description: 'Creative designs using Photoshop and Illustrator.',
    },
  ]
  
  // ─── CONTACT INFO ─────────────────────────────────────────
  export const contactInfo = [
    {
        icon: HiMail,
        label: 'Email',
        value: 'houdahousseini6@gmail.com',
        href: 'https://mail.google.com/mail/?view=cm&fs=1&to=houdahousseini6@gmail.com&su=Portfolio%20Inquiry',
      },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/houda',
      href: 'https://www.linkedin.com/in/houda-housseini-10509b351',
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: 'github.com/houda',
      href: 'https://github.com/houdahousseini6-web',
    },
    {
      icon: BsPhone,
      label: 'Phone',
      value: '+961 71 644 310',
      href: 'tel:+96171644310',
    },
  ]