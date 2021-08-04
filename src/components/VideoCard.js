import "./VideoCard.css"

export const VideoCard = (props) => {
    return (
        <div class="card">
            <div>
                <div class="cardWithBadge">
                    <img class="cardImg" src={props.thumbnail} alt="Video Thumbnail" />
                </div>
                <div class="cardDetails">
                    <span class="cardName">{props.name}</span>
                    <br />
                    <span class="cardSectionName">{props.category}</span>
                </div>
            </div>
        </div>
    )
}
