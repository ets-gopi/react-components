import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
const StyleButton=styled.button`
border:1px solid red;
background-color:#fff;`
/*
  
*/

const hasValidDimensions = (element) => {
  const { clientWidth, clientHeight} = element;
  console.log(clientWidth,clientHeight);
  
  return clientWidth > 0 && clientHeight > 0;
};
const Datagrid = () => {
  const gridRef=useRef(null);
  const [parentHasDimensions, setParentHasDimensions] = useState(true);
  useEffect(()=>{
    //console.log(gridRef.current);
    const gridEle=gridRef.current;
    //console.log(gridEle.parentElement);
    if(gridEle && gridEle.parentElement){
     // Check if the parent element has valid dimensions
     if (!hasValidDimensions(gridEle.parentElement)) {
      console.error('Error: The DataGrid parent container has no intrinsic dimensions.');
      setParentHasDimensions(false);
    }
      
    }
    
  },[])
  return (
    <React.Fragment>
      <div ref={gridRef} style={{width:"100%",height:"100%"}}>
        
        {!parentHasDimensions ?(<div style={{ color: 'red' }}>
          Warning: Parent container has no dimensions. The DataGrid may not render properly.
        </div>): <table>
          <thead>
            <tr>
              {/* <th>Person 1</th>
              <th>Person 2</th>
              <th>Person 3</th> */}
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td>Emil</td>
              <td>Tobias</td>
              <td>Linus</td>
            </tr>
            <tr>
              <td>16</td>
              <td>14</td>
              <td>10</td>
            </tr> */}
          </tbody>
        </table>}
      </div>
    </React.Fragment>
  )
}

export default Datagrid