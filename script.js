const svg = d3.select('svg')
const createNode = ({ x, y, fill }) => {
  return svg
    .append('g')
    .append('rect')
    .datum({ x, y })
    .attr('class', 'node')
    .attr('width', 150)
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

          updateLine({ sourceNode, targetNode })
        })
    )
}

const createCircle = (opts) => {
  const { x, y } = opts
  svg
    .append('g')
    .append('circle')
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', 10)
    .attr('fill', 'blue')
  return opts
}

const createLine = (opts) => {
  const { from, to } = opts
  console.log(opts)
  svg
    .append('g')
    .append('line')
    .attr('x1', from.x)
    .attr('y1', from.y)
    .attr('x2', to.x)
    .attr('y2', to.y)
    .attr('fill', 'none')
    .attr('stroke', 'red')
    .attr('stroke-width', 2)
  return opts
}

const updateLine = ({ sourceNode: source, targetNode: target }) => {
  const sourceBox = source.node().getBBox()
  const targetBox = target.node().getBBox()
  const path = d3.path()
  const offset = {
    x: 25,
    y: 25,
  }
  const sourceNew = {
    x: sourceBox.x + sourceBox.width + offset.x,
    y: sourceBox.y + sourceBox.height / 2,
  }
  const targetNew = {
    ...offset,
    x: targetBox.x - offset.x,
    y: targetBox.y + targetBox.height / 2,
  }
  const middle = {
    x: (sourceNew.x + targetNew.x) / 2,
    y: (sourceNew.y + targetNew.y) / 2,
  }

  path.moveTo(sourceNew.x - offset.x, sourceNew.y)
  path.lineTo(sourceNew.x, sourceNew.y)
  path.bezierCurveTo(middle.x, sourceNew.y, middle.x, targetNew.y, targetNew.x, targetNew.y)
  path.lineTo(targetNew.x + offset.x, targetNew.y)

  svg
    .select('.line')
    .attr('class', 'line')
    .attr('d', path.toString())

  return path
}

const createConnection = (opts) => {
  const path = updateLine(opts)

  svg
    .append('g')
    .append('path')
    .attr('class', 'line')
    .attr('d', path.toString())
}

const sourceNode = createNode({ fill: 'yellow', x: 50, y: 100, })
const targetNode = createNode({ fill: 'red', x: 550, y: 250, })
const connect = createConnection({ sourceNode, targetNode, })
