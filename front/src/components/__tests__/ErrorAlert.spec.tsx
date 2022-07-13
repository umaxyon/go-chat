import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen } from '@testing-library/react';
import renderer from "react-test-renderer"
import ErrorAlert from "../ErrorAlert";

afterEach(() => cleanup())

describe('ErrorAlertテスト', () => {
    it('snapshot test', () => {
        const component = renderer.create(<ErrorAlert errKey="user_name_too_long"/>);
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('errKeyが空の場合、メッセージが表示されない', () => {
        render(<ErrorAlert errKey=""/>)
        expect(screen.getByTestId("non-error")).toBeInTheDocument()
        expect(screen.getByTestId("non-error").innerHTML).toMatch("")
    })
})
