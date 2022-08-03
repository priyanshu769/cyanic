import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import {
  HomePage,
  ExplorePage,
  LikedVideos,
  Playlists,
  PlaylistDetail,
  VideoPlayer,
  WatchLater,
  Login,
  Signup,
} from './Pages'
import { useEffect, useState } from 'react'
import { useApp } from './Contexts/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { FiLogOut, FiPlay } from 'react-icons/fi'
import cyanicLogo from "./Assets/Images/cyanicLogo.png"
import { AiOutlineClockCircle, AiOutlineLike, AiOutlineHome } from 'react-icons/ai'
import { MdPlaylistPlay } from 'react-icons/md'

function App() {
  const { app, dispatch } = useApp()
  const [showOptions, setShowOptions] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!app.loggedInToken) {
      ; (async () => {
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
        <div className='logoContainer'>
          <Link className="navLink" activeclassname="selectedNavPill" to="/">
            <img className='logoImg' src={cyanicLogo} alt="Cyanic Logo" />
          </Link>
        </div>
        <div className='navBulletsContainer'>
          <button onClick={() => setShowOptions((showOptions) => !showOptions)} className="navBtn">
            <FaUserAlt size={30} />
          </button>
        </div>
      </nav>
      <div className={showOptions ? 'userOptionsContainer' : 'userOptionsHidden'}>
        {app.loggedInToken && <button className='blankBtn'>Hi, {app.user?.name}</button>}
        {app.loggedInToken ? <button
          onClick={() => {
            logoutHandler()
            setShowOptions((showOptions) => !showOptions)
          }}
          className='optionsBtn'
        >
          Logout <FiLogOut />
        </button> : <Link className='optionsBtn' to='/login'>Login</Link>}
      </div>
      <div className='sidebarAndMain'>
        <div className="sidebar">
          <Link className="link" to={`/`}>
            <button className='sidebarBtn'>
              <AiOutlineHome /> Home
            </button>
          </Link>
          <Link className="link" to={`/explore`}>
            <button className='sidebarBtn'>
              <FiPlay /> Explore
            </button>
          </Link>
          <Link className="link" to={`/watch-later`}>
            <button className='sidebarBtn'>
              <AiOutlineClockCircle /> Watch Later
            </button>
          </Link>
          <Link className="link" to={`/likes`}>
            <button className='sidebarBtn'>
              <AiOutlineLike /> Likes
            </button>
          </Link>
          <Link className="link" to={`/playlists`}>
            <button className='sidebarBtn'>
              <MdPlaylistPlay /> Playlists
            </button>
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/likes" element={<LikedVideos />} />
          <Route path="/watch-later" element={<WatchLater />} />
          <Route path="/play/:videoId" element={<VideoPlayer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/playlist/:playlistId" element={<PlaylistDetail />} />
        </Routes>
      </div>
    </div>
  )
}

export default App