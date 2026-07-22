export interface Project {
  title: string
  description: string
  icon: string
  url: string
  tech: string
}

export interface Experience {
  role: string
  company: string
  period: string
  location: string
  description: string[]
}

export interface Skill {
  name: string
  icon: string
  level: string
}

export const portfolioData = {
  personal: {
    name: 'Bas Voss',
    location: 'Breda, The Netherlands',
    role: 'Software Developer | Back-end Specialist',
    contact: 'voss.bas@gmail.com',
    summary:
      'I am a driven software developer specializing in back-end development, with a solid foundation in front-end development. I have a strong interest in software architecture and security, with maintainability, security and extensibility as key principles in my work. I enjoy solving complex technical challenges, contributing to technical decisions and continuously expanding my knowledge. I also value teamwork, helping colleagues and maintaining a friendly and enjoyable working environment.',
    education: [
      {
        degree: 'Secondary Vocational Education in Application Development',
        period: '2016 - 2019',
      },
      {
        degree: 'Bachelor of Science in Software Engineering',
        period: '2019 - 2026',
      },
    ],
  },
  projects: [
    {
      title: 'Vue Portfolio',
      description: 'Vue 3, Vite & Tailwind',
      icon: 'https://img.icons8.com/color/96/portfolio.png',
      url: 'https://github.com/Nithiann/nithiann.github.io',
      tech: 'Vue 3, Vite & Tailwind CSS',
    },
    {
      title: 'Flira',
      description: '.NET C# & Angular Task Management Tool',
      icon: 'https://img.icons8.com/color/96/task.png',
      url: 'https://github.com/Nithiann/Flira',
      tech: '.NET C# & Angular',
    },
    {
      title: 'Bangers',
      description: 'Social Media Event Finder platform for iOS and Android',
      icon: 'https://img.icons8.com/?size=100&id=8T4evnENLKLw&format=png&color=000000',
      url: 'https://github.com/orgs/Bangers-Company/repositories',
      tech: 'React Native, Laravel & React',
    },
    {
      title: 'VOSScloud',
      description: 'Self-hosted cloud storage in Laravel PHP',
      icon: 'https://img.icons8.com/color/96/cloud-storage.png',
      url: 'https://github.com/vossje-nl/VOSScloud',
      tech: 'Symfony',
    },
  ],
  experience: [
    {
      role: 'Back-end developer intern',
      company: 'Indicia',
      period: '2026 - 2026',
      location: 'Tilburg',
      description: [
        'Developed an Applicant Tracking System back-end in Drupal.',
        'Implemented API integrations for various HR tools.',
        'Used MySQL as database engine.',
      ],
    },
    {
      role: 'Junior Full-stack developer',
      company: 'Direct-Effect',
      period: '2025 - 2025',
      location: 'Drunen',
      description: [
        'Developed a Progressive web-app front-end in AngularJS and Angular 8.',
        'Developed API back-end in PHP Laravel.',
        'Used MySQL as database engine.',
      ],
    },
    {
      role: 'Full-stack developer intern',
      company: 'Direct-Effect',
      period: '2024 - 2024',
      location: 'Drunen',
      description: [
        'Developed a Progressive web-app front-end in AngularJS and Angular 8.',
        'Developed API back-end in PHP Laravel.',
        'Used MySQL as database engine.',
      ],
    },
    {
      role: 'Powerservice employee / System administrator',
      company: 'Mediamarkt',
      period: '2020 - 2025',
      location: 'Breda',
      description: [
        'Helping customers with their technical issues.',
        'Making sure all software and drivers work within the company.',
        'Repairing smartphones, laptops and desktops.',
      ],
    },
    {
      role: 'Developer Intern',
      company: 'TriStar Industries Group',
      period: '2019 - 2019',
      location: 'Roosendaal',
      description: ['Developed In-house ERP tool in a custom PHP framework'],
    },
    {
      role: 'Developer intern',
      company: 'Coders academy',
      period: '2017 - 2018',
      location: 'Rotterdam',
      description: ['Developed Social media platform for companies in Laravel PHP'],
    },
  ],
  skills: {
    expertise: [
      { name: 'Angular', icon: 'angularjs', level: '95%' },
      { name: 'PHP', icon: 'php', level: '90%' },
      { name: 'Express.js', icon: 'express-js', level: '85%' },
      { name: 'C# .NET', icon: 'c-sharp-logo', level: '85%' },
    ],
    working: [
      { name: 'Vue', icon: 'vue-js', level: '65%' },
      { name: 'React', icon: 'react-native', level: '65%' },
      { name: 'Flutter', icon: 'flutter', level: '70%' },
      { name: 'Kotlin', icon: 'kotlin', level: '75%' },
      { name: 'Java', icon: 'java-coffee-cup-logo', level: '60%' },
    ],
    learning: [
      { name: 'C# Game Dev', icon: 'unity', level: '45%' },
      { name: 'Rust', icon: 'rust-programming-language', level: '25%' },
      { name: 'GO', icon: 'golang', level: '40%' },
    ],
  },
}
