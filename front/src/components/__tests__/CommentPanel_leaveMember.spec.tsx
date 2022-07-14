import CommentPanel from "@/components/CommentPanel"
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen } from '@testing-library/react';
import renderer from "react-test-renderer"
import { FeedRow } from "../../state/atoms";

afterEach(() => cleanup())

const TEST_COMMENT: FeedRow = {
    id:   "1",
    MessageType: "leaveMember",
    user: "test_user",
    text: "",
    createdAt: "2022-07-09T22:04:00.2890199+09:00"
}

const sut = (<CommentPanel feed={TEST_COMMENT}/>)

describe('CommentPanelテスト(leaveMember)', () => {
    it('snapshot test', () => {
        const component = renderer.create(sut);
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('leaveMemberタイプの場合は退室メッセージが表示されること', () => {
        render(sut)
        expect(screen.getByText(`${TEST_COMMENT.user}が退室しました`)).toBeInTheDocument()
    })
})
