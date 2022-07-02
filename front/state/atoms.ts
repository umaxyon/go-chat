import { atom } from "recoil"

export const usersState = atom({
    key: "users",
    default: [],
})

export const commentsState = atom({
    key: "comments",
    default: [],
})
