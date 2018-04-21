const svg = d3.select('svg')
const createNode = ({ x, y, fill }) => {
  return svg
    .append('g')
    .append('rect')
    .datum({ x, y })
    .attr('class', 'node')
    .attr('width', 200)
    .attr('height', 50)
    .attr('fill', fill)
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y)
    .call(
      d3
        .drag()
        .on('drag', function (d) {
          d.x += d3.event.dx
          d.y += d3.event.dy

          d3
            .select(this)
            .attr('x', d.x)
            .attr('y', d.y)
        })
    )
}

const createConnection = ({ sourceNode: source, targetNode: target }) => {
  console.log(source, target)
}

const sourceNode = createNode({ fill: 'yellow', x: 200, y: 100, })
const targetNode = createNode({ fill: 'red', x: 200, y: 400, })
const connect = createConnection({ sourceNode, targetNode, })
