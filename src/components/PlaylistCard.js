import "./PlaylistCard.css"

const PlaylistCard = () => {
    return (
            <div className="cardPlaylist">
                <div class="playlistImg">
                    <img class="cardImg" src="http://i3.ytimg.com/vi/rP-3GRY0c1E/maxresdefault.jpg" alt="Video Thumbnail" />
                </div>
                <div class="playlistDetails">
                    <p class="cardName">Playlist Name</p>
                    <p class="cardSectionName">13 Videos</p>
                </div>
        </div>
    )
}

export default PlaylistCard;