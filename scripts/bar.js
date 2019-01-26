var sampleJson = [
    { 'name':'Steven Wilson', 'points': 5000 },
    { 'name':'Richard Barbieri', 'points': 3000 },
    { 'name':'Colin Edwin', 'points': 4000 },
    { 'name':'Gavin Harrison', 'points': 2000 },
    { 'name':'John Wesley', 'points': 1000 },    
];

const iWidth = 960, iHeight = 500;
const margin = {top : 20, right: 40 , bottom :20 ,left:100};
const innerWidth = iWidth - margin.left - margin.right;
const innerHeight = iHeight - margin.top - margin.bottom;

var canvas = d3.select('svg')
               .attr('width',iWidth)
               .attr('height',iHeight);

var parentGroup = canvas.append('g');



const xScale = d3.scaleLinear()
                 .domain([0,d3.max(sampleJson, d=> d.points)])
                 .range([0,innerWidth]);

const yScale = d3.scaleBand()
                 .domain(sampleJson.map(d=>{
                     return d.name;
                 }))
                 .range([0,innerHeight])
                 .paddingInner(0.2)
                 .paddingOuter(0.1);

parentGroup.attr('transform',`translate(${margin.left},${margin.top})`);


var groups = parentGroup.selectAll('g')
      .data(sampleJson)
      .enter()
        .append('g');

groups.append('rect')
.attr('width',d=> xScale(d.points))
        .attr('height',yScale.bandwidth())
        .attr('y', d => yScale(d.name))
        .attr('fill', d=> "#"+((1<<24)*Math.random()|0).toString(16));

parentGroup.append('g').call(d3.axisLeft(yScale).tickSize(0));
parentGroup.append('g').call(d3.axisBottom(xScale).tickSize(0))
                       .attr('transform',`translate(0,${innerHeight})`);
            
