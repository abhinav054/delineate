
import { useState } from "react";
import {style, parentBoundary} from './style';
import {Rnd} from "react-rnd";


const TextBlock = ({width, height, fontSize})=>{

    const [cords, setCords] = useState({
        width: 500,
        height: 500,
        x: 0,
        y: 0,
    });

    console.log("this is render call");

    return(
        
      <div style={{"width":width ,"height": height,"fontSize": fontSize, "display": "flex", "justify-content": "center"}}>
          <div>
                Test
          </div>
      </div>
    )
}

export default TextBlock;