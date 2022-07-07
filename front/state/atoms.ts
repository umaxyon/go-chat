import { atom } from "recoil"

export type Member = {
    user: string
}

export type Comment = {
    id: string,
    user: string,
    text: string,
    createdAt: any
}

export type LoginData = {
    user: string,
    disconnect?: () => void
}

export const membersState = atom<Member[]>({
    key: "members",
    default: [],
})

export const commentsState = atom<Comment[]>({
    key: "comments",
    default: [],
})

export const loginState = atom<LoginData>({
    key: "loginUser",
    default: undefined,
})