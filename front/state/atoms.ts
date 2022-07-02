import { atom } from "recoil"

export const membersState = atom({
    key: "members",
    default: [],
})

export const commentsState = atom({
    key: "comments",
    default: [],
})
