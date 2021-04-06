import { useState } from "react"
import { Link, useParams } from "react-router-dom";
import { useApp } from "../contexts/AppContext"

const VideoPlayer = () => {
    const { app, dispatch } = useApp()
    const [showPlaylists, setShowPlaylists] = useState(false);
    const [newPlaylist, setNewPlaylist] = useState("")
    const { videoId } = useParams()
    const videoToPlay = app.videos.find(video => (video.id == videoId))
    return (
        <div>
            <iframe width="852rem" height="480rem" src={videoToPlay.link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <h3>{videoToPlay.name}</h3>
            <Link to="/">Close</Link>
            <button onClick={() => dispatch({ TYPE: "likeVideo", PAYLOAD: videoToPlay })}>{app.likedVideos.includes(videoToPlay) ? "Liked" : "Like"}</button>
            <button onClick={() => setShowPlaylists(value => !value)}>Add to Playlist</button>
            <div style={showPlaylists ? { display: "" } : { display: "none" }}>
                <div>
                    <input value={newPlaylist} onChange={(e) => setNewPlaylist(e.target.value)} />
                    <button onClick={() => {
                        dispatch({ TYPE: "addNewPlaylist", PAYLOAD: newPlaylist });
                        setNewPlaylist("")
                    }}>+</button>
                </div>
                {app.playlists.length === 0 ? "You don't have any playlist, create one." : app.playlists.map(list => <li onClick={() => dispatch({ TYPE: "addToPlaylist", PLAYLIST: list, PAYLOAD: videoToPlay })}>{list.name}</li>)}
            </div>
        </div>
    )
}

export default VideoPlayer;

// dispatch({TYPE: "addToPlaylist", PAYLOAD: videoToPlay})