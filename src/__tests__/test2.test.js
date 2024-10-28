
// what to test.
// 1. Test component renders.
// 2. Test component render with props
// 3. test component renders in differeent states.
// 4. test component reacts to events.

// what not to test.

// implementation details.
// third party code
// code that is not important from user point of view.


import Test2 from "../components/TestComponents/test2";
import { screen,render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

describe("Checking the Test2 Component",()=>{
    test("Test2 component with value",()=>{
        const {container}=render(<Test2/>);
        //console.log("container",container.firstChild); 
        expect(container.children.length).toBe(3);  
        
    });
})