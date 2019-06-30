import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";
import {StandardMaterial, Color3, MeshBuilder} from "@babylonjs/core";
import {createGrid} from "./util/grid";


export default class App {
  private _canvas: HTMLCanvasElement;
  private _engine: Engine;
  private _scene!: Scene;
  private _camera!: ArcRotateCamera;

  constructor(canvasElement : HTMLCanvasElement) {
    this._canvas = canvasElement;
    this._engine = new Engine(this._canvas, true)

    // Associate a Babylon Engine to it.
    this._engine = new Engine(this._canvas);

    // Create our first scene.
    this._scene = new Scene(this._engine);

    this._camera = new ArcRotateCamera("Camera", 0, 0, 0, Vector3.Zero(), this._scene);
    this._camera.setPosition(new Vector3(10, 0, 15));

    // This attaches the camera to the canvas
    this._camera.attachControl(this._canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight("light1", new Vector3(0, 1, -0.5), this._scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Create a grid material
    const stdMaterial = new StandardMaterial("color1", this._scene);
    stdMaterial.diffuseColor = Color3.Red();

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    const sphere = Mesh.CreateSphere("sphere1", 16, 1, this._scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 4;

    // Affect a material
    sphere.material = stdMaterial;

    //Create lines
    const myPoints =  createGrid(0, 3, 5);
    const myPoints2 = createGrid(1, 3, 5);
    const myPoints3 = createGrid(2, 3, 5);
    MeshBuilder.CreateLines("lines", {points: myPoints}, this._scene);
    MeshBuilder.CreateLines("lines2", {points: myPoints2}, this._scene);
    MeshBuilder.CreateLines("lines3", {points: myPoints3}, this._scene);


    this._engine.runRenderLoop(() => this._scene.render());
    return this
  }
}