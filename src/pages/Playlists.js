// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useApp } from "../contexts/AppContext";
import PlaylistCard from "../components/PlaylistCard"

const Playlists = () => {
    // const { app, dispatch } = useApp()
    // const [newPlaylist, setNewPlaylist] = useState("")
    return (
        <div className="videosDisplay">
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
            <PlaylistCard />
        </div>
    )
}

export default Playlists;
