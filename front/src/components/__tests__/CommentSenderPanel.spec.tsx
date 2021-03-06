import CommentSenderPanel from "@/components/CommentSenderPanel"
import { MockedProvider } from '@apollo/client/testing';
import "@testing-library/jest-dom/extend-expect";
import { cleanup, screen, fireEvent, render } from '@testing-library/react';
import React from "react";
import renderer from "react-test-renderer"
import { useRecoilState, useRecoilValue } from "recoil";
import { LoginData } from "../../state/atoms";


afterEach(() => cleanup())
const setRecoilValueMock = (val: LoginData) => {
    (useRecoilValue as jest.Mock).mockImplementation(() => val)
}
const setRecoilStateMock = (state: any[]) => {
    (useRecoilState as jest.Mock).mockImplementation(() => state)
}

jest.mock("recoil");

const TEST_TEXT  = "abcde"
const TEST_USER  = "dog"
const TEST_TOKEN = "dummy"

const sut = (
    <MockedProvider addTypename={false}>
        <CommentSenderPanel />
    </MockedProvider>
)

it('snapshot test', () => {
    setRecoilStateMock([ "", jest.mock ])
    const component = renderer.create(sut);
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

describe('CommentSenderPanelテスト', () => {    
    let setComment : jest.Mock

    beforeEach(() => {
        setComment = jest.fn()
        setRecoilValueMock({ user: TEST_USER, token: TEST_TOKEN, lastConnect: 0 })
        setRecoilStateMock([ "", setComment ])
    })

    it('テキストボックスに入力してボタン押すとsetCommentされてボックスがクリアされる', async () => {
        render(sut)
        const textbox = screen.getByRole('textbox')
        expect(textbox).toHaveValue("")
        fireEvent.change(textbox, { target: { value: TEST_TEXT}})
        fireEvent.click(screen.getByRole('button'))
        expect(setComment).toHaveBeenLastCalledWith(TEST_TEXT)
        expect(screen.getByRole('textbox')).toHaveValue("")
    })

    it('テキストボックスに入力してEnterキーを押すとsetCommentされてボックスがクリアされる', () => {
        render(sut)
        const textbox = screen.getByRole('textbox')
        expect(textbox).toHaveValue("")
        fireEvent.change(textbox, { target: { value: TEST_TEXT}})
        fireEvent.keyUp(textbox, { target: { key: "Enter" }})
        expect(setComment).toHaveBeenLastCalledWith(TEST_TEXT)
        expect(screen.getByRole('textbox')).toHaveValue("")
    })

    it('テキストボックスが空でボタンを押すとsetCommentが呼ばれない', () => {
        render(sut)
        fireEvent.click(screen.getByRole("button"))
        expect(setComment).not.toHaveBeenCalled()
    })
    
    it('テキストボックスが空でEnterを押すとsetCommentが呼ばれない', () => {
        render(sut)
        fireEvent.keyUp(screen.getByRole('textbox'), { target: { key: "Enter" }})
        expect(setComment).not.toHaveBeenCalled()
    })
})
