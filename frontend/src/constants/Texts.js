import {
  MdAutoGraph,
  MdAdminPanelSettings,
  MdSecurity,
  MdImportantDevices,
  MdDeveloperMode,
  MdDesignServices,
} from 'react-icons/md';
import { FaPeopleArrows } from 'react-icons/fa';
import { GiLightBulb, GiDiscussion, GiTransform } from 'react-icons/gi';

export const hero = {
  name: 'Istratoae Cătălin',
  title: 'Fullstack Web Developer',
  buttonText: 'Get in touch',
  link: '/contact',
};

export const projects = {
  title: "Some of the projects I've been working on.",
  buttonText: 'ALL PROJECTS',
  link: '/projects',
};

export const techText = {
  title: 'Technologies that I use',
  description:
    'From the vast tech stacks, these are the ones that I found most suitable for websites, such that the web applications will be fast, scaleable and low cost maintanance.',
  buttonText: 'ABOUT ME',
  link: '/about',
};

export const solutionData = [
  {
    image: MdImportantDevices,
    title: 'Productivity',
    text: 'Our solutions have the scope to boost productivity',
    effect: 'fade-right',
    effectDuration: '1500',
    effectEase: 'ease-in-out',
    effectDelay: 250,
  },
  {
    image: MdAutoGraph,
    title: 'Scalability',
    text: 'Our solutions can handle any volume of information',
    effect: 'fade-up',
    effectDuration: '1500',
    effectEase: 'ease-in-out',
    effectDelay: 300,
  },
  {
    image: MdAdminPanelSettings,
    title: 'Administration',
    text: 'Our solutions come with an admin dashboard that allows modifications of the system and statistics',
    effect: 'fade-up',
    effectDuration: '1500',
    effectEase: 'ease-in-out',
    effectDelay: 500,
  },
  {
    image: MdSecurity,
    title: 'Security',
    text: 'Our solutions respect the isp protection standards. All the data is encrypted',
    effect: 'fade-left',
    effectDuration: '1500',
    effectEase: 'ease-in-out',
    effectDelay: 700,
  },
];

export const processData = {
  process: [
    {
      image: GiDiscussion,
      title: '1. Dialogue',
      text: 'we meet online or in person and discuss about the needs of your business',
      effect: 'fade-down-right',
      effectDuration: '1500',
      effectEase: 'ease-in-out',
      effectDelay: 100,
    },
    {
      image: GiLightBulb,
      title: '2. Proposition',
      text: 'based on the previous discussion we present our solution',
      effect: 'fade',
      effectDuration: '2200',
      effectEase: 'ease-in-out',
      effectDelay: 300,
    },
    {
      image: MdDeveloperMode,
      title: '3. Developing',
      text: 'we work in sprints to develop the solution and present to you each module',
      effect: 'fade',
      effectDuration: '2200',
      effectEase: 'ease-in-out',
      effectDelay: 300,
    },
    {
      image: GiTransform,
      title: '4. Adaptation',
      text: 'based on the feedback of the modules we adapt the application to fit perfectly with your needs',
      effect: 'fade-down-left',
      effectDuration: '1500',
      effectEase: 'ease-in-out',
      effectDelay: 100,
    },
  ],
  texts: [
    {
      image: FaPeopleArrows,
      title: 'Best solutions for our partners!',
      text: 'Our ideology is that we have partners not clients, on the grounds that partners collaborate on the long term, as clients come and go.\u000A\u000AAnd so we offer our partners modern, fast and with a low maintenance cost web application',
    },
    {
      image: MdDesignServices,
      title: 'What we build?',
      text: `The web applications that we build are secure, flexible and scalable, with an attractive UI that makes the user experience a delight.\u000A\u000AOur team works with the latest technologies based on javascript, both on back end and front end.\u000A\u000AThe UI/UX is built from scratch so it can mold on your type of business. We focus on efficiency, so that our partners activities can be boosted.`,
    },
  ],
};
export const aboutPage = {
  about: [
    {
      image: '/images/me.jpg.webp',
      position: 'Founder, Fullstack Developer',
      name: 'Istratoae Irinel Catalin',
      description: [
        <>
          I have a bachelor degree in Computer Science, I am a{' '}
          <span className="highlight">fullstack developer</span> with 5 years of
          experience. I have turned my passion into a full time job. I chose to
          work as a fullstack developer because this allows me to bring concepts
          to life from scratch. I improve myself through various courses and
          through the projects that I work on.
        </>,
      ],
    },
  ],
};

export const contactData = {
  socialMedia: {
    github: 'https://github.com/CatalinIrinel?tab=repositories',
    facebook: 'https://www.facebook.com/profile.php?id=100081149877382',
    instagram: 'https://www.instagram.com/peakngo_web/',
    linkedin: 'https://www.linkedin.com/in/catalin-istratoae-7aba211a3/',
  },
};
