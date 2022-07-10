import CommentSenderPanel from "@/components/CommentSenderPanel"
import { MockedProvider } from '@apollo/client/testing';
import "@testing-library/jest-dom/extend-expect";
import { cleanup, screen, fireEvent, render } from '@testing-library/react';
import React from "react";
import renderer from "react-test-renderer"
import { useRecoilValue } from "recoil";
import { LoginData } from "../../state/atoms";


afterEach(() => cleanup())
const setRecoilMock = (val: LoginData) => {
    (useRecoilValue as jest.Mock).mockImplementation(() => val)
}

jest.mock("recoil");

const TEST_TEXT = "abcde"
const TEST_USER = "dog"

const sut = (
    <MockedProvider addTypename={false}>
        <CommentSenderPanel />
    </MockedProvider>
)

it('snapshot test', () => {
    const component = renderer.create(sut);
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

describe('CommentSenderPanelテスト', () => {
    let useStateSpy: jest.SpyInstance
    let setComment : jest.Mock

    const setCommentSpySetup = (initial: string) => {
        useStateSpy.mockImplementation((): any => [initial, setComment] as any)
    }

    beforeEach(() => {
        setComment = jest.fn()
        useStateSpy = jest.spyOn(React, "useState")
        setCommentSpySetup("")
        setRecoilMock({ user: TEST_USER })
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
