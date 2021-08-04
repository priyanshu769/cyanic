import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import {
  HomePage,
  LikedVideos,
  Playlists,
  PlaylistDetail,
  VideoPlayer,
} from './pages'

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <ul className="navPills listStyleNone listInline">
          <li className="navPill">
            <Link className="link" activeClassName="selectedNavPill" to="/">
              Home
            </Link>
          </li>
          <li className="navPill">
            <Link
              className="link"
              activeClassName="selectedNavPill"
              to="playlists"
            >
              Playlists
            </Link>
          </li>
          <li className="navPill">
            <Link
              className="link"
              activeClassName="selectedNavPill"
              to="liked-videos"
            >
              Likes
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/liked-videos" element={<LikedVideos />} />
        <Route path="/video-player/:videoId" element={<VideoPlayer />} />
        <Route
          path="/playlist-detail/:playlistId"
          element={<PlaylistDetail />}
        />
      </Routes>
    </div>
  )
}

export default App
