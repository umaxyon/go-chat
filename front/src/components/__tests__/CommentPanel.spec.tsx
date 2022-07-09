import CommentPanel from "@/components/CommentPanel"
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from '@testing-library/react';
import renderer from "react-test-renderer"
import { Comment } from "src/state/atoms";

afterEach(() => cleanup())

jest.mock("recoil");

const TEST_COMMENT: Comment = {
    id:   "1",
    user: "test_user",
    text: "あいうえお",
    createdAt: "2022-07-09T22:04:00.2890199+09:00"
}

const sut = (<CommentPanel comment={TEST_COMMENT}/>)

describe('CommentPanelテスト', () => {
    it('snapshot test', () => {
        const component = renderer.create(sut);
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
