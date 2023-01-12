import { useEffect, useRef, useCallback } from "react";
import * as d3 from 'd3'

const Barchart = ({
    x,
    y,
    width,
    height,
    yFormat,
    yLabel,
    color
})=>{

    const data = [
        {
            "name" : "point1",
            "value" : 12
        },
        {
            "name": "point2",
            "value": 5
        },
        {
            "name": "point3",
            "value": 6
        },
        {
            "name": "point4",
            "value": 6
        },
        {
            "name": "point5",
            "value": 6
        },
        {
            "name": "point6",
            "value": 9
        },
        {
            "name": "point7",
            "value": 10
        }
    ];


    const drawChart = (node)=>{


    };
    const bargraph = useCallback((node)=>{
            let color = "#FFF9C4";
            let colorBorder = "#FFEB3B";
            let colorToottip = "#FBC02D";
            
            if(x.length!=0&&y.length!=0){

                const parentNode = d3.select(node);
                let X = [...x];
                let Y = [...y];
                const scale = 20;
                const marginTop = 20; // the top margin, in pixels
                const marginRight = 0; // the right margin, in pixels
                const marginBottom = 30; // the bottom margin, in pixels
                const marginLeft = 40;
                const xPadding = 0.1;
                let xDomain = X;
                xDomain = new d3.InternSet(xDomain);
                let yDomain = [0,d3.max(Y)];
                const xRange = [marginLeft, width- marginRight]; // [left, right]
                const yRange = [height - marginBottom, marginTop];
                const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
                const yType = d3.scaleLinear;
                const yScale = yType(yDomain, yRange);
                const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
                const yAxis = d3.axisLeft(yScale).ticks(width / 40, yFormat);
                let title = "";
                if (xDomain === undefined) xDomain = X;
                const I = d3.range(X.length).filter(i => xDomain.has(X[i]));

                if (yDomain === undefined) yDomain = [0, d3.max(Y)];
                xDomain = new d3.InternSet(xDomain);


                parentNode.select("*").remove();


                const svgCanvas = parentNode.append("svg");

                svgCanvas
                    .attr("width", width)
                    .attr("height", height)
                    .attr("viewBox", [0, 0, width, height])
                    .style("border", "1px solid black");

                
                svgCanvas.select(".x-axis").call(xAxis);
                svgCanvas.select(".y-axis").call(yAxis);
                
                const data = [
                    {
                        "name" : "point1",
                        "value" : 12
                    },
                    {
                        "name": "point2",
                        "value": 5
                    },
                    {
                        "name": "point3",
                        "value": 6
                    },
                    {
                        "name": "point4",
                        "value": 6
                    },
                    {
                        "name": "point5",
                        "value": 6
                    },
                    {
                        "name": "point6",
                        "value": 9
                    },
                    {
                        "name": "point7",
                        "value": 10
                    }
                ];


                // 
            
                // Append a circle
                // svgCanvas.append("circle")
                //     .attr("id", "circleBasicTooltip")
                //     .attr("cx", 150)
                //     .attr("cy", 200)
                //     .attr("r", 3)
                //     .attr("fill", "#69b3a2");            

                //create a tooltip
                // var tooltip = d3.select("#my_dataviz")
                // .append("div")
                // .style("position", "absolute")
                // .style("visibility", "hidden")
                // .text("I'm a circle!");

                svgCanvas.append("g")
                    .attr("transform", `translate(${marginLeft},0)`)
                    .call(yAxis)
                    .call(g => g.select(".domain").remove())
                    .call(g => g.selectAll(".tick line").clone()
                        .attr("x2", width - marginLeft - marginRight)
                        .attr("stroke-opacity", 0.1))
                    .call(g => g.append("text")
                        .attr("x", -marginLeft)
                        .attr("y", 10)
                        .attr("fill", "currentColor")
                        .attr("text-anchor", "start")
                        .text(yLabel));
                


                const mouseover = (event, d) => {
                    // tooltip.style("opacity", 1);
                };
            
                const mouseleave = (event, d) => {
                    // tooltip.style('opacity', 0);
                }
        
                const mousemove = (event, d) => {
                        const text = d3.select('.tooltip-area__text');
                        text.text(`Sales were ${d.sales} in ${d.year}`);
                        const [x, y] = d3.pointer(event);
                    // tooltip
                    //     .attr('transform', `translate(${x}, ${y})`);
                };
            


                const mouseenterevent = (event, d)=>{
                        
                        let x = X[d];
                        
                        let y = Y[d];
                        
                        d3.select("#"+x)
                        .attr("stroke", colorBorder);
                        
                        let tooltip = d3.select("#"+x+"_tooltip")
                        .attr("visibility", "visible");
                        

                        var tooltiptext = d3.select("#tooltip-text")
                                            .text(x+", "+y);
                        
                        var textwidth = tooltiptext.node().getBBox().width;
                        
                        let transformwidth;

                        if((width - (xScale(x)+(xScale.bandwidth()/2+4)))<textwidth){
                            
                            transformwidth = (xScale(x) - (textwidth+4));
                            
                        }else{
                        
                            transformwidth = (xScale(x)+(xScale.bandwidth()/2+4));
                        
                        }


                        tooltiptext
                            .attr("transform",`translate (${transformwidth}, ${yScale(y)+5})`)
                            .attr("visibility", "visible");


                }

                const mouseleaveevent = (event,d)=>{
                        let x = X[d];
                        d3.select("#"+x)
                            .attr("stroke", color);
                        d3.select("#"+x+"_tooltip")
                            .attr("visibility", "hidden");
                        d3.select("#tooltip-text")
                            .attr("visibility", "hidden")
                }



                const bar = svgCanvas.append("g")
                    .attr("fill", color)
                    .selectAll("rect")
                    .data(I)
                    .join("rect")
                        .attr("id", (i)=>{
                            let x = X[i];
                            return x;
                        })
                        .attr("x", (i) => {
                            return xScale(X[i])
                        })
                        .attr("y", (i) => {
                            return yScale(Y[i])
                        })
                        .attr("height", (i) =>{
                            return (yScale(0) - yScale(Y[i]))
                        })
                        .attr("width", xScale.bandwidth())
                        .attr("stroke-width",3)
                        .on("mouseenter", mouseenterevent)
                        .on("mouseleave", mouseleaveevent);
                
                if (title) bar.append("title")
                        .text(title);
                

                svgCanvas.append("g")
                        .attr("transform", `translate(0,${height - marginBottom})`)
                        .call(xAxis);
                    
                const toottip = svgCanvas.append("g")
                        .attr("fill", colorToottip)
                        .selectAll("circle")
                        .data(I)
                        .join("circle")
                            .attr("id", (i)=>{
                                let x = X[i]
                                return x+"_tooltip"
                            })
                            .attr("visibility", "hidden")
                            .attr("cx",(i)=>{
                                return (xScale(X[i])+(xScale.bandwidth()/2))
                            })
                            .attr("cy",(i)=>{
                                return yScale(Y[i]);
                            })
                            .attr("r",4)
                const tooltiptext = svgCanvas.append("text")
                                    .attr("id","tooltip-text")
                                    .attr("x", 0)
                                    .attr("y", 0)
                                    .attr("visibility", "hidden")

            }
            
    },[width, height, x,y]);


    return (
        <div
            ref={bargraph}
        >

        </div>
    )



};

export default Barchart;