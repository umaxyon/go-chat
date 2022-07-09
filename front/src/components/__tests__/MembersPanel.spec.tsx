import MembersPanel from "@/components/MembersPanel"
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from '@testing-library/react';
import { useRecoilValue } from 'recoil'
import renderer from "react-test-renderer"
import { Member } from "src/state/atoms";

afterEach(() => cleanup())

jest.mock("recoil");

const setRecoilMock = (val: Member[]) => {
    (useRecoilValue as jest.Mock).mockImplementation(() => val)
}

const sut = (<MembersPanel />)

describe('MembersPanelテスト', () => {
    it('snapshot test', () => {
        const testMembers = [
            { user: "aaa" }, { user: "bbb" }, { user: "ccc" }
        ]
        setRecoilMock(testMembers)

        const component = renderer.create(sut);
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})




