# MixProjects

Vanilla JS experiments & mini-games in one tab bar — no build tools, no frameworks.

![JS](https://img.shields.io/badge/Vanilla-JS-f7df1e?style=flat-square&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-components-1572b6?style=flat-square&logo=css3&logoColor=white)
![Canvas](https://img.shields.io/badge/Canvas-API-e34f26?style=flat-square&logo=html5&logoColor=white)

## Quick start

Open `index.html` directly, or serve locally:

```bash
npx serve .          # or
python -m http.server
```

Each tab loads its iframe lazily on first click.

---

## Projects

| Tab | Project | Description |
|-----|---------|-------------|
| Parallax | Parallax Effect | Mouse-driven multi-layer depth scroll |
| Loader | Rainbow Blocks | CSS animation colour loader |
| Orbit | Orbit Cycle | Animated circular orbit system |
| Projects | UI Components | 33 Web Component demos (see below) |
| RPS | Rock Paper Scissors | VS-computer, 4 colour themes |
| FlappyB | Flappy Bird | Canvas clone, 4 canvas sizes |
| Matrix | Matrix Rain | Katakana rain, 4 colour themes |
| Tanks | Tank Battle | 2-player PvP or vs AI, 4 maps |

> Add a new project: create `components/MyProject/index.html`, then add one line to `PROJECTS` in `script.js`:
> ```js
> { name: 'MyThing', src: './components/MyProject/index.html' },
> ```

---

## UI Components (`components/newpoj/`)

33 standalone **Web Components** — each in its own folder (`components/<name>/index.js`).  
Drop any folder into another project; Shadow DOM keeps styles isolated.

Grid layout is controlled by 3 CSS variables in `style.css`:

```css
--cols:   4;       /* columns (try 3, 5, 6…)     */
--cell: 220px;     /* 1×1 card size (try 180–280) */
--gap:   10px;     /* gap between cards           */
```

### Components

**Loaders**

| Tag | Name |
|-----|------|
| `<ui-blob-loader>` | Blob Loader |
| `<ui-sound-bars>` | Sound Bars |
| `<ui-ring-spinner>` | Ring Spinner |
| `<ui-spin-ring>` | Spin Ring |
| `<ui-bounce-ball>` | Bounce Ball |
| `<ui-skeleton-loader>` | Skeleton |

**Buttons**

| Tag | Name |
|-----|------|
| `<ui-pulse-button>` | Pulse |
| `<ui-fill-sweep>` | Fill Sweep |
| `<ui-corner-button>` | Corner |
| `<ui-rainbow-button>` | Rainbow Border |
| `<ui-ripple-button>` | Ripple |

**Animations**

| Tag | Name |
|-----|------|
| `<ui-gradient-wave>` | Gradient Wave |
| `<ui-orbit-balls>` | Orbit Balls |
| `<ui-cross-balls>` | Cross Balls |
| `<ui-star-balls>` | Star Balls |
| `<ui-neon-text>` | Neon Text |
| `<ui-typing-text>` | Typing Text |

**Showcase** (2×2 grid cards)

| Tag | Name | Card |
|-----|------|------|
| `<ui-special-jar>` | Special Jar | 2×2 |
| `<ui-cube-rotate>` | Cube Rotate | 2×2 |
| `<ui-infinity-dots>` | Infinity | 1×1 |

**Interactive**

| Tag | Name |
|-----|------|
| `<ui-toggle-switch>` | Toggle Switch |
| `<ui-floating-label>` | Floating Label |
| `<ui-progress-bar>` | Progress Bar |
| `<ui-heart-like>` | Heart Like |
| `<ui-notification-bell>` | Notification Bell |

**Widgets**

| Tag | Name |
|-----|------|
| `<ui-rolling-eyes>` | Rolling Eyes |
| `<ui-scroll-mouse>` | Scroll Mouse |
| `<ui-hamburger>` | Hamburger |
| `<ui-tilt-card>` | Tilt Card |
| `<ui-hover-card>` | Hover Card |
| `<ui-css-clock>` | CSS Clock |
| `<ui-airpods-case>` | AirPods Case |
| `<ui-zoom-image>` | Zoom Image |

---

## Controls

### Flappy Bird

| Action | Input |
|--------|-------|
| Flap / start | Click · Space · ↑ |
| Pause | P |
| Canvas size | Buttons below canvas |

### Rock Paper Scissors

| Action | Input |
|--------|-------|
| Choose move | Click Rock / Paper / Scissors |
| Theme | Switcher in header |

### Matrix Rain

| Action | Input |
|--------|-------|
| Colour theme | Dot buttons (bottom-right) |

### Tank Battle

**Movement & shooting**

| Player | Move | Shoot |
|--------|------|-------|
| Player 1 | `W A S D` | `E` |
| Player 2 | `I J K L` | `U` |

**Select screens**

| Action | Key |
|--------|-----|
| Navigate tanks | `A/D` (P1) · `J/L` (P2) |
| Confirm | `E` (P1) · `U` (P2) |
| Navigate maps | `A/D` or `J/L` |
| Start | `E` or `U` |

**Global**

| Action | Key |
|--------|-----|
| Toggle AI (P2) | `Tab` |
| Fullscreen | `F` |
| Back | `Esc` |

**Tank roster**

| Tank | Speed | HP | RoF | Style |
|------|-------|----|-----|-------|
| Scout | ████░ | ██░░░░ | ████░░ | Hit & run |
| Ranger | ███░░ | ██░░░░ | ██████ | Rapid fire |
| Soldier | ███░░ | ███░░░ | ████░░ | Balanced |
| Heavy | ██░░░ | ██████ | ███░░░ | Tanky brawler |
| Speeder | █████ | ██░░░░ | ████░░ | Pure speed |
| Brute | █░░░░ | ██████ | ██░░░░ | Unkillable |

**Maps**

| Map | Layout |
|-----|--------|
| Arena | Symmetric corridors |
| Open | Corner bunkers + centre cross |
| Fortress | Central castle with 4 gates |
| Maze | Dense wall grid — tight corridors |

---

## Architecture

| Topic | Detail |
|-------|--------|
| **Shell router** | `script.js` reads `PROJECTS[]` → builds tabs → lazy-loads iframes |
| **Web Components** | Shadow DOM + ES modules; `import.meta.url` for relative asset paths |
| **Game loop** | `requestAnimationFrame`; held keys tracked in a `Set` |
| **Proportional walls** | Tank walls defined as `W * ratio` so they scale on fullscreen resize |
| **AI bot** | Moves toward enemy; shoots when aligned; random-direction burst after 30 stuck frames |
| **Themes** | RPS: `body[data-theme]` CSS selectors; Matrix: `THEMES[]` array swapped at runtime |

---
