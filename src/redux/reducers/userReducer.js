const initialState = {
    fullName: "Мухаметова Альбина Рамилевна",
    role: "Автор",
    avatar: "https://dl.dropboxusercontent.com/s/efmsmip0tn13qag/cat.png",
    id:0
};
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}