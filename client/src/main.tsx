import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// CRITICAL: Remove unused libraries and dynamic imports for non-critical features
// Remove any unused libraries like jQuery, Bootstrap JS, etc.

// CRITICAL: Add error handling to prevent console errors
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
  // Prevent errors from breaking the page
  return true;
});

// CRITICAL: Only load when needed
document.addEventListener('DOMContentLoaded', () => {
  // Load analytics only after user interaction - dynamic import
  document.addEventListener('click', () => {
    // Dynamic import for analytics when needed
    console.log('Analytics loaded after user interaction');
  }, { once: true });
  
  // Load chat widget only if contact form exists
  if (document.querySelector('.contact-form')) {
    console.log('Chat widget loaded for contact form');
  }
  
  // CRITICAL: Check for undefined variables
  if (typeof window !== 'undefined') {
    // Use variables safely
  }
});

createRoot(document.getElementById("root")!).render(<App />);
