import "./VideoCard.css"

const VideoCard = (props) => {
    return (
        <div class="card">
            <div>
                <div class="cardWithBadge">
                    <img class="cardImg" src={props.thumbnail} alt="Video Thumbnail" />
                </div>
                <p class="cardDetails">
                    <span class="cardName">{props.name}</span>
                    <span class="cardSectionName">{props.category}</span>
                </p>
            </div>
            <span class="videoBadge">WatchLater</span>
        </div>
    )
}

export default VideoCard;