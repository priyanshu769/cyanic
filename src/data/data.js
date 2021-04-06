export const videos = [
    {
        id: 1,
        name: "Name 1",
        thumbnail: "http://i3.ytimg.com/vi/rP-3GRY0c1E/maxresdefault.jpg",
        link: "https://www.youtube.com/embed/rP-3GRY0c1E",
        category: "bike",
    },
    {
        id: 2,
        name: "Name 2",
        thumbnail: "http://i3.ytimg.com/vi/rP-3GRY0c1E/maxresdefault.jpg",
        link: "https://www.youtube.com/embed/rP-3GRY0c1E",
        category: "bike",
    },
    {
        id: 3,
        name: "Name 3",
        thumbnail: "http://i3.ytimg.com/vi/rP-3GRY0c1E/maxresdefault.jpg",
        link: "https://www.youtube.com/embed/rP-3GRY0c1E",
        category: "bike",
    },
    {
        id: 4,
        name: "Name 4",
        thumbnail: "http://i3.ytimg.com/vi/rP-3GRY0c1E/maxresdefault.jpg",
        link: "https://www.youtube.com/embed/rP-3GRY0c1E",
        category: "bike",
    },
    {
        id: 5,
        name: "Name 5",
        thumbnail: "http://i3.ytimg.com/vi/rP-3GRY0c1E/maxresdefault.jpg",
        link: "https://www.youtube.com/embed/rP-3GRY0c1E",
        category: "bike",
    },
    {
        id: 6,
        name: "BMX 1",
        thumbnail: "http://i3.ytimg.com/vi/cZ9Ve7yA9c4/maxresdefault.jpg",
        link: "https://www.youtube.com/embed/cZ9Ve7yA9c4",
        category: "bmx",
    },
    {
        id: 7,
        name: "BMX 2",
        thumbnail: "http://i3.ytimg.com/vi/cZ9Ve7yA9c4/maxresdefault.jpg",
        link: "https://www.youtube.com/embed/cZ9Ve7yA9c4",
        category: "bmx",
    },
    {
        id: 8,
        name: "BMX 3",
        thumbnail: "http://i3.ytimg.com/vi/cZ9Ve7yA9c4/maxresdefault.jpg",
        link: "https://www.youtube.com/embed/cZ9Ve7yA9c4",
        category: "bmx",
    },
    {
        id: 9,
        name: "BMX 4",
        thumbnail: "http://i3.ytimg.com/vi/cZ9Ve7yA9c4/maxresdefault.jpg",
        link: "https://www.youtube.com/embed/cZ9Ve7yA9c4",
        category: "bmx",
    },
    {
        id: 10,
        name: "BMX 5",
        thumbnail: "http://i3.ytimg.com/vi/cZ9Ve7yA9c4/maxresdefault.jpg",
        link: "https://www.youtube.com/embed/cZ9Ve7yA9c4",
        category: "bmx",
    },
]

export const likedVideos = []
export const watchLater = []
export const playlists = []

export const reducer = (state, action) => {
    switch (action.TYPE) {
        case "likeVideo":
            if (state.likedVideos.includes(action.PAYLOAD)) {
                return { ...state, likedVideos: state.likedVideos.filter(video => video !== action.PAYLOAD) }
            } else return { ...state, likedVideos: [...state.likedVideos, action.PAYLOAD] }
        case "watchLater":
            if (state.watchLater.includes(action.PAYLOAD)) {
                return { ...state, watchLater: state.watchLater.filter(video => video !== action.PAYLOAD) }
            } else return { ...state, watchLater: [...state.watchLater, action.PAYLOAD] }
        case "addToPlaylist":
            return {
                ...state,
                playlists: state.playlists.map(playlist =>
                    playlist.id === action.PLAYLIST.id ?
                        { ...playlist, videos: [...playlist.videos, action.PAYLOAD] } :
                        playlist
                )
            }
            case "addNewPlaylist":
            return {...state, playlists: [...state.playlists, {id: state.playlists.length + 1, name: action.PAYLOAD, videos: []}]}
    }
    return state
}

// state.playlists[state.playlists.length - 1].id