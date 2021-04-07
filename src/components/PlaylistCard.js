import "./PlaylistCard.css"

const PlaylistCard = (props) => {
    return (
        <div className="cardPlaylist">
            <p class="playlistDetails">
                <span class="cardName">{props.listName}</span>
                <br />
                <span class="cardSectionName">Videos: {props.noOfVideos}</span>
            </p>
        </div>
    )
}

export default PlaylistCard;

// <div class="playlistImg">
//     <img class="cardImg" src={props.listImg} alt="Video Thumbnail" />
// </div>