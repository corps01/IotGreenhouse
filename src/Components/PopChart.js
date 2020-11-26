import React, {Component } from 'react';
import Chart from 'react-apexcharts';

class PopChart extends Component {
  


  constructor(props){
  super(props);
 

  this.state = {
    
    series: [{
        name: "Humedad",
        data: props.dataH
      },
      {
        name: "Temperatura",
        data: props.dataT
      },
      {
        name: 'Indice de Calor',
        data: props.dataI
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [5, 7, 5],
        curve: 'straight',
        dashArray: [0, 8, 5]
      },
      title: {
        text: 'Sensores',
        align: 'left'
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        categories: [],
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function (val) {
                return val + " (mins)"
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val + " per session"
              }
            }
          },
          {
            title: {
              formatter: function (val) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: '#f1f1f1',
      }
    },
  
  
  };



}

  sayHello() {
    this.setState(this.state);
  }

  render(){
    return (<>
    <Chart className = "container"
    options={this.state.options}
    series={this.state.series}
    type="line"
    height="450"
    width="100%"    
    ></Chart>

<button onClick={this.sayHello}>
      Click me!
    </button>




    </>
    )
  }
}

export default PopChart;
