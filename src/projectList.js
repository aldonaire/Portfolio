const projectList = [
  {
    title: 'Physicochemical Analysis of Hydroponic System using Naive Bayes',
    subtitle: 'Machine Learning capstone project',
    description: 'A machine learning project that predicts the physicochemical properties of a hydroponic system using the Naive bayes algorithm. The project involves data collection, preprocessing, model training, and evaluation to provide insights into the system\'s behavior.',
    tags: ['HTML', 'Bootstrap', 'Phython', 'Flask', 'PHP', 'MySQL', 'Arduino'],
    link: 'https://github.com/aldonaire/Physicochemical-Analysis-of-Hydroponic-System-using-Naive-Bayes',
    status: 'COMPLETED',
    progress: 100,
    images: [process.env.PUBLIC_URL +"/projects/hydro/NB.png",process.env.PUBLIC_URL +"/projects/hydro/NB.png"],
  },
  {
    title: 'Interactive RPG Portfolio (This Website)',
    subtitle: 'Personal portfolio project',
    description: 'A personal portfolio website designed as an interactive RPG game, showcasing my skills, projects, and achievements. The website features a unique user interface, engaging animations, and a gamified experience to present my work in a creative and memorable way.',
    tags: ['HTML', 'Bootstrap', 'React', 'JavaScript', 'CSS'],
    link: 'https://github.com/aldonaire/Portfolio',
    status: 'IN PROGRESS',
    progress: 40,
    images: [process.env.PUBLIC_URL +"/projects/rpg/1.png",process.env.PUBLIC_URL +"/projects/rpg/2.png"],
  },
  {
    title: 'School Schedule Conflict Resolution System',
    subtitle: 'Educational technology project',
    description: 'A web-based application that helps schools manage and resolve scheduling conflicts. The system allows administrators to input class schedules, identify conflicts, and suggest alternative arrangements to optimize the overall schedule. The project is still in progress and only the API has been completed.',
    tags: ['Phython', 'Flask', 'MySQL'],
    status: 'IN PROGRESS',
    progress: 70,
  },
  {
    title: 'Elemental Survivors (Temporary Title)',
    subtitle: 'Game development passion project',
    description: 'A 2D isometric vampire survivors inspired game developed using Godot Engine, featuring pixel art graphics created in Aseprite and music composed in FL Studio. The game is currently in development, with a focus on creating an engaging gameplay experience and unique mechanics. The project is still in progress and is expected to be completed in the future.',
    tags: ['Godot', 'GDScript', 'Aseprite', 'FL Studio'],
    status: 'IN PROGRESS',
    progress: 40,
    images: [process.env.PUBLIC_URL +"/projects/element/1.png",process.env.PUBLIC_URL +"/projects/element/2.png"],
  },
  {
    title: 'Laundry Management System (Temporary Title)',
    subtitle: 'Application development project',
    description: 'A web-based application that helps users manage their laundry tasks efficiently. The system allows users to track laundry schedules, set reminders, and manage laundry-related information. The project is still in progress and is expected to be completed in the future.',
    tags: ['SaaS'],
    status: 'NOT STARTED',
    progress: 0,
  },
];

export default projectList;
