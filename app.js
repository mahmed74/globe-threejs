// set up the scene
var scene = new THREE.Scene();

// create a camera
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// create a renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create a sphere for the globe
var geometry = new THREE.SphereGeometry(2, 32, 32);
var material = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg"
  ),
});
var globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// add event listeners to control the rotation of the scene with the mouse
var isDragging = false;
var previousMousePosition = {
  x: 0,
  y: 0,
};
renderer.domElement.addEventListener("mousedown", function (event) {
  isDragging = true;
});
renderer.domElement.addEventListener("mousemove", function (event) {
  var deltaMove = {
    x: event.offsetX - previousMousePosition.x,
    y: event.offsetY - previousMousePosition.y,
  };
  if (isDragging) {
    var deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        toRadians(deltaMove.y * 1),
        toRadians(deltaMove.x * 1),
        0,
        "XYZ"
      )
    );
    scene.quaternion.multiplyQuaternions(
      deltaRotationQuaternion,
      scene.quaternion
    );
  }
  previousMousePosition = {
    x: event.offsetX,
    y: event.offsetY,
  };
});
renderer.domElement.addEventListener("mouseup", function (event) {
  isDragging = false;
});

// render the scene
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();

// helper function to convert degrees to radians
function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}