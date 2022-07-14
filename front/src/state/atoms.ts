import { atom } from "recoil"

export type Member = {
    user: string
}

export type FeedRow = {
    id: string,
    MessageType: "comment" | "addMember" | "leaveMember" | "system" | "error",
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

export const feedsState = atom<FeedRow[]>({
    key: "feeds",
    default: [],
})

export const inputCommentState = atom<string>({
    key: "inputComment",
    default: "",
})

export const loginState = atom<LoginData>({
    key: "loginUser",
    default: undefined,
})

export const bottomInfoState = atom<string>({
    key: "bottomInfo",
    default: "",
})