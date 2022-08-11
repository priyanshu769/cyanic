import { MdDelete } from "react-icons/md"
import { Link } from "react-router-dom"
import "./PlaylistCard.css"

export const PlaylistCard = (props) => {
    return (
        <div className="cardPlaylist">
            <p className="playlistName">{props.listName}</p>
            <p className="playlistInfo">Videos: {props.noOfVideos}</p>
            <Link to={props.linkTo}><button className='btnBgNone' onClick={props.deleteBtnClick}><MdDelete size={25} /></button></Link>
        </div>
    )
}
