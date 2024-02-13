import "./widget.css";

import { Niivue, NVImage, SLICE_TYPE } from "@niivue/niivue";

async function render({ model, el }) {
  const options = { dragAndDropEnabled: false };
  let canvas = document.createElement("canvas");
  let container = document.createElement("div");
  container.style.height = "300px";
  container.appendChild(canvas);
  el.appendChild(container);
  let nv = new Niivue(options);
  nv.attachToCanvas(canvas);

  let volume_file = model.get("volume_file");
  let image = new NVImage(volume_file.data.buffer, volume_file.name);
  nv.addVolume(image);

  model.on("change:opacity", () => {
    let value = model.get("opacity");
    nv.setOpacity(0, value);
  });

  model.on("change:colormap", () => {
    let value = model.get("colormap");
    nv.setColorMap(nv.volumes[0].id, value);
  });

  model.on("change:slice_type", () => {
    let value = model.get("slice_type");
    console.log(value);
    console.log("slicetype changed!");
    if (value == "SLICE_TYPE.AXIAL") {
      nv.setSliceType(SLICE_TYPE.AXIAL);
    }
    if (value == "SLICE_TYPE.CORONAL") {
      nv.setSliceType(SLICE_TYPE.CORONAL);
    }
    if (value == "SLICE_TYPE.SAGITTAL") {
      nv.setSliceType(SLICE_TYPE.SAGITTAL);
    }
    if (value == "SLICE_TYPE.MULTIPLANAR") {
      nv.setSliceType(SLICE_TYPE.MULTIPLANAR);
    }
    if (value == "SLICE_TYPE.RENDER") {
      nv.setSliceType(SLICE_TYPE.RENDER);
    }
  });
}

export default { render };
