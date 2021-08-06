export const initialState = {
  loggedInToken: null,
  user: null
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_LOGGED_IN_TOKEN':
      return { ...state, loggedInToken: action.payload }
    default:
      break
  }
  return state
}
