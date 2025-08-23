export const redirect = (path) => (dispatch, getState) => {
    dispatch(() => {
        window.location = path
    })
}