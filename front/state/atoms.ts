import { atom } from "recoil"

type Member = {
    user: string
}

type Comment = {
    id: string,
    user: string,
    text: string,
    createdAt: any
}

export const membersState = atom<Member[]>({
    key: "members",
    default: [],
})

export const commentsState = atom<Comment[]>({
    key: "comments",
    default: [],
})
