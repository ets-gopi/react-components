import Test1 from "./test1";
import { screen,render } from "@testing-library/react";
describe("Checking the Test1 Component",()=>{
    test("Test1 component with value",()=>{
        const {container}=render(<Test1/>);
        //console.log("container",container);
        
    })
})