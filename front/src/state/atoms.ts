import { atom } from "recoil"

export type Member = {
    user: string
}

export type FeedRow = {
    id: string,
    MessageType: "comment" | "addMember" | "leaveMember" | "system",
    user: string,
    text: string,
    createdAt: any
}

export type LoginData = {
    user: string,
    token: string,
    disconnect?: () => void
}

export const membersState = atom<Member[]>({
    key: "members",
    default: [],
})

export const commentsState = atom<FeedRow[]>({
    key: "comments",
    default: [],
})

export const loginState = atom<LoginData>({
    key: "loginUser",
    default: undefined,
})