import { Link } from 'react-router-dom'
import { VideoCard } from '../../Components'
import { useApp } from '../../Contexts/AppContext'

export const LikedVideos = () => {
  const { app } = useApp()

  return (
    <div>
      <div className="videosDisplay">
        {app.user?.likedVideos.length === 0
          ? "You haven't liked any video yet."
          : app.user?.likedVideos.map((video) => {
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
