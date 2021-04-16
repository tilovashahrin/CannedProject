import React, {useRef, useEffect} from 'react'; 
import * as d3 from 'd3'; 

function ActivityChart(props){
  const {activity} = props; 

  const canvas = useRef(); 

  const width = 900; 
  const height = 400; 
  const margin = 50; 
  const chartWidth = width - 2 * margin;
  const chartHeight = height - 2 * margin;

  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dev']; //easter egg for the gamers 
  const currentMonth = new Date().getMonth(); 
  for (let i = 0; i < 11 - currentMonth; i++){
    const month = months.pop(); 
    months.unshift(month); 
  }
  const colourScale = d3.scaleLinear()
                          .domain([0, Math.max(...activity)])
                          .range(['#96CEDB', '#0576DB']);
  const xScale = d3.scaleBand() // discrete, bucket
                      .domain(months)
                      .range([0, chartWidth])
                      .padding(0.3);

  const yScale = d3.scaleLinear()
                      .domain([0, Math.max(...activity)])
                      .range([chartHeight, 0]);


  useEffect(() => {
    setupGraph(); 
  })

  const setupGraph = ()=> {
    let svg = d3.select(canvas.current)
                .append('svg')
                  .attr('width', width)
                  .attr('height', height); 

    svg.append('text')
          .attr('x', width/2)
          .attr('y', margin)
          .attr('text-anchor', 'middle')
          .text('Rating Activity');

    let g = svg.append('g')
          .attr('transform', `translate(${margin}, ${margin})`);
      
    g.append('g')
        .call(d3.axisLeft(yScale));
      
    g.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale));
    

    let rectangles = g.selectAll('rect')
        .data(activity)
        .enter()
            .append('rect')
                .attr('x', (data, index) => xScale(months[index]))
                .attr('y', (data) => yScale(data))
                .attr('width', xScale.bandwidth())
                .attr('height',data => chartHeight - yScale(data)) 
                .attr('fill', (data) => colourScale(data)); 

  }

  return <div className="d3-canvas" ref={canvas}>
  </div>
}

export default ActivityChart; 