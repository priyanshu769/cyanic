import "./PlaylistCard.css"

export const PlaylistCard = (props) => {
    return (
        <div className="cardPlaylist">
            <p className="playlistName">{props.listName}</p>
            <p className="playlistInfo">Videos: {props.noOfVideos}</p>
        </div>
    )
}
