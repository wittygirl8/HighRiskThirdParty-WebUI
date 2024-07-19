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
      gravitationalConstant: -4000,
      springConstant: 0.001,
      springLength: 200,
    },
  },
  interaction: {
    tooltipDelay: 200,
    hideEdgesOnDrag: true,
  },
};

export { options };
