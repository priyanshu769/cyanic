export const initialToast = {
  showToast: false,
  toastMessage: ""
}

export const ToastReducer = (state, action) => {
  switch (action.TYPE) {
    case 'set_Toast':
      return { ...state, showToast: action.PAYLOAD.showToast, toastMessage: action.PAYLOAD.toastMessage }
    default:
      break
  }
  return { state }
}
