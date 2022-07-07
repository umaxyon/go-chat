import CommentSenderPanel from "@/components/CommentSenderPanel"
import { MockedProvider } from '@apollo/client/testing';
import "@testing-library/jest-dom/extend-expect";
import { cleanup, screen, fireEvent, render } from '@testing-library/react';
import React from "react";
import renderer from "react-test-renderer"

afterEach(() => cleanup())

const sut = (
    <MockedProvider addTypename={false}>
        <CommentSenderPanel user="dog"/>
    </MockedProvider>
)

describe('CommentSenderPanelテスト', () => {
    it('snapshot test', () => {
        const component = renderer.create(sut);
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
    
    it('テキストボックスに入力してボタン押すとsetStateされてボックスがクリアされる', () => {
        const setComment = jest.fn()
        const useStateSpy = jest.spyOn(React, "useState")
        useStateSpy.mockImplementation((): any => ["", setComment] as any)
    
        render(sut)
        const textbox = screen.getByRole('textbox')
    
        expect(textbox).toHaveValue("")
        fireEvent.change(textbox, { target: { value: "abcde"}})
        fireEvent.click(screen.getByRole('button'))
        expect(setComment).toHaveBeenLastCalledWith("abcde")
        expect(screen.getByRole('textbox')).toHaveValue("")
    })

    it('テキストボックスに入力してEnterキーを押すとsetStateされてボックスがクリアされる', () => {
        const setComment = jest.fn()
        const useStateSpy = jest.spyOn(React, "useState")
        useStateSpy.mockImplementation((): any => ["", setComment] as any)
    
        render(sut)
        const textbox = screen.getByRole('textbox')
    
        expect(textbox).toHaveValue("")
        fireEvent.change(textbox, { target: { value: "abcde"}})
        fireEvent.keyUp(textbox, { target: { key: "Enter" }})
        expect(setComment).toHaveBeenLastCalledWith("abcde")
        expect(screen.getByRole('textbox')).toHaveValue("")
    })
})
