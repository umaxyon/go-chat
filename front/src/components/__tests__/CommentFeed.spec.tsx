import CommentFeed from "@/components/CommentFeed"
import { cleanup, screen, fireEvent, render } from '@testing-library/react';
import { useRecoilValue } from "recoil";
import renderer from "react-test-renderer"
import { Comment } from "src/state/atoms";


afterEach(() => cleanup())
jest.mock("../InitLoad", () => "InitLoad")
jest.mock("recoil");
const setRecoilMock = (val: Comment[]) => {
    (useRecoilValue as jest.Mock).mockImplementation(() => val)
}


const TEST_COMMENTS: Comment[] = [
    { id:   "1", user: "test_user1", text: "あああああ", createdAt: "2022-07-09T22:04:00.2890199+09:00" },
    { id:   "2", user: "test_user2", text: "いいいいい", createdAt: "2022-07-09T22:05:00.2890199+09:00" },
    { id:   "3", user: "test_user3", text: "ううううう", createdAt: "2022-07-09T22:06:00.2890199+09:00" },
]
const sut = (<CommentFeed />)

describe('CommentFeedテスト', () => {
    it("snapshot test", () => {
        setRecoilMock(TEST_COMMENTS)
        const component = renderer.create(sut);
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})