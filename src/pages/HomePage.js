import "./HomePage.css"
import { Link } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import {useApp} from "../contexts/AppContext"
const HomePage = () => {
  const {app} = useApp()
    return (
        <div>
        <div className="videosDisplay">
        {app.videos.map(video => {
            // <span  onClick={() => dispatch({TYPE: "watchLater", PAYLOAD: video})} class="videoBadge">WatchLater</span>
            return (
              <Link className="link" to={`/video-player/${video.id}`}>
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

export default HomePage;