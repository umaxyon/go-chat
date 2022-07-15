import { atom, selector } from "recoil"

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
    lastConnect: number,
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

export const connectIntervalSelector = selector({
    key: "connectInterval",
    get: ({ get }) => {
        const dat = get(loginState)
        return dat.lastConnect
    },
    set: ({ get, set }, newVal) => {
        const dat = get(loginState)
        set(loginState, { ...dat, lastConnect: newVal as number })
    }
})