// Auto-updates stats.svg, streak.svg, top-langs.svg, contribution-chart.svg, and README.md active tech badges
// Queries ALL repositories with full GraphQL cursor pagination (no 100-repo star limit!)
// Host all SVGs directly in-repo so images NEVER break or time out (100% all-time uptime).

import fs from 'node:fs';
import path from 'node:path';

const USERNAME = process.env.GITHUB_USERNAME || 'rowshanara01';
const TOKEN = process.env.GITHUB_TOKEN || '';

const LANG_COLORS = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  CSS: '#663399',
  HTML: '#e34c26',
  Python: '#3572A5',
  PHP: '#4F5D95',
  Blade: '#f7523f',
  Vue: '#41b883',
  MDX: '#fcb32c',
  'Jupyter Notebook': '#DA5B0B',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Dart: '#00B4AB',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Ruby: '#701516',
  SCSS: '#c6538c',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  Svelte: '#ff3e00',
  Astro: '#ff5a03',
  Solidity: '#AA6746',
  SQL: '#e38c00',
};

const TECH_BADGE_MAP = {
  typescript: { label: 'TypeScript', color: '3178C6', logo: 'typescript', logoColor: 'white' },
  javascript: { label: 'JavaScript', color: 'F7DF1E', logo: 'javascript', logoColor: 'black' },
  python: { label: 'Python', color: '3776AB', logo: 'python', logoColor: 'white' },
  css: { label: 'CSS3', color: '1572B6', logo: 'css3', logoColor: 'white' },
  html: { label: 'HTML5', color: 'E34F26', logo: 'html5', logoColor: 'white' },
  php: { label: 'PHP', color: '777BB4', logo: 'php', logoColor: 'white' },
  blade: { label: 'Laravel Blade', color: 'FF2D20', logo: 'laravel', logoColor: 'white' },
  vue: { label: 'Vue.js', color: '4FC08D', logo: 'vuedotjs', logoColor: 'white' },
  mdx: { label: 'MDX', color: '1B1F24', logo: 'mdx', logoColor: 'white' },
  'jupyter notebook': { label: 'Jupyter', color: 'F37626', logo: 'jupyter', logoColor: 'white' },
  c: { label: 'C', color: 'A8B9CC', logo: 'c', logoColor: 'black' },
  'c++': { label: 'C++', color: '00599C', logo: 'cplusplus', logoColor: 'white' },
  'c#': { label: 'C#', color: '239120', logo: 'csharp', logoColor: 'white' },
  java: { label: 'Java', color: 'ED8B00', logo: 'openjdk', logoColor: 'white' },
  go: { label: 'Go', color: '00ADD8', logo: 'go', logoColor: 'white' },
  rust: { label: 'Rust', color: '000000', logo: 'rust', logoColor: 'white' },
  dart: { label: 'Dart', color: '0175C2', logo: 'dart', logoColor: 'white' },
  flutter: { label: 'Flutter', color: '02569B', logo: 'flutter', logoColor: 'white' },
  kotlin: { label: 'Kotlin', color: '7F52FF', logo: 'kotlin', logoColor: 'white' },
  swift: { label: 'Swift', color: 'F05138', logo: 'swift', logoColor: 'white' },
  scss: { label: 'Sass/SCSS', color: 'CC6699', logo: 'sass', logoColor: 'white' },
  shell: { label: 'Shell', color: '4EAA25', logo: 'gnubash', logoColor: 'white' },
  dockerfile: { label: 'Docker', color: '2496ED', logo: 'docker', logoColor: 'white' },
  docker: { label: 'Docker', color: '2496ED', logo: 'docker', logoColor: 'white' },
  react: { label: 'React', color: '61DAFB', logo: 'react', logoColor: 'black' },
  nextjs: { label: 'Next.js', color: '000000', logo: 'nextdotjs', logoColor: 'white' },
  'next-js': { label: 'Next.js', color: '000000', logo: 'nextdotjs', logoColor: 'white' },
  nodejs: { label: 'Node.js', color: '339933', logo: 'nodedotjs', logoColor: 'white' },
  tailwindcss: { label: 'Tailwind CSS', color: '06B6D4', logo: 'tailwindcss', logoColor: 'white' },
  laravel: { label: 'Laravel', color: 'FF2D20', logo: 'laravel', logoColor: 'white' },
  django: { label: 'Django', color: '092E20', logo: 'django', logoColor: 'white' },
  fastapi: { label: 'FastAPI', color: '009688', logo: 'fastapi', logoColor: 'white' },
  flask: { label: 'Flask', color: '000000', logo: 'flask', logoColor: 'white' },
  mongodb: { label: 'MongoDB', color: '47A248', logo: 'mongodb', logoColor: 'white' },
  postgresql: { label: 'PostgreSQL', color: '316192', logo: 'postgresql', logoColor: 'white' },
  mysql: { label: 'MySQL', color: '4479A1', logo: 'mysql', logoColor: 'white' },
  svelte: { label: 'Svelte', color: 'FF3E00', logo: 'svelte', logoColor: 'white' },
  astro: { label: 'Astro', color: 'BC52EE', logo: 'astro', logoColor: 'white' },
  graphql: { label: 'GraphQL', color: 'E10098', logo: 'graphql', logoColor: 'white' },
  openai: { label: 'OpenAI', color: '412991', logo: 'openai', logoColor: 'white' },
  langchain: { label: 'LangChain', color: '1C3C3C', logo: 'langchain', logoColor: 'white' },
  pytorch: { label: 'PyTorch', color: 'EE4C2C', logo: 'pytorch', logoColor: 'white' },
  tensorflow: { label: 'TensorFlow', color: 'FF6F00', logo: 'tensorflow', logoColor: 'white' },
};

async function graphql(query, variables = {}) {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'rowshanara-profile-updater',
      Authorization: 'bearer ' + TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    throw new Error('GitHub GraphQL error: ' + res.status + ' ' + (await res.text()));
  }
  const json = await res.json();
  if (json.errors) {
    throw new Error('GraphQL errors: ' + JSON.stringify(json.errors));
  }
  return json.data;
}

function exponentialCdf(x) {
  return 1 - Math.pow(2, -x);
}

function logNormalCdf(x) {
  return x / (1 + x);
}

function calculateRank({ allCommits, commits, prs, issues, reviews, stars, followers }) {
  const COMMITS_MEDIAN = allCommits ? 1000 : 250;
  const COMMITS_WEIGHT = 2;
  const PRS_MEDIAN = 50;
  const PRS_WEIGHT = 3;
  const ISSUES_MEDIAN = 25;
  const ISSUES_WEIGHT = 1;
  const REVIEWS_MEDIAN = 2;
  const REVIEWS_WEIGHT = 1;
  const STARS_MEDIAN = 50;
  const STARS_WEIGHT = 4;
  const FOLLOWERS_MEDIAN = 10;
  const FOLLOWERS_WEIGHT = 1;

  const TOTAL_WEIGHT =
    COMMITS_WEIGHT + PRS_WEIGHT + ISSUES_WEIGHT + REVIEWS_WEIGHT + STARS_WEIGHT + FOLLOWERS_WEIGHT;

  const THRESHOLDS = [1, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
  const LEVELS = ['S+', 'S', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C'];

  const rank =
    1 -
    (COMMITS_WEIGHT * exponentialCdf(commits / COMMITS_MEDIAN) +
      PRS_WEIGHT * exponentialCdf(prs / PRS_MEDIAN) +
      ISSUES_WEIGHT * exponentialCdf(issues / ISSUES_MEDIAN) +
      REVIEWS_WEIGHT * exponentialCdf(reviews / REVIEWS_MEDIAN) +
      STARS_WEIGHT * logNormalCdf(stars / STARS_MEDIAN) +
      FOLLOWERS_WEIGHT * logNormalCdf(followers / FOLLOWERS_MEDIAN)) /
      TOTAL_WEIGHT;

  const percentile = rank * 100;
  const level = LEVELS[THRESHOLDS.findIndex((t) => percentile <= t)] || 'C';
  return { level, percentile };
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatNumber(n) {
  if (n >= 10000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

function formatShortDate(isoDate) {
  if (!isoDate) return '';
  const d = new Date(isoDate + 'T00:00:00Z');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

function formatFullDate(isoDate) {
  if (!isoDate) return '';
  const d = new Date(isoDate + 'T00:00:00Z');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

function computeStreaks(days) {
  // days is sorted ascending by date: [{ date: 'YYYY-MM-DD', contributionCount: number }]
  const totalContributions = days.reduce((s, d) => s + d.contributionCount, 0);
  const firstActive = days.find((d) => d.contributionCount > 0)?.date || days[0]?.date || '';

  let longestStreak = 0;
  let longestStart = '';
  let longestEnd = '';

  let run = 0;
  let runStart = '';
  for (const d of days) {
    if (d.contributionCount > 0) {
      if (run === 0) runStart = d.date;
      run++;
      if (run >= longestStreak) {
        longestStreak = run;
        longestStart = runStart;
        longestEnd = d.date;
      }
    } else {
      run = 0;
    }
  }

  // Current streak: check backwards from today (allowing today to be 0 if day isn't finished yet)
  let currentStreak = 0;
  let currentStart = '';
  let currentEnd = '';

  let idx = days.length - 1;
  if (idx >= 0 && days[idx].contributionCount === 0 && idx - 1 >= 0 && days[idx - 1].contributionCount > 0) {
    idx--;
  }
  if (idx >= 0 && days[idx].contributionCount > 0) {
    currentEnd = days[idx].date;
    while (idx >= 0 && days[idx].contributionCount > 0) {
      currentStart = days[idx].date;
      currentStreak++;
      idx--;
    }
  }

  return {
    totalContributions,
    firstActive,
    currentStreak,
    currentStart,
    currentEnd,
    longestStreak,
    longestStart,
    longestEnd,
  };
}

function renderStatsSvg({ displayName, totalStars, totalCommits, totalPrs, totalIssues, contributedTo, rank }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(5, Math.min(98, 100 - rank.percentile));
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return `<svg
  width="467"
  height="195"
  viewBox="0 0 467 195"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-labelledby="descId"
>
  <title id="titleId">${escapeXml(displayName)}'s GitHub Stats, Rank: ${rank.level}</title>
  <desc id="descId">Total Stars Earned: ${totalStars}, Total Commits: ${totalCommits}, Total PRs: ${totalPrs}, Total Issues: ${totalIssues}, Contributed to (last year): ${contributedTo}</desc>
  <style>
    .header {
      font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
      fill: #58a6ff;
      animation: fadeInAnimation 0.8s ease-in-out forwards;
    }
    .stat {
      font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif;
      fill: #8b949e;
    }
    .stagger {
      opacity: 0;
      animation: fadeInAnimation 0.3s ease-in-out forwards;
    }
    .rank-text {
      font: 800 24px 'Segoe UI', Ubuntu, Sans-Serif;
      fill: #8b949e;
      animation: scaleInAnimation 0.3s ease-in-out forwards;
    }
    .bold { font-weight: 700; }
    .icon { fill: #1f6feb; display: block; }
    .rank-circle-rim {
      stroke: #58a6ff;
      fill: none;
      stroke-width: 6;
      opacity: 0.2;
    }
    .rank-circle {
      stroke: #58a6ff;
      stroke-dasharray: ${circumference.toFixed(2)};
      fill: none;
      stroke-width: 6;
      stroke-linecap: round;
      opacity: 0.8;
      transform-origin: -10px 8px;
      transform: rotate(-90deg);
      animation: rankAnimation 1s forwards ease-in-out;
    }
    @keyframes rankAnimation {
      from { stroke-dashoffset: ${circumference.toFixed(2)}; }
      to { stroke-dashoffset: ${strokeDashoffset.toFixed(2)}; }
    }
    @keyframes scaleInAnimation {
      from { transform: translate(-5px, 5px) scale(0); }
      to { transform: translate(-5px, 5px) scale(1); }
    }
    @keyframes fadeInAnimation {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  </style>

  <rect data-testid="card-bg" x="0.5" y="0.5" rx="4.5" height="194" stroke="#21262d" width="466" fill="#0d1117" stroke-opacity="0"/>

  <g data-testid="card-title" transform="translate(25, 35)">
    <text x="0" y="0" class="header" data-testid="header">${escapeXml(displayName)}'s GitHub Stats</text>
  </g>

  <g data-testid="main-card-body" transform="translate(0, 55)">
    <g data-testid="rank-circle" transform="translate(390.5, 47.5)">
      <circle class="rank-circle-rim" cx="-10" cy="8" r="40" />
      <circle class="rank-circle" cx="-10" cy="8" r="40" />
      <g class="rank-text">
        <text x="-5" y="3" alignment-baseline="central" dominant-baseline="central" text-anchor="middle" data-testid="level-rank-icon">${rank.level}</text>
      </g>
    </g>

    <svg x="0" y="0">
      <g transform="translate(0, 0)">
        <g class="stagger" style="animation-delay: 450ms" transform="translate(25, 0)">
          <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
            <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"/>
          </svg>
          <text class="stat bold" x="25" y="12.5">Total Stars Earned:</text>
          <text class="stat bold" x="219.01" y="12.5" data-testid="stars">${formatNumber(totalStars)}</text>
        </g>
      </g>
      <g transform="translate(0, 25)">
        <g class="stagger" style="animation-delay: 600ms" transform="translate(25, 0)">
          <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
            <path fill-rule="evenodd" d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z"/>
          </svg>
          <text class="stat bold" x="25" y="12.5">Total Commits:</text>
          <text class="stat bold" x="219.01" y="12.5" data-testid="commits">${formatNumber(totalCommits)}</text>
        </g>
      </g>
      <g transform="translate(0, 50)">
        <g class="stagger" style="animation-delay: 750ms" transform="translate(25, 0)">
          <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
            <path fill-rule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>
          </svg>
          <text class="stat bold" x="25" y="12.5">Total PRs:</text>
          <text class="stat bold" x="219.01" y="12.5" data-testid="prs">${formatNumber(totalPrs)}</text>
        </g>
      </g>
      <g transform="translate(0, 75)">
        <g class="stagger" style="animation-delay: 900ms" transform="translate(25, 0)">
          <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
            <path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"/>
          </svg>
          <text class="stat bold" x="25" y="12.5">Total Issues:</text>
          <text class="stat bold" x="219.01" y="12.5" data-testid="issues">${formatNumber(totalIssues)}</text>
        </g>
      </g>
      <g transform="translate(0, 100)">
        <g class="stagger" style="animation-delay: 1050ms" transform="translate(25, 0)">
          <svg data-testid="icon" class="icon" viewBox="0 0 16 16" version="1.1" width="16" height="16">
            <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
          </svg>
          <text class="stat bold" x="25" y="12.5">Contributed to (last year):</text>
          <text class="stat bold" x="219.01" y="12.5" data-testid="contribs">${formatNumber(contributedTo)}</text>
        </g>
      </g>
    </svg>
  </g>
</svg>`;
}

function renderStreakSvg({ totalContributions, firstActive, currentStreak, currentStart, currentEnd, longestStreak, longestStart, longestEnd }) {
  const totalRange = firstActive ? formatFullDate(firstActive) + ' - Present' : 'All Time';
  const currRange = currentStreak > 0 ? formatShortDate(currentStart) + ' - ' + formatShortDate(currentEnd) : 'No active streak';
  const longRange = longestStreak > 0 ? formatShortDate(longestStart) + ' - ' + formatShortDate(longestEnd) : 'No streak';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 467 195" width="467" height="195" role="img" aria-label="GitHub Contribution Streak">
  <title>Contribution Streak: ${currentStreak} days current, ${longestStreak} days longest, ${totalContributions} total</title>
  <style>
    .num { font: 700 28px 'Segoe UI', Ubuntu, Sans-Serif; fill: #c9d1d9; }
    .lbl { font: 400 13.5px 'Segoe UI', Ubuntu, Sans-Serif; fill: #8b949e; }
    .clbl { font: 700 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: #58a6ff; }
    .dt { font: 400 11.5px 'Segoe UI', Ubuntu, Sans-Serif; fill: #8b949e; }
  </style>
  <rect x="0.5" y="0.5" width="466" height="194" rx="4.5" fill="#0d1117" stroke="#21262d" stroke-opacity="0"/>
  <line x1="155" y1="28" x2="155" y2="170" stroke="#21262d" stroke-width="1"/>
  <line x1="312" y1="28" x2="312" y2="170" stroke="#21262d" stroke-width="1"/>

  <g transform="translate(77.5, 0)">
    <text class="num" x="0" y="84" text-anchor="middle">${totalContributions}</text>
    <text class="lbl" x="0" y="114" text-anchor="middle">Total Contributions</text>
    <text class="dt" x="0" y="142" text-anchor="middle">${escapeXml(totalRange)}</text>
  </g>

  <g transform="translate(233.5, 0)">
    <circle cx="0" cy="70" r="39" fill="none" stroke="#58a6ff" stroke-width="4.5"/>
    <circle cx="0" cy="31" r="11" fill="#0d1117"/>
    <path d="M 0 21 C 4.2 26.2 6.5 29.8 6.5 33.4 C 6.5 37.2 3.6 39.8 0 39.8 C -3.6 39.8 -6.5 37.2 -6.5 33.4 C -6.5 29.8 -4.2 26.2 0 21 Z M 0 30.2 C -1.5 32.1 -2.3 33.5 -2.3 34.9 C -2.3 36.2 -1.3 37.2 0 37.2 C 1.3 37.2 2.3 36.2 2.3 34.9 C 2.3 33.5 1.5 32.1 0 30.2 Z" fill="#e3b341"/>
    <text class="num" x="0" y="80" text-anchor="middle">${currentStreak}</text>
    <text class="clbl" x="0" y="133" text-anchor="middle">Current Streak</text>
    <text class="dt" x="0" y="156" text-anchor="middle">${escapeXml(currRange)}</text>
  </g>

  <g transform="translate(389.5, 0)">
    <text class="num" x="0" y="84" text-anchor="middle">${longestStreak}</text>
    <text class="lbl" x="0" y="114" text-anchor="middle">Longest Streak</text>
    <text class="dt" x="0" y="142" text-anchor="middle">${escapeXml(longRange)}</text>
  </g>
</svg>`;
}

function renderTopLangsSvg(langList) {
  const top = langList.slice(0, 12);
  const totalBytes = top.reduce((s, l) => s + l.size, 0) || 1;
  const barWidth = 286;
  const cardWidth = 326;
  const rows = Math.ceil(top.length / 2);
  const cardHeight = 46 + rows * 16 + 12;

  let currentX = 0;
  const progressBars = top
    .map((l) => {
      const w = (l.size / totalBytes) * barWidth;
      const rect = `      <rect mask="url(#rect-mask)" data-testid="lang-progress" x="${currentX.toFixed(2)}" y="0" width="${w.toFixed(2)}" height="6" fill="${l.color}" />`;
      currentX += w;
      return rect;
    })
    .join('\n');

  const leftCol = top.slice(0, rows);
  const rightCol = top.slice(rows);

  const renderCol = (items, colX) => {
    const itemsSvg = items
      .map((l, idx) => {
        const pct = ((l.size / totalBytes) * 100).toFixed(2);
        const delay = 450 + idx * 120;
        const label = l.name.length > 15 ? l.name.slice(0, 14) + '…' : l.name;
        return `        <g transform="translate(0, ${idx * 16})">
          <g class="stagger" style="animation-delay: ${delay}ms">
            <circle cx="4" cy="5" r="3.8" fill="${l.color}" />
            <text data-testid="lang-name" x="13" y="8.5" class="lang-name">${escapeXml(label)} ${pct}%</text>
          </g>
        </g>`;
      })
      .join('\n');
    return `      <g transform="translate(${colX}, 0)">\n${itemsSvg}\n      </g>`;
  };

  const desc = top.map((l) => `${l.name} ${((l.size / totalBytes) * 100).toFixed(2)}%`).join(', ');

  return `<svg
  width="${cardWidth}"
  height="${cardHeight}"
  viewBox="0 0 ${cardWidth} ${cardHeight}"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-labelledby="descId"
>
  <title id="titleId">Most Used Languages</title>
  <desc id="descId">${escapeXml(desc)}</desc>
  <style>
    .header {
      font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif;
      fill: #58a6ff;
      animation: fadeInAnimation 0.8s ease-in-out forwards;
    }
    .lang-name {
      font: 400 10px "Segoe UI", Ubuntu, Sans-Serif;
      fill: #8b949e;
    }
    .stagger {
      opacity: 0;
      animation: fadeInAnimation 0.3s ease-in-out forwards;
    }
    @keyframes fadeInAnimation {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  </style>

  <rect data-testid="card-bg" x="0.5" y="0.5" rx="4.5" height="${cardHeight - 1}" stroke="#e4e2e2" width="${cardWidth - 1}" fill="#0d1117" stroke-opacity="0"/>

  <g data-testid="card-title" transform="translate(20, 22)">
    <text x="0" y="0" class="header" data-testid="header">Most Used Languages</text>
  </g>

  <g data-testid="main-card-body" transform="translate(0, 32)">
    <svg data-testid="lang-items" x="20">
      <mask id="rect-mask">
        <rect x="0" y="0" width="${barWidth}" height="6" fill="white" rx="3"/>
      </mask>
${progressBars}
      <g transform="translate(0, 16)">
${renderCol(leftCol, 0)}
${renderCol(rightCol, 146)}
      </g>
    </svg>
  </g>
</svg>`;
}

function renderContributionChartSvg(weeks) {
  const recentWeeks = weeks.slice(-53);
  const cell = 11.5;
  const gap = 3.5;
  const step = cell + gap;
  const leftPad = 42;
  const topPad = 36;
  const width = leftPad + recentWeeks.length * step + 18;
  const height = topPad + 7 * step + 34;

  const levelColor = (count) => {
    if (count === 0) return '#161b22';
    if (count <= 2) return '#0e4429';
    if (count <= 5) return '#006d32';
    if (count <= 9) return '#26a641';
    return '#39d353';
  };
  const blueScale = (count) => {
    if (count === 0) return '#161b22';
    if (count <= 2) return '#0c2d6b';
    if (count <= 5) return '#1158c7';
    if (count <= 9) return '#1f6feb';
    return '#58a6ff';
  };
  void levelColor;

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let lastMonth = -1;
  const monthLabels = [];
  const cells = [];

  recentWeeks.forEach((w, wi) => {
    const firstDay = w.contributionDays[0];
    if (firstDay) {
      const m = new Date(firstDay.date + 'T00:00:00Z').getUTCMonth();
      if (m !== lastMonth) {
        lastMonth = m;
        monthLabels.push(
          `<text x="${leftPad + wi * step}" y="22" class="lbl">${monthNames[m]}</text>`
        );
      }
    }
    w.contributionDays.forEach((d, di) => {
      const x = leftPad + wi * step;
      const y = topPad + di * step;
      cells.push(
        `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${cell}" height="${cell}" rx="2.5" fill="${blueScale(d.contributionCount)}"><title>${d.date}: ${d.contributionCount} contributions</title></rect>`
      );
    });
  });

  const totalLastYear = recentWeeks.reduce(
    (s, w) => s + w.contributionDays.reduce((ds, d) => ds + d.contributionCount, 0),
    0
  );

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="Contribution Heatmap">
  <title>Contribution Activity Heatmap (${totalLastYear} contributions in the last year)</title>
  <style>
    .lbl { font: 400 10.5px 'Segoe UI', Ubuntu, Sans-Serif; fill: #8b949e; }
    .hdr { font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: #58a6ff; }
  </style>
  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="8" fill="#0d1117" stroke="#21262d"/>
  ${monthLabels.join('\n  ')}
  <text x="12" y="${topPad + 1 * step + 9}" class="lbl">Mon</text>
  <text x="12" y="${topPad + 3 * step + 9}" class="lbl">Wed</text>
  <text x="12" y="${topPad + 5 * step + 9}" class="lbl">Fri</text>
  ${cells.join('\n  ')}
  <text x="${leftPad}" y="${height - 12}" class="hdr">${totalLastYear} contributions in the last 12 months</text>
  <g transform="translate(${width - 140}, ${height - 22})">
    <text x="0" y="9" class="lbl">Less</text>
    <rect x="28" y="0" width="10" height="10" rx="2" fill="#161b22"/>
    <rect x="41" y="0" width="10" height="10" rx="2" fill="#0c2d6b"/>
    <rect x="54" y="0" width="10" height="10" rx="2" fill="#1158c7"/>
    <rect x="67" y="0" width="10" height="10" rx="2" fill="#1f6feb"/>
    <rect x="80" y="0" width="10" height="10" rx="2" fill="#58a6ff"/>
    <text x="95" y="9" class="lbl">More</text>
  </g>
</svg>`;
}

function buildTechBadge(techName) {
  const key = techName.toLowerCase().trim();
  const known = TECH_BADGE_MAP[key];
  if (known) {
    const encoded = encodeURIComponent(known.label);
    return `![${known.label}](https://img.shields.io/badge/-${encoded}-${known.color}?style=flat-square&logo=${known.logo}&logoColor=${known.logoColor})`;
  }
  const cleanLabel = techName.trim();
  const encoded = encodeURIComponent(cleanLabel);
  return `![${cleanLabel}](https://img.shields.io/badge/-${encoded}-1f6feb?style=flat-square)`;
}

function updateReadmeAutoTech(readmePath, { activeTechs, repoCount, totalStars }) {
  if (!fs.existsSync(readmePath)) return;
  let content = fs.readFileSync(readmePath, 'utf8');
  const startMarker = '<!-- AUTO-TECH-START -->';
  const endMarker = '<!-- AUTO-TECH-END -->';
  if (!content.includes(startMarker) || !content.includes(endMarker)) return;

  const badges = activeTechs.map(buildTechBadge).join('\n');
  const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
  const replacement = `${startMarker}
${badges}
<br/>
<sub>⚡ Auto-synced across <b>${repoCount}</b> repositories · <b>${totalStars}</b> stars earned · Updated <code>${timestamp}</code></sub>
${endMarker}`;

  const regex = new RegExp(startMarker + '[\\s\\S]*?' + endMarker, 'm');
  content = content.replace(regex, replacement);
  fs.writeFileSync(readmePath, content, 'utf8');
}

async function main() {
  if (!TOKEN) {
    console.error('GITHUB_TOKEN is required to run full GraphQL pagination.');
    process.exit(1);
  }

  let cursor = null;
  let allRepos = [];
  let userMeta = null;

  while (true) {
    const data = await graphql(
      `query($login: String!, $cursor: String) {
        user(login: $login) {
          name
          login
          followers { totalCount }
          pullRequests(first: 1) { totalCount }
          issues(first: 1) { totalCount }
          repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) { totalCount }
          contributionsCollection {
            contributionYears
            totalPullRequestReviewContributions
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
          repositories(first: 100, after: $cursor, ownerAffiliations: OWNER, isFork: false, orderBy: {field: PUSHED_AT, direction: DESC}) {
            pageInfo { hasNextPage endCursor }
            nodes {
              name
              stargazerCount
              pushedAt
              primaryLanguage { name color }
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node { name color }
                }
              }
              repositoryTopics(first: 10) {
                nodes { topic { name } }
              }
            }
          }
        }
      }`,
      { login: USERNAME, cursor }
    );

    const user = data.user;
    if (!userMeta) userMeta = user;
    allRepos.push(...user.repositories.nodes);
    if (!user.repositories.pageInfo.hasNextPage) break;
    cursor = user.repositories.pageInfo.endCursor;
  }

  // Fetch total commits & full daily calendar across ALL contribution years
  const years = [...(userMeta.contributionsCollection.contributionYears || [new Date().getUTCFullYear()])].sort((a, b) => a - b);
  const yearFields = years
    .map(
      (y) =>
        `y${y}: contributionsCollection(from: "${y}-01-01T00:00:00Z", to: "${y}-12-31T23:59:59Z") {
          totalCommitContributions
          restrictedContributionsCount
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }`
    )
    .join('\n');

  const yearsData = await graphql(`query($login: String!) { user(login: $login) { ${yearFields} } }`, { login: USERNAME });
  let totalCommits = 0;
  const dayMap = new Map();
  const todayIso = new Date().toISOString().slice(0, 10);

  for (const y of years) {
    const col = yearsData.user['y' + y];
    if (col) {
      totalCommits += (col.totalCommitContributions || 0) + (col.restrictedContributionsCount || 0);
      for (const w of col.contributionCalendar?.weeks || []) {
        for (const d of w.contributionDays || []) {
          if (d.date <= todayIso) {
            const prev = dayMap.get(d.date) || 0;
            dayMap.set(d.date, Math.max(prev, d.contributionCount || 0));
          }
        }
      }
    }
  }

  const allDays = Array.from(dayMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, contributionCount]) => ({ date, contributionCount }));

  const streakStats = computeStreaks(allDays);

  // Sum stars across ALL repositories (zero 100-repo cap!)
  const totalStars = allRepos.reduce((sum, r) => sum + (r.stargazerCount || 0), 0);
  const totalPrs = userMeta.pullRequests.totalCount || 0;
  const totalIssues = userMeta.issues.totalCount || 0;
  const contributedTo = userMeta.repositoriesContributedTo.totalCount || 0;
  const followers = userMeta.followers.totalCount || 0;
  const reviews = userMeta.contributionsCollection.totalPullRequestReviewContributions || 0;

  const rank = calculateRank({
    allCommits: true,
    commits: totalCommits,
    prs: totalPrs,
    issues: totalIssues,
    reviews,
    stars: totalStars,
    followers,
  });

  // Aggregate language bytes across ALL repositories
  const langTotals = new Map();
  const recentTechSet = new Set();

  for (const repo of allRepos) {
    if (repo.primaryLanguage?.name) {
      recentTechSet.add(repo.primaryLanguage.name);
    }
    for (const edge of repo.languages?.edges || []) {
      const name = edge.node.name;
      const color = edge.node.color || LANG_COLORS[name] || '#58a6ff';
      const prev = langTotals.get(name) || { name, color, size: 0 };
      prev.size += edge.size;
      langTotals.set(name, prev);
      recentTechSet.add(name);
    }
    for (const t of repo.repositoryTopics?.nodes || []) {
      if (t?.topic?.name) recentTechSet.add(t.topic.name);
    }
  }

  const sortedLangs = Array.from(langTotals.values()).sort((a, b) => b.size - a.size);
  const orderedTechs = [];
  const seenLower = new Set();
  for (const l of sortedLangs) {
    const low = l.name.toLowerCase();
    if (!seenLower.has(low)) {
      seenLower.add(low);
      orderedTechs.push(l.name);
    }
  }
  for (const t of recentTechSet) {
    const low = t.toLowerCase();
    if (!seenLower.has(low)) {
      seenLower.add(low);
      orderedTechs.push(t);
    }
  }

  const displayName = userMeta.name || USERNAME;
  const recentWeeks = userMeta.contributionsCollection.contributionCalendar?.weeks || [];

  fs.writeFileSync(
    path.resolve(process.cwd(), 'stats.svg'),
    renderStatsSvg({ displayName, totalStars, totalCommits, totalPrs, totalIssues, contributedTo, rank }),
    'utf8'
  );
  fs.writeFileSync(
    path.resolve(process.cwd(), 'streak.svg'),
    renderStreakSvg(streakStats),
    'utf8'
  );
  fs.writeFileSync(
    path.resolve(process.cwd(), 'top-langs.svg'),
    renderTopLangsSvg(sortedLangs),
    'utf8'
  );
  fs.writeFileSync(
    path.resolve(process.cwd(), 'contribution-chart.svg'),
    renderContributionChartSvg(recentWeeks),
    'utf8'
  );
  updateReadmeAutoTech(path.resolve(process.cwd(), 'README.md'), {
    activeTechs: orderedTechs.slice(0, 24),
    repoCount: allRepos.length,
    totalStars,
  });

  console.log('Updated profile metrics:', {
    repos: allRepos.length,
    totalStars,
    totalCommits,
    streakStats,
    rank: rank.level,
    topLanguages: sortedLangs.slice(0, 12).map((l) => l.name),
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
