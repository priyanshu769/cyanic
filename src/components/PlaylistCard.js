import "./PlaylistCard.css"

const PlaylistCard = (props) => {
    return (
            <div className="cardPlaylist">
                <div class="playlistImg">
                    <img class="cardImg" src={props.listImg} alt="Video Thumbnail" />
                </div>
                <div class="playlistDetails">
                    <p class="cardName">{props.listName}</p>
                    <p class="cardSectionName">{props.noOfVideos}</p>
                </div>
        </div>
    )
}

export default PlaylistCard;