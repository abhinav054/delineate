import { useEffect, useRef, useCallback } from "react";
import * as d3 from 'd3'



const PieChart = (
    {
        x,
        y,
        width,
        height,
        xdataType,
        yDataType,
        yFormat,
        yLabel,
        id
    
    }
    
)=>{

    const pieChart = useCallback((node)=>{
        if(x.length!=0&&y.length!=0){
            let X = [...x]
            let Y = [...y]
            const I = d3.range(X.length).filter(i => !isNaN(Y[i]));

            let innerRadius = Math.min(width, height) / 3; // inner radius of pie, in pixels (non-zero for donut)
            let outerRadius = Math.min(width, height) / 2; // outer radius of pie, in pixels
            let labelRadius = (innerRadius + outerRadius) / 2; // center radius of labels
            let format = ","; // a format specifier for values
            let stroke = innerRadius > 0 ? "none" : "white"; // stroke separating widths
            let strokeWidth = 1; // width of stroke separating wedges
            let strokeLinejoin = "round"; // line join of stroke separating wedges
            let padAngle = stroke === "none" ? 1 / outerRadius : 0;

            let names = X;
            names = new d3.InternSet(names);


            let colors = d3.schemeSpectral[names.size];
            colors = d3.quantize(t => d3.interpolateSpectral(t*0.8+0.1),names.size)

            // Construct scales.
            const color = d3.scaleOrdinal(names, colors);

            // Compute titles.
            let title;
            if (title === undefined) {
                const formatValue = d3.format(format);
                title = i => `${X[i]}\n${formatValue(Y[i])}`;
            } else {

            }

            // Construct arcs.
            const arcs = d3.pie().padAngle(padAngle).sort(null).value(i => Y[i])(I);
            const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
            const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
    

            
            const parentNode = d3.select(node);
            let svgtest = parentNode.select('svg').node();
            let svg;
            if(svgtest){
                svg = parentNode.select('svg');
                svg.attr("width",width)
                    .attr("height", height)
                    .attr("viewBox",[-width/2, -height/2, width, height])
                console.log("selected node");
                d3.select("#"+id).remove();
                d3.select("#"+id+"-axis").remove();

            }else{
                svg = parentNode.append('svg')
                .attr("width", width)
                .attr("height", height)
                .attr("viewBox", [-width / 2, -height / 2, width, height])
                .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
                console.log("appended node");
                
                
            }

            svg.append("g")
                .attr("id",id)
                .attr("stroke", stroke)
                .attr("stroke-width", strokeWidth)
                .attr("stroke-linejoin", strokeLinejoin)
                .selectAll("path")
                .data(arcs)
                .join("path")
                .attr("fill", d => color(X[d.data]))
                .attr("d", arc)
                .append("title")
                .text(d => title(d.data));

            svg.append("g")
                .attr("id", id+"-axis")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("text-anchor", "middle")
                .selectAll("text")
                .data(arcs)
                .join("text")
                .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
                .selectAll("tspan")
                .data(d => {
                const lines = `${title(d.data)}`.split(/\n/);
                return (d.endAngle - d.startAngle) > 0.25 ? lines : lines.slice(0, 1);
                })
                .join("tspan")
                .attr("x", 0)
                .attr("y", (_, i) => `${i * 1.1}em`)
                .attr("font-weight", (_, i) => i ? null : "bold")
                .text(d => d);
            

        }

    },[x,y])
    
    // console.log(pieChart.current);

    return (
    <div ref={pieChart}>

    </div>
    )
}

export default PieChart;