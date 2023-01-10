import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import {style, parentBoundary} from './style';
import {Rnd} from "react-rnd";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';




  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
const LineChart = ({data})=>{


    const [cords, setCords] = useState({
        width: 500,
        height: 500,
        x: 0,
        y: 0,
    });

    // const options = {
    //     responsive: true,

    //     plugins: {
    //       legend: {
    //         position: 'top',
    //       },
    //       title: {
    //         display: true,
    //         text: 'Chart.js Line Chart',
    //       },
    //   },
    // }

    

    const labels =[];

    for(let i=0; i< 20; i++){
      labels.push("Test-"+i.toString());
    }


    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks:{
            callback: function(val, index, ticks){
                let labels_show = []

                for(let i=0; i< 20; i++){
                  labels_show.push("Test-"+i.toString());
                }

                let max_label_length = 10;

                let min_label_length =7;



                let skip = 2;

                if(labels.length<max_label_length){

                  return labels[val];

                }else{

                  while(labels.length>min_label_length){
                    let new_length = (labels.length/skip);
                    if (new_length<=max_label_length){
                      break
                    }else{
                      skip = skip+1;
                    }
                  }

                  if((val%skip)==0){
                    return labels[val];
                  }else{
                    return "";
                  }

                }
            }
          },
          stacked: true,
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            callback: function (value, index, ticks) {
              return "$ " + value;
            },
          },
          stacked: true,
        },
      },
      plugins: {
        // tooltip:{
        //   enabled: false,
        //   external:TooltipPlugin,
        // },
        legend: {
          labels: {
            boxWidth: 0,
          },
        },
      },
    }

     const testdata = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: labels.map(() => faker.random.numeric(2)),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: labels.map(() => faker.random.numeric(2)),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

      return (
        <div style={{
          width: 500,
          height: 500
        }}>
          <Line options={options} data={testdata} />
        </div>
          
      )


}


export default LineChart;