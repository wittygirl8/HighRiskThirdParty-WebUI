const GSKNode = {
  id: "10001",
  x: 0,
  y: 0,
  fixed: {
    x: true,
    y: true,
  },
  label: "Company",
  title: "Company",
  color: "#fdfd00",
  size: 100,
  shape: "image",
  image:
    "https://dieselpunkcore.com/wp-content/uploads/2014/06/logo-placeholder.png%22",
};

const options = {
  nodes: {
    shape: "dot",
    scaling: {
      min: 10,
      max: 30,
    },
    font: {
      size: 12,
      face: "Tahoma",
      color: "#000",
    },
  },
  edges: {
    width: 0.15,
    color: { inherit: "from" },
    smooth: {
      type: "continuous",
    },
  },
  physics: {
    stabilization: false,
    barnesHut: {
      gravitationalConstant: -80000,
      springConstant: 0.001,
      springLength: 400,
    },
  },
  interaction: {
    tooltipDelay: 100,
    hideEdgesOnDrag: true,
  },
  layout: {
    improvedLayout: false,
  },
};

export { GSKNode, options };
