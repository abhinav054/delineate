
import { useState } from "react";
import {style, parentBoundary} from './style';
import {Rnd} from "react-rnd";


const TextBlock = ()=>{

    const [cords, setCords] = useState({
        width: 500,
        height: 500,
        x: 0,
        y: 0,
    });

    return(
        <Rnd 
            style={style}
            bounds="parent"
            size={{
                width: cords.width,
                height: cords.height,
              }}
              position={{
                x: cords.x,
                y: cords.y,
              }}
              onMouseDown={(e)=>{
                console.log(e);
              }}
              onDragStop={(e, d) => {
                console.log(d.x);
                console.log(d.y);
                setCords({ ...cords,
                            x: d.x, 
                            y: d.y 
                        });
              }}
              onResizeStop={(e, direction, ref, delta, position) => {
                console.log(delta);
                setCords((prev)=>({
                  ...prev,
                  width: prev.width+delta.width,
                  height: prev.height+delta.height,
                }));
              }}
        
        >
            001
        </Rnd>
    )
}

export default TextBlock;