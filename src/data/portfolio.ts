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
    role: 'Web / App Developer',
    contact: 'voss.bas@gmail.com',
    summary:
      'I am a passionate developer with a strong background in software engineering. Interested in many different technologies and always eager to learn new things. I am a team player and enjoy working in a team. I have a strong work ethic and am always willing to put in the extra effort to get the job done. Security is a top priority for me and I always try to implement the best security practices.',
    education: [
      { degree: 'Secondary Education in Application Development', period: '2019 - 2019' },
      { degree: 'Bachelor in Software Engineering', period: '2019 - 2026' },
    ],
  },
  projects: [
    {
      title: 'Vue Portfolio',
      description: 'Vue 3, Vite & Tailwind',
      icon: 'https://img.icons8.com/color/96/portfolio.png',
      url: 'https://github.com/Nithiann/portfolio',
      tech: 'Vue 3, Vite & Tailwind CSS',
    },
    {
      title: 'VOSScloud',
      description: 'Symfony PHP Cloud Drive',
      icon: 'https://img.icons8.com/color/96/cloud-storage.png',
      url: '#',
      tech: 'Symfony PHP',
    },
    {
      title: 'Not Another Alarm Clock',
      description: 'Flutter Challenge Alarm',
      icon: 'https://img.icons8.com/color/96/alarm-clock.png',
      url: '#',
      tech: 'Flutter',
    },
    {
      title: 'VOSStab',
      description: 'A new tab extension for Mozilla Firefox',
      icon: 'https://img.icons8.com/ios/96/puzzle.png',
      url: 'https://github.com/Nithiann/VOSStab',
      tech: 'Vue 3, Vite & Tailwind CSS',
    },
  ],
  experience: [
    {
      role: 'Junior Full-stack developer',
      company: 'Direct-Effect',
      period: 'January 2025 - September 2025',
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
      period: 'September 2024 - January 2025',
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
      period: 'August 2020 - January 2025',
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
      period: 'January 2019 - June 2019',
      location: 'Roosendaal',
      description: ['Developed In-house ERP tool in a custom PHP framework'],
    },
    {
      role: 'Developer intern',
      company: 'Coders academy',
      period: 'August 2017 - January 2018',
      location: 'Rotterdam',
      description: ['Developed Social media platform for companies in Laravel PHP'],
    },
  ],
  skills: {
    expertise: [
      { name: 'Angular', icon: 'angularjs', level: '95%' },
      { name: 'PHP', icon: 'php', level: '90%' },
      { name: 'Express.js', icon: 'express-js', level: '85%' },
    ],
    working: [
      { name: 'Vue', icon: 'vue-js', level: '65%' },
      { name: 'React', icon: 'react-native', level: '65%' },
      { name: 'Flutter', icon: 'flutter', level: '70%' },
      { name: 'Kotlin', icon: 'kotlin', level: '75%' },
      { name: 'Java', icon: 'java-coffee-cup-logo', level: '60%' },
    ],
    learning: [
      { name: 'C# .NET', icon: 'c-sharp-logo', level: '70%' },
      { name: 'C# Game Dev', icon: 'unity', level: '45%' },
      { name: 'Rust', icon: 'rust-programming-language', level: '25%' },
      { name: 'GO', icon: 'golang', level: '20%' },
    ],
  },
}
