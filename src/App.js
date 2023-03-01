import { Routes, Route, Outlet, Link } from "react-router-dom";
import AppLayout from './layouts/AppLayout';
import NoMatch from './screens/Errors/NoMatch';
import Media from './screens/Media';
import MediaAdd from './screens/Media/MediaAdd';
import MediaDetail from './screens/Media/MediaDetail';
import Subtitles from './screens/Subtitles';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Media />} />
            <Route path="medias" element={<Media />} />
            <Route path="medias/add" element={<MediaAdd />} />
            <Route path="medias/{code}" element={<MediaDetail />} />
            <Route path="medias/{code}/subtitles" element={<Subtitles />} />

            {/* Using path="*"" means "match anything", so this route
                  acts like a catch-all for URLs that we don't have explicit
                  routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
