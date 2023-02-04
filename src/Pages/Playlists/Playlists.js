import './Playlists.css'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PlaylistCard, Loading } from '../../Components'
import { useApp } from '../../Contexts/AppContext'
import { useToast } from '../../Contexts/ToastContext'
import axios from 'axios'
import { BsPlusSquare } from 'react-icons/bs'

export const Playlists = () => {
  const [newPlaylist, setNewPlaylist] = useState('')
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(null)
  const { app } = useApp()
  const { toastDispatch } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    ; (async () => {
      if (app.loggedInToken) {
        setLoading('Loading...')
        try {
          const { data } = await axios.get(
            'https://cyanic-api.cyclic.app/playlists',
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
      toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Creating New Playlist" } })
      try {
        const { data } = await axios.post(
          `https://cyanic-api.cyclic.app/playlists`,
          { playlistName: newPlaylist },
          { headers: { Authorization: app.loggedInToken } },
        )
        if (data.success) {
          setPlaylists([...playlists, data.playlistAdded])
          toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Playlist Created" } })
        }
      } catch (error) {
        console.log(error)
      }
    } else toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Creating New Playlist" } })
  }

  const deletePlaylist = async (playlistId) => {
    toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Deleting Playlist" } })
    try {
      const deletePlaylistRes = await axios.post(`https://cyanic-api.cyclic.app/playlists/${playlistId}/delete`, {}, { headers: { Authorization: app.loggedInToken } })
      if (deletePlaylistRes.data.success) {
        toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Playlist Deleted" } })
        const { data } = await axios.get(
          'https://cyanic-api.cyclic.app/playlists',
          {
            headers: { Authorization: app.loggedInToken },
          },
        )
        if (data.success) {
          setLoading(null)
          setPlaylists(data.playlists)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="playlists">
      <div className="inputDiv">
        <input
          className="input"
          value={newPlaylist}
          placeholder='New Playlist Name'
          onChange={(e) => setNewPlaylist(e.target.value)}
        />
        <button
          className="btnBgNone"
          onClick={() => {
            setNewPlaylist('')
            createNewPlaylist()
          }
          }
        >
          <BsPlusSquare />
        </button>
      </div>
      <div className="videosDisplay">
        {loading && <Loading />}
        {playlists?.length === 0
          ? "You don't have any playlist, create one."
          : playlists?.map((playlist) => (
            <Link className="link" to={`/playlist/${playlist._id}`}>
              <PlaylistCard
                listName={playlist.playlistName}
                noOfVideos={playlist.videos.length}
                linkTo='/playlists'
                deleteBtnClick={() => deletePlaylist(playlist._id)}
              />
            </Link>
          ))}
      </div>
    </div>
  )
}
