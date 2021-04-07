import "./VideoPlayer.css"
import { useState } from "react"
import { useParams } from "react-router-dom";
import { useApp } from "../contexts/AppContext"

const VideoPlayer = () => {
    const { app, dispatch } = useApp()
    const [showPlaylists, setShowPlaylists] = useState(false);
    const [newPlaylist, setNewPlaylist] = useState("")
    const { videoId } = useParams()
    const videoToPlay = app.videos.find(video => (video.id === videoId))
    return (
        <div className="videoPlayer">
            <iframe className="videoArea" src={videoToPlay.link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <h3>{videoToPlay.name}</h3>
            <button className="btnBgNone" style={app.likedVideos.includes(videoToPlay) ? {color: "skyblue"} : {}} onClick={() => dispatch({ TYPE: "likeVideo", PAYLOAD: videoToPlay })}>{app.likedVideos.includes(videoToPlay) ? "Liked" : "Like"}</button>
            <button className="btnBgNone" onClick={() => setShowPlaylists(value => !value)}>Add to Playlist</button>
            <div style={showPlaylists ? { display: "" } : { display: "none" }}>
                <div className="inputDiv">
                    <input  className="input" value={newPlaylist} onChange={(e) => setNewPlaylist(e.target.value)} />
                    <button className="btnIcon btnBgNone" onClick={() => {
                        if (newPlaylist === "") {
                            return ""
                        } else {
                            dispatch({ TYPE: "addNewPlaylist", PAYLOAD: newPlaylist });
                            setNewPlaylist("")
                        }
                    }}>+</button>
                </div>
                {app.playlists.length === 0 ? "You don't have any playlist, create one." : app.playlists.map(list => <li className="listStyleNone cursorPointer" onClick={() => {
                    if (list.videos.includes(videoToPlay)){
                        return ""
                    } else {dispatch({ TYPE: "addToPlaylist", PLAYLIST: list, PAYLOAD: videoToPlay })}
                }}>{list.name}</li>)}
            </div>
        </div>
    )
}

export default VideoPlayer;
