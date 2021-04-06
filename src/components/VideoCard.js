import "./VideoCard.css"

const VideoCard = () => {
    return (
        <div class="card">
            <div>
                <div class="cardWithBadge">
                    <img class="cardImg" src="http://i3.ytimg.com/vi/rP-3GRY0c1E/maxresdefault.jpg" alt="Video Thumbnail" />
                </div>
                <p class="cardDetails">
                    <span class="cardName">How to drift on a motorcycle?</span>
                    <span class="cardSectionName">Motorcycle</span>
                </p>
            </div>
            <span class="videoBadge">WatchLater</span>
        </div>
    )
}

export default VideoCard;