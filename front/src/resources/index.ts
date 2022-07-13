export class MessageResources {

    private static resouces: { [ k:string ]: string } = {
        "user_name_too_long" : "ユーザー名は5文字までです",
        "user_already_exist" : "そのユーザー名はすでに使われています。別の名前でログインしてください",
        "text_size_over"     : "%s文字までしか入力できません"
    }

    static get(key: string, ...val: string[]) {
        const resource = MessageResources.resouces[key]
        return MessageResources.format(resource, val || [])
    }

    static format(tmp: string, val: string[]) {
        return val.reduce((p,c) => p.replace(/%s/,c), tmp);
    }
}