import {screen,render} from "@testing-library/react";
import Greet from "./greet";
import '@testing-library/jest-dom/extend-expect';

test("Greet Renders Correctly.",()=>{
    render(<Greet />);
    const txtEle=screen.getByText("Hello");
    expect(txtEle).toBeInTheDocument();
});

test("Greet Renders Correctly with name.",()=>{
    render(<Greet name={"gopi"}/>);
    const txtEle=screen.getByText("Hello gopi");
    expect(txtEle).toBeInTheDocument();
});