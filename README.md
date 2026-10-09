<div align="center">
  <!-- Dynamic Typing Header -->
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=30&duration=2800&pause=1200&color=58A6FF&center=true&vCenter=true&width=620&lines=Full-Stack%20Software%20Engineer%20%E2%9A%A1;Agentic%20AI%20%26%20Web%20Solutions%20Architect%20%F0%9F%8C%90;React%20%C2%B7%20Next.js%20%C2%B7%20Node.js%20%C2%B7%20TypeScript%20%F0%9F%9A%80;Multi-Tenant%20SaaS%20Developer%20%40%20EasilyPro%20%F0%9F%92%A1;Open%20to%20Collaborate%20%26%20Hire%20%F0%9F%A4%9D" alt="Typing SVG" />
  <br/><br/>

  <!-- Terminal Session Status -->
  <img src="./boot.svg" alt="rowshanara01@production — Full-Stack Software Engineer, service running, 2+ years uptime" width="100%"/>
  <br/><br/>

  <!-- Microservice Status Badges -->
  <img src="https://img.shields.io/badge/version-2.4.0-58a6ff?style=flat-square&labelColor=0d1117" alt="version"/>
  <img src="https://img.shields.io/badge/build-passing-3fb950?style=flat-square&labelColor=0d1117" alt="build passing"/>
  <img src="https://img.shields.io/badge/uptime-2%2B%20years-3fb950?style=flat-square&labelColor=0d1117" alt="uptime"/>
  <img src="https://img.shields.io/badge/region-Dhaka_·_UTC%2B6-8b949e?style=flat-square&labelColor=0d1117" alt="region Dhaka UTC+6"/>
  <a href="https://github.com/rowshanara01"><img src="https://komarev.com/ghpvc/?username=rowshanara01&label=requests&color=1f6feb&style=flat-square" alt="profile views"/></a>
</div>

<img src="./divider.svg" width="100%"/>

## `GET /about`

```jsonc
{
  "name": "Rowshanara Akhter",
  "role": "Full-Stack Software Engineer",
  "experience": "2+ years",
  "company": "EasilyPro",
  "location": "Dhaka, Bangladesh 🇧🇩",
  "specialty": "architecting intelligent agentic workflows & high-performance SaaS platforms",
  "currently": {
    "building": "multi-tenant SaaS platforms & AI agent-driven recruiting systems",
    "learning": [
        "Agentic AI workflows",
        "Distributed system architecture",
        "LLM tool calling & reasoning"
    ],
    "reading": "system architecture & AI workflow benchmarks"
  },
  "principles": [
      "First, understand the system domain. Then, architect the pipeline.",
      "Clean interfaces, deterministic data flow, and resilient state.",
      "Empower humans with autonomous, testable AI tool chains."
  ],
  "openTo": [
      "full-time opportunities",
      "innovative SaaS contracts",
      "open source AI tooling"
  ]
}
```

<img src="./divider.svg" width="100%"/>

## `GET /architecture`

The system architecture I build and optimize daily — modern client layers, resilient API gateway, intelligent AI orchestrators, relational & document stores, automated deployment pipelines.

```mermaid
%%{init: {'theme':'base','themeVariables':{'primaryColor':'#161b22','primaryTextColor':'#c9d1d9','primaryBorderColor':'#30363d','lineColor':'#58a6ff','secondaryColor':'#161b22','tertiaryColor':'#0d1117','fontFamily':'monospace','clusterBkg':'#0d1117','clusterBorder':'#21262d'}}}%%
flowchart LR
    U([Client · React / Next.js]) -->|REST & GraphQL| GW[API Gateway / Ingress]
    U <-->|WebSocket| RT[Realtime Layer]
    GW --> AUTH[Auth & Multi-Tenant Guard]
    GW --> CORE[Core API · Node.js / Express / Laravel]
    GW --> AI[AI Agent Engine · Tool Calling / LLMs]
    CORE <--> DB[(PostgreSQL · MongoDB · MySQL)]
    CORE --> BUS{{Event Bus & Job Queue}}
    BUS --> WRK[Background Workers · Sync, Mail & Data]
    BUS --> RT
    subgraph DEPLOY [CI/CD & Cloud Infrastructure]
        DOC[Docker] --- VPS[VPS Server & Vercel]
    end
    WRK -.-> DEPLOY
```

<img src="./divider.svg" width="100%"/>

## `GET /endpoints`

| Method | Endpoint | Returns | Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/skills/frontend` | React · Next.js · TypeScript · Redux · Tailwind CSS | `200 OK` |
| `GET` | `/skills/backend` | Node.js · Express · REST APIs · Laravel · Microservices | `200 OK` |
| `GET` | `/skills/ai-agentic` | Agentic Workflows · Tool Calling · LLM Orchestration · OpenAI API | `200 OK` |
| `GET` | `/skills/data` | MongoDB · MySQL · PostgreSQL · Schema Optimization | `200 OK` |
| `GET` | `/skills/devops` | Git · GitHub Actions · Docker · VPS Automation · Vercel | `200 OK` |
| `GET` | `/learning` | distributed systems · agentic autonomous patterns · high-scale SaaS | `206 Partial Content` |
| `POST` | `/collaborate` | innovative SaaS platforms, agentic AI tools, open source | `202 Accepted` |
| `POST` | `/hire` | full-stack engineer and AI developer opportunities | `202 Accepted` |
| `DELETE` | `/tech-debt` | proactive refactors, modular architecture, performance audits | `204 No Content` |
| `GET` | `/free-time` | coding, reading technical specs, building side projects | `503 Service Unavailable` |

<img src="./divider.svg" width="100%"/>

## `GET /dependencies`

```jsonc
{
  "name": "@rowshanara01/software-engineer",
  "version": "2.4.0",
  "main": "problem-solving.ts",
  "engines": { "curiosity": ">=1.0.0", "coffee": "^2 cups/day" },
  "dependencies": {
    "typescript": "^5.x",
    "react": "^19.x",
    "next": "^15.x",
    "nodejs": "^22.x",
    "express": "^4.x",
    "mongodb": "*",
    "mysql": "*",
    "tailwindcss": "^4.x"
  },
  "devDependencies": {
    "agentic-ai": "^1.x",
    "docker": "*",
    "git": "*",
    "python": "^3.x",
    "postman": "*"
  },
  "scripts": {
    "start": "understand the core problem",
    "build": "architect clean scalable code",
    "deploy": "ship to production with automated tests"
  }
}
```

<div align="center">
  <br/>
  <img src="https://skillicons.dev/icons?i=react,nextjs,ts,js,tailwind,redux,html,css,nodejs,express,python,php,laravel&theme=dark" alt="frontend and backend"/>
  <br/><br/>
  <img src="https://skillicons.dev/icons?i=mongodb,mysql,postgres,docker,git,github,vscode,postman,vercel&theme=dark" alt="data and infrastructure"/>
</div>

<img src="./divider.svg" width="100%"/>

## `GET /projects`

<table width="100%" border="0">
  <tr>
    <td width="50%" valign="top" style="padding: 12px; background-color: #0d1117; border-radius: 8px;">
      <h4>🔵 <a href="https://ai-job-matcher-frontend-ebon.vercel.app/" target="_blank"><b>AI Job Matcher & Agentic Recruiter</b></a></h4>
      <sub><b>FEATURED AI PLATFORM</b></sub><br/>
      <p>AI-driven job matching platform connecting candidates with intelligent recommendations, resume analysis, and automated workflows.</p>
      <code>React / Node.js / Agentic AI / OpenAI API</code>
    </td>
    <td width="50%" valign="top" style="padding: 12px; background-color: #0d1117; border-radius: 8px;">
      <h4>🟣 <a href="https://amardokan-marketplace-ecommerce.vercel.app/" target="_blank"><b>AmarDokan Marketplace</b></a></h4>
      <sub><b>MULTI-VENDOR ECOMMERCE</b></sub><br/>
      <p>Full-featured e-commerce marketplace platform for multi-vendor stores with cart, secure checkout, and real-time inventory.</p>
      <code>Next.js / Node.js / MongoDB / Tailwind CSS</code>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top" style="padding: 12px; background-color: #0d1117; border-radius: 8px;">
      <h4>📘 <a href="https://persional-website-8fey.vercel.app/" target="_blank"><b>Developer Portfolio & Showcase</b></a></h4>
      <sub><b>INTERACTIVE WEB APP</b></sub><br/>
      <p>Interactive modern portfolio showcasing AI solutions, engineering projects, performance benchmarks, and contact avenues.</p>
      <code>React / TypeScript / Tailwind CSS / Motion</code>
    </td>
    <td width="50%" valign="top" style="padding: 12px; background-color: #0d1117; border-radius: 8px;">
      <h4>🟢 <a href="https://elite-ecommerce-shop.vercel.app" target="_blank"><b>Elite Ecommerce Shop</b></a></h4>
      <sub><b>PRODUCT SHOWCASE & STORE</b></sub><br/>
      <p>High-converting online shopping store featuring responsive UI design, lightning-fast rendering, and catalog filtering.</p>
      <code>Next.js / TypeScript / Tailwind CSS</code>
    </td>
  </tr>
</table>

<img src="./divider.svg" width="100%"/>

## `GET /metrics`

<div align="center">
  <img height="170" src="https://github-readme-stats.vercel.app/api?username=rowshanara01&show_icons=true&hide_border=true&include_all_commits=true&count_private=true&bg_color=0d1117&title_color=58a6ff&icon_color=1f6feb&text_color=8b949e" alt="GitHub stats"/>
  <img height="170" src="https://streak-stats.demolab.com?user=rowshanara01&hide_border=true&background=0d1117&stroke=21262d&ring=58a6ff&fire=e3b341&currStreakLabel=58a6ff&sideLabels=8b949e&dates=8b949e&currStreakNum=c9d1d9&sideNums=c9d1d9" alt="contribution streak"/>
  <br/><br/>
  <img height="150" src="https://github-readme-stats.vercel.app/api/top-langs/?username=rowshanara01&layout=compact&langs_count=8&hide_border=true&bg_color=0d1117&title_color=58a6ff&text_color=8b949e" alt="most used languages"/>
</div>

### `tail -f /var/log/commits`

<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=rowshanara01&hide_border=true&bg_color=0d1117&color=58a6ff&line=1f6feb&point=c9d1d9&area=true&area_color=1f6feb&custom_title=commit%20throughput%20·%20last%2031%20days" width="100%" alt="commit activity graph"/>
</div>

### `tail -f /var/log/contributions/snake`

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/rowshanara01/rowshanara01/output/github-contribution-grid-snake-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/rowshanara01/rowshanara01/output/github-contribution-grid-snake.svg">
    <img alt="github-snake" src="https://raw.githubusercontent.com/rowshanara01/rowshanara01/output/github-contribution-grid-snake.svg" width="100%">
  </picture>
</div>

<img src="./divider.svg" width="100%"/>

## `GET /changelog`

> **`v2.4.0`** — *current*
> Deep in Agentic AI workflows & multi-tenant SaaS architecture at EasilyPro. Resolving complex API integration, automated VPS deployments, and tenant-based security isolation.
>
> **`v2.0.0`** — the SaaS & full-stack leap
> Shipped full-stack marketplace systems, auth flows, MongoDB & MySQL database schemas, and AI job matching tools.
>
> **`v1.0.0`** — first commit
> React, modern JavaScript, component architecture, and continuous curiosity.

<img src="./divider.svg" width="100%"/>

## `GET /sla`

| Metric | Target |
| :--- | :--- |
| First response | under 24 hours |
| Peak hours | 09:00 – 23:00 (UTC+6) |
| Preferred protocol | LinkedIn · Email |
| Rate limit | 2 active projects concurrent |
| Accepts | code review, architecture debates, AI workflow discussion |
| Rejects | "build Facebook clone in 24 hours with $50" |

<img src="./divider.svg" width="100%"/>

## `POST /subscribe`

<div align="left">
  <a href="https://github.com/rowshanara01"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="https://www.linkedin.com/in/rowshanara-akhter-4a8042258/"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="mailto:rowshanaraakhter9@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail" /></a>
  <a href="https://wa.me/01779524129"><img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp" /></a>
  <a href="https://persional-website-8fey.vercel.app/"><img src="https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=firefox-browser&logoColor=white" alt="Portfolio" /></a>
</div>

---

## 💡 Dev Philosophy

<div align="center">
  > *"First, understand the system domain. Then, architect the pipeline with clean code and resilient state."*
  > 
  > — clean architecture · scalable engineering · AI empowerment
</div>

<br/>
<div align="center">
  <img src="./footer.svg" width="100%"/>
</div>

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:58A6FF,100:1F6FEB&height=90&section=footer&text=Thanks+for+visiting!&fontSize=16&fontColor=ffffff&fontAlignY=65" />
</div>
