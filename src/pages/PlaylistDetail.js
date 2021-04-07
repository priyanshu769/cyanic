import VideoCard from "../components/VideoCard"
import { useParams, Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext"

const PlaylistDetail = () => {
    const { app } = useApp()
    const { playlistId } = useParams();
    const playlistToDisplay = app.playlists.find(playlist => playlist.id === parseInt(playlistId))
    return (
        <div className="videosDisplay">
            {playlistToDisplay.videos.map(video => {
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
    )
}

export default PlaylistDetail;