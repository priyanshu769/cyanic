import './HomePage.css'
import { Link } from 'react-router-dom'
import { VideoCard } from '../components'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const HomePage = () => {
  const [loading, setLoading] = useState(null)
  const [videos, setVideos] = useState(null)

  useEffect(() => {
    ;(async () => {
      setLoading('Loading...')
      try {
        const { data } = await axios.get(
          'https://cyanic-api.herokuapp.com/videos',
        )
        if (data.success) {
          setLoading(null)
          setVideos(data.videos)
        }
      } catch (error) {
        setLoading('Some error occured...')
        console.log(error)
      }
    })()
  }, [])

  return (
    <div>
      {loading && <h3>{loading}</h3>}
      <div className="videosDisplay">
        {videos &&
          videos.map((video) => {
            return (
              <Link className="link" to={`/video-player/${video._id}`}>
                <VideoCard
                  thumbnail={video.thumbnail}
                  name={video.name}
                  category={video.category}
                />
              </Link>
            )
          })}
      </div>
    </div>
  )
}
