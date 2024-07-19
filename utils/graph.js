const GSKNode = {
  id: "10001",
  x: 0,
  y: 0,
  fixed: {
    x: true,
    y: true,
  },
  label: "GSK",
  title: "GSK",
  color: "#fdfd00",
  size: 250,
  shape: "image",
  image: "https://www.mxp-webshop.de/media/image/20/82/24/GSK-Logo.png",
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
