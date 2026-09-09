# Interactive RPG Portfolio

*Full-stack developer • React specialist • RPG enthusiast*

An RPG-inspired portfolio for **Aidan Lloyd Donaire**, built to present software projects, technical skills, experience, and contact information as an interactive game interface.

**Live site:** [aldonaire.github.io/Portfolio](https://aldonaire.github.io/Portfolio/)

## About

Instead of a static resume page, this portfolio reimagines a developer profile as an RPG character sheet — projects become quests, skills become a skill tree, and experience becomes inventory. It's a way to make a portfolio memorable while still surfacing the same information a recruiter or hiring manager needs.

## Panels

- **Profile Screen** — animated HP, MP, and EXP bars
- **Quest Log** — project descriptions, technologies, progress, image previews, and external links
- **Skill Tree** — explore frontend, backend, API, database, programming, and game-development skills
- **Inventory** — experience and background information
- **Achievements** — highlights and milestones
- **Guild Hall** — availability, preferred roles, services, email, GitHub, and LinkedIn links

## Interactions & Tech Highlights

- Draggable popup windows with saved positions and focus/z-index handling
- Responsive layout powered by React Bootstrap

## Tech Stack

- React 19
- JavaScript
- Bootstrap 5 and React Bootstrap
- React Draggable
- Create React App

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

```bash
git clone https://github.com/aldonaire/Portfolio.git
cd Portfolio
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command         | Description                                        |
| --------------- | --------------------------------------------------- |
| `npm start`     | Starts the development server with hot reloading.    |
| `npm run build` | Creates an optimized production build in `build/`.  |

## Project Structure

```text
src/
├── App.js              # Main profile screen and popup management
├── QuestLog.js         # Project list and project detail view
├── SkillTree.js        # Interactive skill graph
├── Inventory.js        # Experience and background panel
├── Achievements.js     # Achievements panel
├── GuildHall.js        # Contact and services panel
├── projectList.js      # Portfolio project data
├── skillNodes.js       # Skill tree data
└── inventoryItems.js   # Inventory data
```

## Deployment

The production site is configured with the GitHub Pages URL in `package.json`:

```text
https://aldonaire.github.io/Portfolio/
```

Build the deployable files with:

```bash
npm run build
```

## Contact

- **Email:** aidan.donaire@gmail.com
- **LinkedIn:** [linkedin.com/in/yourprofile](#)
- **GitHub:** [github.com/aldonaire](https://github.com/aldonaire)
