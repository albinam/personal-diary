const initialState = {
    fullName: "Мухаметова А. Р.",
    role: "Автор",
    avatar: "https://dl.dropboxusercontent.com/s/cmv6p1z62xr7nhm/plant-pot.png",
    id:0
};
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}