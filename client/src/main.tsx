import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import "./index.css";

// Lazy load App for 100 performance score
const App = lazy(() => import("./App"));

// Minimal loading fallback
const AppLoadingFallback = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <div style={{
      width: '32px',
      height: '32px',
      border: '3px solid #f3f3f3',
      borderTop: '3px solid #3b82f6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
  </div>
);

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<AppLoadingFallback />}>
    <App />
  </Suspense>
);
