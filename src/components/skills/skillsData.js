// ── Skill data for Skills section ───────────────────────────────────────────
// invertIcon: true → SVG is dark/monochrome; needs brightness(0) invert(1)

import awsSvg      from '../../assets/skills/AWS.svg';
import css3Svg     from '../../assets/skills/CSS3.svg';
import gitSvg      from '../../assets/skills/Git.svg';
import githubSvg   from '../../assets/skills/GitHub.svg';
import html5Svg    from '../../assets/skills/HTML5.svg';
import javaSvg     from '../../assets/skills/Java.svg';
import jsSvg       from '../../assets/skills/JavaScript.svg';
import mongodbSvg  from '../../assets/skills/MongoDB.svg';
import mysqlSvg    from '../../assets/skills/MySQL.svg';
import nodejsSvg   from '../../assets/skills/Node.js.svg';
import postgresSvg from '../../assets/skills/PostgresSQL.svg';
import postmanSvg  from '../../assets/skills/Postman.svg';
import pythonSvg   from '../../assets/skills/Python.svg';
import reactSvg    from '../../assets/skills/React.svg';
import tailwindSvg from '../../assets/skills/Tailwind CSS.svg';
import vitejsSvg   from '../../assets/skills/Vite.js.svg';
import expressSvg  from '../../assets/skills/express-js.svg';

export const SKILL_GROUPS = [
  {
    label: 'Languages',
    skills: [
      { id: 'javascript', title: 'JavaScript', iconSrc: jsSvg,      color: '#D4A017' },
      { id: 'python',     title: 'Python',     iconSrc: pythonSvg,  color: '#3776AB' },
      { id: 'java',       title: 'Java',       iconSrc: javaSvg,    color: '#E76F00' },
      { id: 'html5',      title: 'HTML5',      iconSrc: html5Svg,   color: '#E44D26' },
      { id: 'css3',       title: 'CSS3',       iconSrc: css3Svg,    color: '#2965F1' },
    ],
  },
  {
    label: 'Frontend',
    skills: [
      { id: 'react',    title: 'React',    iconSrc: reactSvg,    color: '#087EA4' },
      { id: 'tailwind', title: 'Tailwind', iconSrc: tailwindSvg, color: '#0EA5E9' },
      { id: 'vitejs',   title: 'Vite.js',  iconSrc: vitejsSvg,   color: '#A259FF' },
    ],
  },
  {
    label: 'Backend & Runtime',
    skills: [
      { id: 'nodejs',  title: 'Node.js', iconSrc: nodejsSvg,  color: '#3C873A' },
      { id: 'express', title: 'Express', iconSrc: expressSvg, color: '#404040', invertIcon: true },
      { id: 'postman', title: 'Postman', iconSrc: postmanSvg, color: '#EF5B25' },
    ],
  },
  {
    label: 'Databases',
    skills: [
      { id: 'mongodb',  title: 'MongoDB',    iconSrc: mongodbSvg,  color: '#00684A' },
      { id: 'mysql',    title: 'MySQL',      iconSrc: mysqlSvg,    color: '#00758F' },
      { id: 'postgres', title: 'PostgreSQL', iconSrc: postgresSvg, color: '#336791' },
    ],
  },
  {
    label: 'DevOps & Cloud',
    skills: [
      { id: 'aws',    title: 'AWS',    iconSrc: awsSvg,    color: '#FF9900' },
      { id: 'git',    title: 'Git',    iconSrc: gitSvg,    color: '#F05032' },
      { id: 'github', title: 'GitHub', iconSrc: githubSvg, color: '#24292E', invertIcon: true },
    ],
  },
];

export const ALL_SKILLS = SKILL_GROUPS.flatMap((g) => g.skills);
