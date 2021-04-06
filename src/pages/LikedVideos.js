import {Link} from "react-router-dom"
import {useApp} from "../contexts/AppContext"
import VideoCard from "../components/VideoCard"

const LikedVideos = () => {
    const {app, dispatch} =useApp()
    return (
        <div>
        <h1>All videos on likes page.</h1>
        <div className="videosDisplay">
        {app.likedVideos.map(video => {
            // <span  onClick={() => dispatch({TYPE: "watchLater", PAYLOAD: video})} class="videoBadge">WatchLater</span>
            return (
              <Link to={`/video-player/${video.id}`}>
                <VideoCard
                thumbnail={video.thumbnail}
                name={video.name}
                category={video.category} />
              </Link>
            )
          })}
        </div>
        </div>
    )
}

export default LikedVideos;