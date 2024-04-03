import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ImageUpload from './components/Image_render/ImageUpload';
import HomePage from './components/Image_render/HomePage'
import Dashboard from './components/Form_Data/dashboard';
import Settings from './components/Form_Data/settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/settings" element={<Settings />}/>
        <Route path="/upload" element={<ImageUpload />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
