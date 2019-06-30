import { Vector3 } from "@babylonjs/core"

export function createGrid(planeIndex: number, width: number, length: number) {

  const points = [];
  let back = false;
  for(let i = 0; i <= width; i++ ) {
    if (back) {
      points.push(new Vector3(planeIndex, i, length));
      points.push(new Vector3(planeIndex, i, 0));
    } else {
      points.push(new Vector3(planeIndex, i, 0));
      points.push(new Vector3(planeIndex, i, length));
    }
    back = ! back;
  }

  for(let i = 0; i <= length; i++ ) {
    if (back) {
      points.push(new Vector3(planeIndex, width, i));
      points.push(new Vector3(planeIndex, 0, i));
    } else {
      points.push(new Vector3(planeIndex, 0, i));
      points.push(new Vector3(planeIndex, width, i));
    }
    back = ! back;
  }

  return points;
}