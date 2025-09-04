import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// CRITICAL: Remove unused imports and implement dynamic loading
// Analytics and chat widgets will be loaded dynamically after user interaction

createRoot(document.getElementById("root")!).render(<App />);
