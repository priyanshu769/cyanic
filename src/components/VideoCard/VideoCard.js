import "./VideoCard.css"

export const VideoCard = (props) => {
    return (
        <div class="card">
            <img class="cardImg" src={props.thumbnail} alt="Video Thumbnail" />
            <p class="cardName">{props.name.length < 25 ? props.name : (props.name.slice(0, 24) + '...')}</p>
            <p class="cardSectionName">{props.category}</p>
        </div>
    )
}
