import { VideoCard } from '../components'
import { useParams, Link } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const PlaylistDetail = () => {
  const { app } = useApp()
  const { playlistId } = useParams()
  const [playlist, setPlaylist] = useState(null)

  useEffect(() => {
    ;(async () => {
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
            />
          </Link>
        )
      })}
    </div>
  )
}
