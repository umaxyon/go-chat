const pad = (n:number) => ('00' + n).slice(-2)

export const formatYMDHms = (date: Date) => {
    return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}