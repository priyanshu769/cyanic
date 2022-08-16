import { VideoCard } from '../../Components'
import { useParams, Link } from 'react-router-dom'
import { useApp } from '../../Contexts/AppContext'
import { useToast } from '../../Contexts/ToastContext'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const PlaylistDetail = () => {
  const { app } = useApp()
  const { toastDispatch } = useToast()
  const { playlistId } = useParams()
  const [playlist, setPlaylist] = useState(null)

  useEffect(() => {
    ; (async () => {
      try {
        const {
          data,
        } = await axios.get(
          `https://cyanic-api.herokuapp.com/playlists/${playlistId}`,
          { headers: { Authorization: app.loggedInToken } },
        )
        if (data.success) {
          setPlaylist(data.populatedPlaylist)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [playlistId, app.loggedInToken])

  const deleteFromPlaylist = async (playlistId, videoId) => {
    if (app.loggedInToken) {
      toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Updating Playlist" } })
      try {
        const { data } = await axios.post(
          `https://cyanic-api.herokuapp.com/playlists/${playlistId}/addRemoveVideo/`,
          { videoId: videoId },
          { headers: { Authorization: app.loggedInToken } },
        )
        console.log(data, 'deleting video frm playlist')
        if (data.success) {
          const {
            data,
          } = await axios.get(
            `https://cyanic-api.herokuapp.com/playlists/${playlistId}`,
            { headers: { Authorization: app.loggedInToken } },
            )
            console.log(data, 'calling new playlist')
          if (data.success) {
            setPlaylist(data.populatedPlaylist)
          }
          toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Playlist Updated" } })
        } else toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Unable to Update Playlist" } })
      } catch (error) {
        console.log(error, 'Unable to add video to playlist')
        toastDispatch({ TYPE: "set_Toast", PAYLOAD: { showToast: true, toastMessage: "Error Occured While Updating Playlist" } })
      }
    }
  }

  return (
    <div className="videosDisplay">
      {playlist?.videos.length === 0 && <h3>This playlist has zero videos.</h3>}
      {playlist?.videos.map((video) => {
        return (
          <Link className="link" to={`/play/${video._id}`}>
            <VideoCard
              thumbnail={video.thumbnail}
              name={video.name}
              category={video.category}
              deleteBtnShow={true}
              linkTo={`/playlist/${playlistId}`}
              deleteBtnClick={() => deleteFromPlaylist(playlistId, video._id)}
            />
          </Link>
        )
      })}
    </div>
  )
}
