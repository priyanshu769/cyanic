import './Playlists.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { PlaylistCard } from '../components'

export const Playlists = () => {
  const { app, dispatch } = useApp()
  const [newPlaylist, setNewPlaylist] = useState('')
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
          onClick={() => {
            if (newPlaylist === '') {
              return ''
            } else {
              dispatch({ TYPE: 'addNewPlaylist', PAYLOAD: newPlaylist })
              setNewPlaylist('')
            }
          }}
        >
          +
        </button>
      </div>
      <div className="videosDisplay">
        {app.playlists.length === 0
          ? "You don't have any playlist, create one."
          : app.playlists.map((playlist) => (
              <Link className="link" to={`/playlist-detail/${playlist.id}`}>
                <PlaylistCard
                  listName={playlist.name}
                  noOfVideos={playlist.videos.length}
                />
              </Link>
            ))}
      </div>
    </div>
  )
}
