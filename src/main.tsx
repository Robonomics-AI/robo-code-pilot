
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './App.css' // Make sure App.css is imported

createRoot(document.getElementById("root")!).render(<App />);
