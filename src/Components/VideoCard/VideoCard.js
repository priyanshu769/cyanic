import "./VideoCard.css"
import { MdDelete } from "react-icons/md"
import { Link } from "react-router-dom"

export const VideoCard = (props) => {
    return (
        <div class="card">
            <img class="cardImg" src={props.thumbnail} alt="Video Thumbnail" />
            <p class="cardName">{props.name.length < 25 ? props.name : (props.name.slice(0, 24) + '...')}</p>
            <p class="cardSectionName">
                {props.category}
                {props.deleteBtnShow && <Link to={props.linkTo}><button className='btnBgNone' onClick={props.deleteBtnClick}><MdDelete size={25} /></button></Link>}
            </p>
        </div>
    )
}
