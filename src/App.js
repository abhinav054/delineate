import logo from './logo.svg';
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import {parentBoundary} from "./style";
import Textblock from './Textblock';
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

  const [boundaryState ,setboundaryState] = useState({
    width: "100%",
    height: 1000,
    border: "1px solid black",
    display: "flex",
    resize: "vertical",
    overflow: "auto"
  });

  const parentBoundary = {
    width: "100%",
    height: "100%",
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
        },
        {
          "name": "LineChart",
          "type": "linechart",
          "positions":{
            "width": 500,
            "height": 500,
            "x":0,
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
    let totalHieght = 0;
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
        totalHieght = totalHieght +maxLineHeight;
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
    // square off the last max height
    totalHieght = totalHieght + maxLineHeight;
    let boundaryStateCopy = {...boundaryState};
    boundaryStateCopy.height = totalHieght;
    setboundaryState(boundaryStateCopy);
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
    let height = boundaryState.minHeight;
    let boundaryStateCopy = {...boundaryState};
    if(y+widgetsCopy[index].height>height){
      
      boundaryStateCopy.width = y+widgetsCopy[index].height;

    
    }
    widgetsCopy[index].positions = {
          ...widgetsCopy[index].positions,
          x: x,
          y: y
    }

    console.log(widgetsCopy);

    setWidgets(widgetsCopy);

  }


  const onDrag = (e,d)=>{
    
    let x = d.x;
    
    let y = d.y+500;

    let boundaryStateCopy = {...boundaryState};
    console.log(boundaryState);
    console.log(d);
    if(y>=boundaryStateCopy.height){

      console.log(boundaryStateCopy);
      boundaryStateCopy.height = y+100;
    } 


    setboundaryState(boundaryStateCopy);

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

  const Counter = props => {
    const renderCounter  = useRef(0);
    renderCounter.current = renderCounter.current + 1;
    return <h1>Renders: {renderCounter.current}, {props.message}</h1>;
  };

  return (
    <div className='main-container' style={boundaryState}>
      {/* <Barchart x={x} y={y} width={500} height={500}></Barchart> */}

      {/* <PieChart x={x} y={y} width={500} height={500}></PieChart> */}
      {/* <LineChart x={x} y={y}></LineChart> */}
      {/* <Rnd
          style={style}
          bounds="window"
          size={{
                  width: 500,
                  height: 500,
                }}
                position={{
                  x: cords.x,
                  y: cords.y,
                }}
                onDrag= {(e,d)=>{
                  onDrag(e,d);
                }}
                onDragStop={(e, d) => {
                  
                  let cordsCopy = {...cords};
                  cordsCopy.x = d.x;
                  cordsCopy.y = d.y;              
                  setCords(cordsCopy);


                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  onResize(e, direction, ref, delta, position)
                }}
            >
                <Textblock></Textblock>
            </Rnd>
       */}
      {
        widgets.map((widget, index)=>{
        return(
            <Rnd
              style={style}
              bounds="window"
              size={{
                  width: widget.positions.width,
                  height: widget.positions.height,
                }}
                position={{
                  x: widget.positions.x,
                  y: widget.positions.y,
                }}
                onDrag= {(e,d)=>{
                  if(boundaryState.height<(d.y+widget.positions.height)){
                    let boundaryStateCopy = {...boundaryState};
                    boundaryStateCopy.height = boundaryStateCopy.height+200;
                    setboundaryState(boundaryStateCopy);
                  }

                }}
                onDragStop={(e, d) => {
                  onDragStopV2(e,d,index);
                }}
                onResize={(e, direction, ref, delta, position)=>{

                  let y = widget.positions.x + ref.offsetHeight;

                  let boundaryStateCopy = {...boundaryState}

                  if(y>boundaryStateCopy.height){
                    boundaryStateCopy.height = boundaryStateCopy.height+5;
                    setboundaryState(boundaryStateCopy);
                  }


                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  onResize(e, direction, ref, delta, position, index)
                }}
            >
              {(widget.type=="barchart")&&<Barchart x={x} y={y} width={widget.positions.width} height={widget.positions.height} id={"barchart-"+index}></Barchart>}
              {(widget.type=="piechart")&&<PieChart x={x} y={y} width={widget.positions.width} height={widget.positions.height} id={"piechart-"+index}></PieChart>}
              {(widget.type=="linechart")&&<LineChart x={x} y={y} width={widget.positions.width} height={widget.positions.height} id={"linechart-"+index}></LineChart>}
              {(widget.type=="textblock"&&<Textblock width={widget.positions.width} height={widget.positions.height} fontSize={20} id={"textblock-"+index}></Textblock>)}
            </Rnd>
        )

      })
      }

    </div>
  );
}

export default App;
