// // utils/d3Utils.ts
// import * as d3 from 'd3';

// // Format data for line graph
// export const formatLineData = (data, dateKey = 'date', valueKey = 'value') => {
//   return data.map(item => ({
//     date: new Date(item[dateKey]),
//     value: parseFloat(item[valueKey])
//   }));
// };

// // Format data for histogram
// export const formatHistogramData = (data, valueKey = 'value') => {
//   return data.map(item => parseFloat(item[valueKey]));
// };

// // Generate scale functions
// export const createScales = (data, width, height, margin) => {
//   const xScale = d3.scaleTime()
//     .domain(d3.extent(data, d => d.date))
//     .range([margin.left, width - margin.right]);

//   const yScale = d3.scaleLinear()
//     .domain([0, d3.max(data, d => d.value)])
//     .nice()
//     .range([height - margin.bottom, margin.top]);

//   return { xScale, yScale };
// };

// // Create line generator
// export const createLineGenerator = (xScale, yScale) => {
//   return d3.line()
//     .x(d => xScale(d.date))
//     .y(d => yScale(d.value))
//     .curve(d3.curveMonotoneX);
// };

// // Create histogram generator
// export const createHistogramGenerator = (data, xScale, bins) => {
//   return d3.histogram()
//     .domain(xScale.domain())
//     .thresholds(xScale.ticks(bins))
//     (data);
// };