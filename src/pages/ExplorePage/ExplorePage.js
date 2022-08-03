import './ExplorePage.css'
import { Link } from 'react-router-dom'
import { VideoCard, Loading } from '../../Components'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const ExplorePage = () => {
  const [loading, setLoading] = useState('')
  const [videos, setVideos] = useState([])
  console.log(loading)
  useEffect(() => {
    ; (async () => {
      try {
        const { data } = await axios.get(
          'https://cyanic-api.herokuapp.com/videos',
        )
        if (data.success) {
          setLoading('')
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
      <div className="videosDisplay">
        {videos.length === 0 && <Loading />}
        {videos &&
          videos.map((video) => {
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
    </div>
  )
}

// <div className={showSidebar ? "sidebarMobile" : "sidebar"}></div>