"use strict";

function findRelativeLocation(path, point) {
  function pointDistance(p1, p2) {
    return Math.sqrt( (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 );
  }

  function search(from, to, point, error) {
    // Tried doing a binary search but circular paths among other thing were an
    // issue, this way we just take a bunch of samples and then recurse closer
    // to the solution.
    let mid  = (from + to) / 2;
    if (to - from < error) { return mid; }

    let samples = [];
    let sample_size = 50;
    let step_size = (to - from)/(sample_size - 1);
    let min_i;
    for (let i = 0; i < sample_size; ++i) {
      let sample_length   = from + (step_size * i);
      let sample_point    = path.getPointAtLength(sample_length);
      let sample_distance = pointDistance(sample_point, point);
      samples.push({
        length:   sample_length,
        point:    sample_point,
        distance: sample_distance
      });

      if (min_i === undefined || sample_distance < samples[min_i].distance ) {
        min_i = i;
      }
    }
    return search(
      samples[min_i == 0 ? 0 : min_i - 1].length,
      samples[min_i == sample_size - 1 ? min_i : min_i + 1].length,
      point, error); 
  }

  const length = path.getTotalLength();
  const start  = path.getPointAtLength(0);
  const end    = path.getPointAtLength(length);

  return search(0, length, {x: point[0], y: point[1]}, .01);
}

function setup(container) {
  let svg = container.select('svg');
  let circle = svg
    .append('circle')
      .attr('class', 'mouse')
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', '1')
      .attr('cx', -100)
      .attr('cy', -100)
      .attr('r', 5);

  function showInfo (d, i, nodes) {
      let node = nodes[i]; // Not sure why it didn't do this for me
      let point = d3.mouse(svg.node());
      let loc = findRelativeLocation(node, point);
      let locPoint = node.getPointAtLength(loc);
      let msg = `${ $(node).attr('id') } : ${ loc } (${locPoint.x}, ${locPoint.y})`;
      console.log(msg);
      $('#info').text(msg);

      svg.select('circle.mouse')
        .attr('cx', locPoint.x)
        .attr('cy', locPoint.y);
  }

  let paths = d3.selectAll('#walls-layer path')
    .on('mouseover', showInfo)
    .on('mousemove', showInfo)
}

$(document).ready(async () => {
  let container = d3.select("#svg-container");
  d3.xml("img/cliffsmap.svg").then(data => {
    container.node().append(data.documentElement);
    setup(container);
  });
});
