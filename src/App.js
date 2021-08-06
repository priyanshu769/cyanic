import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import {
  HomePage,
  LikedVideos,
  Playlists,
  PlaylistDetail,
  VideoPlayer,
  WatchLater,
  Login,
  Signup,
} from './pages'
import { useEffect, useState } from 'react'
import { useApp } from './contexts/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function App() {
  const { app, dispatch } = useApp()
  const [showOptions, setShowOptions] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!app.loggedInToken) {
      ;(async () => {
        const dataFromLocalStorage = JSON.parse(
          localStorage?.getItem('loggedInCyanic'),
        )
        const token = dataFromLocalStorage?.token
        if (token) {
          dispatch({ type: 'SET_LOGGED_IN_TOKEN', payload: token })
          try {
            const { data } = await axios.get(
              'https://cyanic-api.herokuapp.com/user',
              {
                headers: { Authorization: token },
              },
            )
            console.log(data, 'logging in from token')
            if (data.success) {
              dispatch({
                type: 'SET_USER',
                payload: data.user,
              })
            }
          } catch (error) {
            console.log(error)
          }
        }
      })()
    }
  }, [app.loggedInToken, dispatch])

  const logoutHandler = () => {
    dispatch({ type: 'SET_USER', payload: null })
    dispatch({ type: 'SET_LOGGED_IN_TOKEN', payload: null })
    localStorage.removeItem('loggedInCyanic')
    navigate('/')
  }

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
            <button
            style={{transform: `rotate(90deg)`}}
            className="btnBgNone"
              onClick={() => setShowOptions((showOptions) => !showOptions)}
            >
              ...
            </button>
          </li>
          <li
            className="navPill"
            style={{ display: showOptions ? 'block' : 'none' }}
          >
            <button className="btnBgNone" onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/likes" element={<LikedVideos />} />
        <Route path="/watch-later" element={<WatchLater />} />
        <Route path="/play/:videoId" element={<VideoPlayer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/playlist/:playlistId" element={<PlaylistDetail />} />
      </Routes>
    </div>
  )
}

export default App
