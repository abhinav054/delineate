import { useEffect, useRef, useCallback } from "react";
import {unemployment} from "./unemployment";
import * as d3 from 'd3'




const LineChart = (
    {
        x,
        y,
        width,
        height,
        xdataType,
        yDataType,
        yFormat,
        yLabel
    
    }
)=>{


    const getToolType = ()=>{
        let avgHieght = x/width;
        
        if(parseFloat(avgHieght)<parseFloat(15)){
            return "adaptive";
        }else{
            return "fixed";
        }
        

    }

    const lineGraph = useCallback((node)=>{

        const poinetermoved = (event)=>{
            

            let tooltiptype = getToolType();

            if(tooltiptype=="adaptive"){
                const [xm, ym] = d3.pointer(event);
                console.log(xm, ym);
            }
            
            if(tooltiptype=="fixed"){
                


            }
            

            // const i = d3.least(I, i => Math.hypot(xScale(X[i])) - xm, yScale(Y[i]) - ym);


        }


        if(node!=null&&x.length!=0&&y.length!=0){
            const parentNode = d3.select(node);
            const svg = parentNode.select('svg').node()
                            ? parentNode.select('svg')
                            : parentNode.append('svg')
                                .attr('width', width)
                                .attr('height', height)
                                .attr("viewBox", [0, 0, width, height])
                                .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
                                .on("pointerenter", ()=>{})
                                .on("pointermove",poinetermoved);
        
            const X = [...x];
            const Y = [...y];
            const I = d3.range(X.length);
            const curve = d3.curveLinear; // method of interpolation between points
            const marginTop = 20; // top margin, in pixels
            const marginRight = 30; // right margin, in pixels
            const marginBottom = 30; // bottom margin, in pixels
            const marginLeft = 40; // left margin, in pixels
            const yType = d3.scaleLinear;
            let xDomain = new d3.InternSet(X);;
            let yDomain = [0, d3.max(Y)];
            let xRange = [marginLeft, width - marginRight]; // [left, right]
            let yRange = [height - marginBottom, marginTop];

            // Compute default domains.
            if (yDomain === undefined) yDomain = [0, d3.max(Y)];

            // Construct scales and axes.
            const xScale = d3.scalePoint(xDomain, xRange);
            const yScale = yType(yDomain, yRange);


            const xAxis = d3.axisBottom(xScale).ticks(width / 40).tickSizeOuter(0);
            const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);


            const color = "currentColor"; // stroke color of line
            const strokeLinecap = "round"; // stroke line cap of the line
            const strokeLinejoin = "round"; // stroke line join of the line
            const strokeWidth = 1.5; // stroke width of line, in pixels
            const strokeOpacity = 1; // stroke opacity of line

            // Construct a line generator.
            const line = d3.line()
                    .curve(curve)
                    .x((i) => {
                        return xScale(X[i])
                    })
                    .y(i => yScale(Y[i]));
            
            

            const tooltiptext = svg.append("text")
                .attr("id","tooltip-text")
                .attr("x", 0)
                .attr("y", 0)
                .attr("visibility", "hidden")
            
            const mouseovertooltip = (event,d)=>{
                
                let x = X[d];
                let y = Y[d];
            
                tooltiptext
                            .text(x+", "+y);
                        
                var textwidth = tooltiptext.node().getBBox().width;
                        
                let transformwidth;

                if((width - (xScale(x)))<textwidth){
                            
                    transformwidth = (xScale(x) - (textwidth+5));
                            
                }else{
                        
                    transformwidth = (xScale(x)+5);
                        
                }

                tooltiptext
                    .attr("transform",`translate (${transformwidth}, ${yScale(y)+5})`)
                    .attr("visibility", "visible");


            }

            const mouseouttooltip = (event,d)=>{
                tooltiptext
                    .attr("visibility", "hidden");
            }
            

            

            svg.append("g")
                    .attr("transform", `translate(0,${height - marginBottom})`)
                    .call(xAxis);

            svg.append("g")
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
            

            svg.append("path")
                .attr("fill", "none")
                .attr("stroke", color)
                .attr("stroke-width", strokeWidth)
                .attr("stroke-linecap", strokeLinecap)
                .attr("stroke-linejoin", strokeLinejoin)
                .attr("stroke-opacity", strokeOpacity)
                .attr("d", line(I));
            

            const toottip = svg.append("g")
                .attr("fill", "black")
                .selectAll("circle")
                .data(I)
                .join("circle")
                    .attr("id", (i)=>{
                        let x = X[i]
                        return x+"_tooltip"
                    })
                    .attr("visibility", "visible")
                    .attr("cx",(i)=>{
                        return (xScale(X[i]))
                    })
                    .attr("cy",(i)=>{
                        return yScale(Y[i]);
                    })
                    .attr("r",4)
                    .on("mouseover",mouseovertooltip)
                    .on("mouseout", mouseouttooltip)
            
        
           

            // function pointermoved(event) {
            //         const [xm, ym] = d3.pointer(event);
            //         const i = d3.least(I, i => Math.hypot(xScale(X[i]) - xm, yScale(Y[i]) - ym)); // closest point
            //         path.style("stroke", ([z]) => Z[i] === z ? null : "#ddd").filter(([z]) => Z[i] === z).raise();
            //         dot.attr("transform", `translate(${xScale(X[i])},${yScale(Y[i])})`);
            //         if (T) dot.select("text").text(T[i]);
            //         svg.property("value", O[i]).dispatch("input", {bubbles: true});
            //       }
                
            // function pointerentered() {
            //         path.style("mix-blend-mode", null).style("stroke", "#ddd");
            //         dot.attr("display", null);
            //       }
                
        }


    },[x,y])

    return (
        <div ref={lineGraph}>

        </div>
    )

}

export default LineChart;