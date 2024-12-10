import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();
import "@fortawesome/fontawesome-free/css/all.min.css"
// import imageGallery package
import "react-image-gallery/styles/css/image-gallery.css";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
