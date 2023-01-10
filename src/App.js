import logo from './logo.svg';
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import {parentBoundary} from "./style";
import Texblock from './Texblock';
import LineitemTest from './LineitemTest';
import LineChart from './LineChart';
import PieChart from './PieChart';
import Barchart from './Barchart';
import { Rnd } from 'react-rnd';
import * as d3 from 'd3'

// handle x,y while resizing

function App() {

  const data = [
    {
    "name": "Point1",
    "value": 45
    },
    {
      "name": "Point2",
      "value": 10
    },
    {
      "name": "Point3",
      "value": 50
    },
    {
      "name": "Point4",
      "value": 60
    },
    {
      "name": "Point5",
      "value": 100
    },
    {
      "name": "Point6",
      "value": 105
    }
  ];




  const [cords, setCords] = useState({
    width: 500,
    height: 500,
    x: 0,
    y: 0,
  });

  const parentBoundary = {
    width: "100%",
    minHeight: "1000px",
    border: "1px solid black",
    display: "flex"
  };


  const [totalWidth, setTotalWidth] = useState(0);

  const [containerWidth, setContainerWidth] = useState(0);

  const [widgets, setWidgets] = useState([]);


  let initialX = 0;
  let initialY = 0;


  useEffect(()=>{
    
    let maincontainer = document.querySelector(".main-container");
    let width = maincontainer.offsetWidth;
    setContainerWidth(width);

  })


  useEffect(()=>{

    if(widgets.length==0){

      let w = [
        
        {
          "name": "Piechart",
          "type": "piechart",
          "positions": {
            "width": 500,
            "height": 500,
            "x": 0,
            "y": 0
          }
        },
        {
          "name": "Piechart",
          "type": "piechart",
          "positions": {
            "width": 500,
            "height": 500,
            "x": 0,
            "y": 0
          }
        },
        {
          "name": "Piechart",
          "type": "piechart",
          "positions": {
            "width": 500,
            "height": 500,
            "x": 0,
            "y": 0
          }
        },
        {
          "name": "Barchart",
          "type": "barchart",
          "positions": {
            "width": 500,
            "height": 500,
            "x": 0,
            "y": 0
          }
        },
        {
          "name": "Piechart",
          "type": "piechart",
          "positions": {
            "width": 500,
            "height": 500,
            "x": 0,
            "y": 0
          }
        }
      ]

      calculatePositions(w);


    }else{
      return
    }

  },[widgets])

  const calculatePositions = (widgets)=>{


    let widgetsCopy = widgets;

    let maincontainer = document.querySelector(".main-container");
    let cwidth = maincontainer.offsetWidth;
    let totalwidthavailable = cwidth;
    let widthAvailable = cwidth;
    let maxLineHeight = 0;
    let currentHeightIndex = 0;
    let number_of_lines = 0;

    for(let i=0; i < widgetsCopy.length; i++){
      
      let positions = {...widgetsCopy[i].positions};
      let x;
      let y;
      // console.log("index",i);
      if(widthAvailable>positions.width){
        y = currentHeightIndex;
        if(positions.height>maxLineHeight){
            maxLineHeight = positions.height;
        }

        x = (totalwidthavailable - widthAvailable);
      widthAvailable = widthAvailable - positions.width;

      }else{
        number_of_lines = number_of_lines+1;
        y = maxLineHeight;
        currentHeightIndex = maxLineHeight;
        x = 0;
        maxLineHeight = 0;
        widthAvailable = (totalwidthavailable-positions.width);

      }

      widgetsCopy[i].positions = {
            ...widgetsCopy[i].positions,
            x: x,
            y:y
      }
    }

    console.log(widgetsCopy);
    setWidgets(widgetsCopy);

  } 







  const onDragStop = (e, d, index)=>{

    let x = d.x;

    let y = d.y;


    let widgetsCopy = [...widgets];

    let newposition_index = 0;

    for(let i =0; i < widgetsCopy.length; i++){
    
      let position = widgetsCopy[i].positions;
      
      if(x>position.x&&y>position.y){

        newposition_index = i;
        break;

      }
    
    }

    let widget = widgetsCopy.splice(index,1);
    
    widgetsCopy.splice(newposition_index,0,widget[0]);
    
    calculatePositions(widgetsCopy);

  }


  const onDragStopV2 = (e, d, index)=>{

    let x = d.x;
    let y = d.y;
    let widgetsCopy = [...widgets];
    widgetsCopy[index].positions = {
          ...widgetsCopy[index].positions,
          x: x,
          y: y
    }

    setWidgets(widgetsCopy);

  }

  const onResize = (e, direction, ref, delta, position, index)=>{
    
    let widgetsCopy = [...widgets];
    
    let widgetmoved = widgetsCopy[index];
    
    let x = widgetmoved.positions.x;
    
    let y = widgetmoved.positions.y;

    let width = widgetmoved.positions.width;
    
    let height = widgetmoved.positions.height;
    
    let new_height = ref.offsetHeight;

    let new_width = ref.offsetWidth;

    // if(direction=="top"){

    //   if(new_height<height){
    //     widgetsCopy[index].positions = {...widgetsCopy[index].positions,
    //                                 height: new_height
    //                               }
    //   }else{

    //     let start_position_x = x;
      
    //     let end_position_x = x+width;

    //     let new_y_position = y -(new_height-height);

    //     // resize widget
    //     for(let i =0; i < widgetsCopy.length; i++){

    //       let widget_start_x = widgetsCopy[i].positions.x;
        
    //       let widget_end_x = widgetsCopy[i].positions.x + widgetsCopy[i].positions.width;

    //       if(widget_end_x>start_position_x&&widget_start_x<end_position_x){
      
    //         let widget =  widgetsCopy[i];
          
    //         let widget_y_end = widget.positions.y + widget.positions.height;

    //         if(new_y_position<widget_y_end){

    //           // 
    //           let size = widgetsCopy[i].positions.height -(new_y_position-widget_y_end);

    //           if(size>=0){
                
    //             widgetsCopy[i].positions = {...widgetsCopy[i].positions,
    //                                       height: size
    //                                       }
    //           }else{
                
    //             widgetsCopy[i].positions = {...widgetsCopy[i].positions,
    //                                       height: 0
    //                                     }
                
    //           }


    //         }

    //       }

    //     }

    //     widgetsCopy[index].positions = {...widgetsCopy[index].positions,
    //                                     height: new_height
    //                                     }
        



    //   }

    // }

    // if(direction=="rightTop"){
      
    //   let start_position_y = y;
      
    //   let end_position_y = y+height;

    //   let start_postion_x = x;

    //   let end_postion_x = x;


    //   // resize width
    //   if(new_width<width){




    //     widgetsCopy[index].positions = {...widgetsCopy[index].positions,
    //                                     width: new_width
    //                                 }


    //   }else{



    //     let new_x_position = x +(new_width-width);


    //     for(let i=0; i < widgetsCopy[i].length; i++){
    //         let widget_start_y = widgetsCopy[i].positions.y;
    //         let widget_end_y = widgetsCopy[i].positions.y+ widgetsCopy[i].positions.height;
    //         if(widget_end_y > start_position_y&&widget_start_y < end_position_y){
              
    //           let widget =  widgetsCopy[i];
          
    //           let widget_x_end = widget.positions.x + widget.positions.height;



    //           if(new_x_position<widget_x_end){

    //             // 
    //             let size = widgetsCopy[i].positions.width -(new_x_position - widget_x_end);
  
    //             if(size>=0){
                  
    //               widgetsCopy[i].positions = {...widgetsCopy[i].positions,
    //                                         width: size
    //                                         }
    //             }else{
                  
    //               widgetsCopy[i].positions = {...widgetsCopy[i].positions,
    //                                         width: 0
    //                                       }
                  
    //             }
  
  
    //           }


    //         }

    //     }

    //     widgetsCopy[index].positions = {...widgetsCopy[index].positions, 
    //                                     width: new_width
    //                                   }
      
    //   }

    //   // resize height

    //   if(new_height<height){

    //     widgetsCopy[index].positions = {...widgetsCopy[index].positions,
    //                                     height: new_height
    //                                   }
    //   }else{

    //     let start_position_x = x;
      
    //     let end_position_x = x+width;

    //     let new_y_position = y -(new_height-height);

    //     // resize widget
    //     for(let i =0; i < widgetsCopy.length; i++){

    //       let widget_start_x = widgetsCopy[i].positions.x;
        
    //       let widget_end_x = widgetsCopy[i].positions.x + widgetsCopy[i].positions.width;

    //       if(widget_end_x>start_position_x&&widget_start_x<end_position_x){
      
    //         let widget =  widgetsCopy[i];
          
    //         let widget_y_end = widget.positions.y + widget.positions.height;

    //         if(new_y_position<widget_y_end){

    //           // 
    //           let size = widgetsCopy[i].positions.height -(new_y_position-widget_y_end);

    //           if(size>=0){
                
    //             widgetsCopy[i].positions = {...widgetsCopy[i].positions,
    //                                       height: size
    //                                       }
    //           }else{
                
    //             widgetsCopy[i].positions = {...widgetsCopy[i].positions,
    //                                       height: 0
    //                                     }
                
    //           }


    //         }

    //       }

    //     }

    //     widgetsCopy[index].positions = {...widgetsCopy[index].positions,
    //                                     height: new_height
    //                                     }
        

    //   }

    // }

    // if(direction=="rightBottom"){
      
    //   let start_position_x = x;
      
    //   let end_position_x = y;

    //   let new_x_position = x


    // }
    
    widgetsCopy[index].positions = {...widgetsCopy[index].positions,
                                width: ref.offsetWidth,
                                height: ref.offsetHeight,
                                x: position.x,
                                y: position.y
                              }
    
    


    

    setWidgets(widgetsCopy);
    // calculatePositions(widgetsCopy);                       
  
  }

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0",
  };


  const x = data.map((d)=>{ return d.name});
  const y = data.map((d)=>{ return d.value});

  return (
    <div className='main-container' style={parentBoundary}>
      {/* <Barchart x={x} y={y} width={500} height={500}></Barchart> */}

      {/* <PieChart x={x} y={y} width={500} height={500}></PieChart> */}
      {/* <LineChart x={x} y={y}></LineChart> */}
      {
        widgets.map((widget, index)=>{
        return(
            <Rnd
              style={style}
              bounds="parent"
              size={{
                  width: widget.positions.width,
                  height: widget.positions.height,
                }}
                position={{
                  x: widget.positions.x,
                  y: widget.positions.y,
                }}
                onMouseDown={(e)=>{
                  console.log(e);
                }}
                onDragStop={(e, d) => {
                  onDragStopV2(e,d,index);
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  onResize(e, direction, ref, delta, position, index)
                }}
            >
              {(widget.type=="barchart")&&<Barchart x={x} y={y} width={widget.positions.width} height={widget.positions.height}></Barchart>}
              {(widget.type=="piechart")&&<PieChart x={x} y={y} width={widget.positions.width} height={widget.positions.height} id={"piechart-"+index}></PieChart>}
              {(widget.type=="linechart")&&<LineChart x={x} y={y} width={widget.positions.width} height={widget.positions.height}></LineChart>}
            </Rnd>
        )

      })
      }

    </div>
  );
}

export default App;
