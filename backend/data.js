const bcrypt = require('bcryptjs');

const data = {
  user: [
    {
      name: 'Istratoae Catalin',
      email: 'catalin@peakngo.com',
      password: bcrypt.hashSync('251122aa15'),
      isAdmin: true,
    },
    {
      name: 'test',
      email: 'test@test.com',
      password: bcrypt.hashSync('123'),
      isAdmin: false,
    },
  ],
  projects: [
    {
      name: 'Babyfie',
      technology: '/images/react.png.webp',
      link: 'https://babyfie.ro',
      image: '/images/babyfie.png.webp',
      description: 'make one later and change it later',
      imgStart: true,
      effect: 'fade-right',
      effectDuration: 1500,
      effectEase: 'ease-in-out',
      effectDelay: 0,
    },
    {
      name: 'Cerebrium',
      technology: '/images/react.png.webp',
      link: 'https://cerebrium.ro',
      image: '/images/cerebrium.png.webp',
      description: 'make one later and change it later',
      imgStart: false,
      effect: 'fade-down',
      effectDuration: 1500,
      effectEase: 'ease-in-out',
      effectDelay: 250,
    },
    {
      name: 'Demo Presentation Website',
      technology: '/images/react.png.webp',
      link: 'https://demo2.peakngo.com',
      image: '/images/demo.png.webp',
      description: 'make one later and change it later',
      imgStart: true,
      effect: 'fade-left',
      effectDuration: 1500,
      effectEase: 'ease-in-out',
      effectDelay: 500,
    },
  ],
  techs: [
    {
      image: '/images/react.png.webp',
      tech: 'React JS',
      description:
        'React makes it painless to create interactive UIs. Build encapsulated components that manage their own state, then compose them to make complex UIs.',
      effect: 'fade-right',
      effectDuration: 1500,
      effectEase: 'ease-in-out',
    },
    {
      image: '/images/node.png.webp',
      tech: 'Node JS',
      description:
        "Node.js is designed to build scalable network applications. Node.js being designed without threads doesn't mean you can't take advantage of multiple cores in your environment.",
      effect: 'fade-down',
      effectDuration: 1500,
      effectEase: 'ease-in-out',
    },
    {
      image: '/images/mongo.png.webp',
      tech: 'MongoDB',
      description:
        'Harness the power of your data by building and managing your data in the cloud. With MongoDB Atlas, your database is secure by default with preconfigured security features built-in.',
      effect: 'fade-left',
      effectDuration: 1500,
      effectEase: 'ease-in-out',
    },
    {
      image: '/images/express.png.webp',
      tech: 'Express JS',
      description:
        'Fast, unopinionated, minimalist web framework for Node.js that provides a robust set of features for web and mobile applications.',
      effect: 'fade-right',
      effectDuration: 1500,
      effectEase: 'ease-in-out',
    },
    {
      image: '/images/github.png.webp',
      tech: 'Git Hub',
      description:
        'Is an Internet hosting service for software development and version control using Git. It provides access control, software feature requests, task management, for every project',
      effect: 'fade-up',
      effectDuration: 1500,
      effectEase: 'ease-in-out',
    },
    {
      image: '/images/chakra.png.webp',
      tech: 'Chakra UI',
      description:
        'Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.',
      effect: 'fade-left',
      effectDuration: 1500,
      effectEase: 'ease-in-out',
    },
    {
      image: '/images/js.png.webp',
      tech: 'Java Script',
      description: 'Think of something later',
    },
    {
      image: '/images/npm.png.webp',
      tech: 'NPM',
      description: 'Think of something later',
    },
    {
      image: '/images/html.png.webp',
      tech: 'HTML',
      description: 'Think of something later',
    },
    {
      image: '/images/css.png.webp',
      tech: 'CSS',
      description: 'Think of something later',
    },
    {
      image: '/images/styled.png.webp',
      tech: 'Styled Components',
      description: 'Think of something later',
    },
  ],
};

module.exports = { data };
