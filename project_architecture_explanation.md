# React Basics & Cine-Discover Architecture Guide

This comprehensive guide explains the foundational basics of React, and then maps those exact concepts directly into how this specific Cine-Discover monorepo functions end-to-end.

---

## Part 1: The Basics of React

React is a JavaScript library for building user interfaces. Instead of manually manipulating the DOM (like `document.getElementById('title').innerText = "Hello"`), React lets you write declarative "Components". 

### 1. Components
A Component is simply a reusable piece of code that returns UI elements (written in HTML-like syntax called **JSX**). Components can be nested inside each other to build complex pages.
There are two ways to write components:
- **Functional Components (Modern)**: Just standard JavaScript functions that return JSX. They use "Hooks" for advanced logic.
- **Class Components (Traditional)**: JavaScript Classes extending `React.Component`. They use `this.state` and methods like `componentDidMount()`. 

### 2. Props (Properties)
Props are how data is passed down from a Parent component to a Child component. They are strictly read-only within the child component.
- Example: `<SearchInput value="Batman" />` passes "Batman" as a prop.

### 3. State
State is the internal "memory" of a component. When State changes, React automatically re-runs the component function and smoothly updates the visual browser screen without reloading the page.
- Using Hooks: `const [query, setQuery] = useState("")` 

### 4. Virtual DOM
When State or Props change, React creates a lightweight map of what the screen *should* look like (Virtual DOM). It explicitly compares this to what is *currently* on screen, and intelligently updates ONLY the precise pixels and tags that changed. This makes React exceptionally fast.

---

## Part 2: Project Architecture (Start to Finish)

Cine-Discover uses a sophisticated mapping of modern React technologies operating out of a PNPM Monorepo. 

### Step A: The Entry Point
When you navigate to the website, the Vite web server delivers `index.html`. 
Inside that file is an empty div: `<div id="root"></div>`, followed by `<script src="/src/main.jsx">`.
1. **`main.jsx`**: This is the application starter. It imports React's core `createRoot` tool, grabs that `#root` div, and forcefully injects the `<App />` component directly into the screen.

### Step B: The Application Wrapper (`App.jsx`)
`App.jsx` acts purely as an infrastructure wrapper. It does not output visual UI elements itself. Its job is to wrap the visual `<Home />` node inside a `QueryClientProvider`. 

**Why?**
The QueryClient acts as a global caching brain for making API connections to TMDB. Because the provider surrounds the Home node, *any* component arbitrarily deep in the Home screen can instantly fetch and read remote data.

### Step C: The View Controller (`Home.jsx`)
`Home.jsx` is the primary "Smart Component" or container for the UI layout. 
It possesses all the core functional Hooks that define application behavior:
- `useState("Discover")`: Tracks what navigation tab the user clicked.
- `useDebounce()`: Throttles search typing. If you type "Ave", it waits 400 milliseconds before blasting the network API.
- `useSearch()`: Passes the throttled string directly into the React Query cache engine.

`Home.jsx` delegates rendering by passing its memory variables downward as Props to visual "Dumb Components":
- `<SearchInput value={query} onChange={setQuery} />`
- `<MovieSection movies={searchResults} />`
- `<HeroBanner />`

### Step D: Hitting the Backend (`BackendStatus.jsx`)
While the majority of the code is built on Functional Hooks, we utilize a traditional React Class Component (`BackendStatus.jsx`) injected into the UI explicitly to showcase the legacy paradigm structure.

Here is how it operates:
1. **Constructor (`constructor(props)`)**: Used strictly to scaffold initial memory (`this.state = { data: null, loading: true }`).
2. **Lifecycle (`componentDidMount`)**: Equivalent to functional instances like `useEffect`, this handler runs immediately when the component physically attaches to the user's screen.
3. It immediately fires an asynchronous `fetch()` targeting the local Node JS Express backend architecture at `http://localhost:5000/healthz`. 
4. Upon receiving the diagnostic string, it forcibly calls `this.setState()` internally, instructing React's Virtual DOM to redraw uniquely that single visual block with the received network payload.

### Step E: Remote Data Fetching (TanStack Query)
Instead of embedding `fetch()` calls inside movie carousels creating messy visual code, `artifacts/movie-discovery/src/hooks/useTMDB.js` intercepts all data responsibilities.
When the user wants "Trending Movies":
1. `useTrending()` executes a GET request formatted with the TMDB base URL and the securely injected `.env.local` API Token.
2. The payload returns as a JavaScript object.
3. React Query immediately caches this payload. If the user swaps tabs from Discover to Search and back to Discover, React instantly fetches the payload from local memory—producing `zero` loading screens on return trips.

### Step F: The Styling System
Styling ignores conventional CSS stylesheets. The project uses *Tailwind CSS*. 
For complex logic like determining if a button is red/blue or large/small, the components (e.g. `Button.jsx`) utilize **CVA** (Class Variance Authority). CVA acts as a programmatic map, automatically resolving strings like `variant="destructive"` to physical red CSS classes securely bundled by the Vite pipeline during standard operations.
