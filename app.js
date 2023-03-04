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

// add event listeners to control the camera position with the mouse
var isMoving = false;
var previousMousePosition = {
  x: 0,
  y: 0,
};
renderer.domElement.addEventListener("mousedown", function (event) {
  isMoving = true;
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
});
renderer.domElement.addEventListener("mousemove", function (event) {
  if (isMoving) {
    var deltaMove = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y,
    };
    camera.position.x += deltaMove.x * 0.01;
    camera.position.y -= deltaMove.y * 0.01;
    camera.lookAt(scene.position);
  }
  previousMousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
});
renderer.domElement.addEventListener("mouseup", function (event) {
  isMoving = false;
});

// add animation loop to continuously update the scene
function animate() {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();

// utility function to convert degrees to radians
function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

// resize the canvas when the window is resized
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
