import { useRecoilValue } from "recoil"
import { membersState } from "../state/atoms"


const MembersPanel = () => {
    const members = useRecoilValue(membersState)

    return (
        <div className="w-full h-full p-1">
            {members.map((m, i) => { return (
                <div key={`${m.user}_${i}`} className="text-sm">{m.user}</div>
            )})}
        </div>
    )
}
export default MembersPanel
