# React Path — Practice Curriculum

Base → Mid → **React 19** → Mid interview → **Advanced** (TS, a11y, routing, concurrent, auth/RHF/Zod, Zustand, class).

## How to study
1. `node 00_StudyOrder.js` — see the sequence
2. Files: `01_` through `47_` in order
3. Browser app (topics + Q&A + solutions):
   ```bash
   cd docs
   python3 -m http.server 5600
   ```
   Open `http://localhost:5600`
4. Refresh docs data (after editing any teaching file):
   ```bash
   node docs/generate-topics-data.js
   ```

## Levels
| # | Level | Depth |
|---|--------|--------|
| 01–10 | BASE | **22–24 Qs + solutions** each (basic → mid → adv) |
| 11–27 | MID | **22 Qs + solutions** each |
| 28–39 | REACT 19 | **22 Qs + solutions** each |
| 40 | INTERVIEW | **47 Qs** |
| 41–47 | ADVANCED | **24–26 Qs** — Class, TS, a11y, routing, concurrent, Auth+RHF+Zod, Zustand |

**Total ≈ 1090 questions** across the path. Each question includes an example/solution.

## Advanced (41–47)
| File | Focus |
|------|--------|
| 41 | Class components (legacy / interview) |
| 42 | TypeScript + React |
| 43 | Accessibility (a11y) |
| 44 | Advanced routing (loaders, nested, protected, data APIs) |
| 45 | Concurrent: `startTransition`, `useDeferredValue` |
| 46 | Auth patterns + React Hook Form + Zod |
| 47 | Zustand |

Live Vite practice: `npm create vite@latest` + React 19. For advanced files, optionally:
`npm i react-router-dom zod react-hook-form @hookform/resolvers zustand`
