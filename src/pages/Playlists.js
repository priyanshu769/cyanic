import './Styles/Playlists.css'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PlaylistCard } from '../components'
import { useApp } from '../contexts/AppContext'
import axios from 'axios'
import { BsPlusSquare } from 'react-icons/bs'

export const Playlists = () => {
  const [newPlaylist, setNewPlaylist] = useState(null)
  const [playlists, setPlaylists] = useState(null)
  const [loading, setLoading] = useState(null)
  const { app } = useApp()
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      if (app.loggedInToken) {
        setLoading('Loading...')
        try {
          const { data } = await axios.get(
            'https://cyanic-api.herokuapp.com/playlists',
            {
              headers: { Authorization: app.loggedInToken },
            },
          )
          if (data.success) {
            setLoading(null)
            setPlaylists(data.playlists)
          }
        } catch (error) {
          setLoading('Some error occured!')
          console.log(error)
        }
      } else navigate('/login')
    })()
  }, [app.loggedInToken, navigate])

  const createNewPlaylist = async () => {
    if (app.loggedInToken && newPlaylist) {
      try {
        const { data } = await axios.post(
          `https://cyanic-api.herokuapp.com/playlists`,
          { playlistName: newPlaylist },
          { headers: { Authorization: app.loggedInToken } },
        )
        if (data.success) {
          setPlaylists([...playlists, data.playlistAdded])
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="playlists">
      <div className="inputDiv">
        <input
          className="input"
          value={newPlaylist}
          onChange={(e) => setNewPlaylist(e.target.value)}
        />
        <button
          className="btnBgNone"
          onClick={createNewPlaylist}
        >
          <BsPlusSquare />
        </button>
      </div>
      <div className="videosDisplay">
        <Link className="link" to={`/likes`}>
          <PlaylistCard
            listName="Likes"
            noOfVideos={app.user?.likedVideos.length}
          />
        </Link>
        <Link className="link" to={`/watch-later`}>
          <PlaylistCard
            listName="Watch Later"
            noOfVideos={app.user?.watchLater.length}
          />
        </Link>
        <br />
        {loading && <h3>{loading}</h3>}
        {playlists?.length === 0
          ? "You don't have any playlist, create one."
          : playlists?.map((playlist) => (
              <Link className="link" to={`/playlist/${playlist._id}`}>
                <PlaylistCard
                  listName={playlist.playlistName}
                  noOfVideos={playlist.videos.length}
                />
              </Link>
            ))}
      </div>
    </div>
  )
}
