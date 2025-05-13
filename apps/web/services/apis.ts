const BASE_URL = process.env.URL || "http://192.168.0.171:4000"

export const authEndpoints = {
    SIGNUP_API: BASE_URL + "/signup",
    SIGNIN_API: BASE_URL + "/signin"
}
export const userEndpoints = {
    USER_DETAILS_API: BASE_URL + "/userDetails",
    USER_ROOM_DETAILS_API: BASE_URL + "/getAllUserRooms"
}
export const roomEndpoints = {
    JOIN_ROOM: BASE_URL + "/joinRoom",
    CREATE_ROOM: BASE_URL + "/createRoom"
}