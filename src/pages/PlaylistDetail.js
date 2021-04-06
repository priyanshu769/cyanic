import VideoCard from "../components/VideoCard"
import { useParams, Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext"

const PlaylistDetail = () => {
    const { app, dispatch } = useApp()
    const { playlistId } = useParams();
    const playlistToDisplay = app.playlists.find(playlist => playlist.id == playlistId)
    console.log("PLTD", playlistToDisplay)
    return (
        <div className="videosDisplay">
            {playlistToDisplay.videos.map(video => {
                return (
                    <Link to={`/video-player/${video.id}`}>
                        <VideoCard
                        thumbnail={video.thumbnail}
                        name={video.name}
                        category={video.category}/>
                    </Link>
                )
            })}
        </div>
    )
}

export default PlaylistDetail;