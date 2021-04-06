import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import PlaylistCard from "../components/PlaylistCard"

const Playlists = () => {
    const { app, dispatch } = useApp()
    const [newPlaylist, setNewPlaylist] = useState("")
    return (
        <div className="videosDisplay">
            <div>
                <input value={newPlaylist} onChange={(e) => setNewPlaylist(e.target.value)} />
                <button onClick={() => {
                    dispatch({ TYPE: "addNewPlaylist", PAYLOAD: newPlaylist });
                    setNewPlaylist("")
                }}>+</button>
            </div>
            {app.playlists.length === 0 ? "You don't have any playlist, create one." : app.playlists.map(playlist => <Link to={`/playlist-detail/${playlist.id}`}><PlaylistCard listName={playlist.name} /></Link>)}

        </div>
    )
}

export default Playlists;
