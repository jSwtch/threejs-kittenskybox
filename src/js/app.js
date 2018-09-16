const THREE = require("three");
const OrbitControls = require("three-orbitcontrols");

// THREE
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", function() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

//Controller
var controls = new THREE.OrbitControls(camera, renderer.domElement);
//change camera position
camera.position.z = 3;

//Create geometry

//Cube group
var boxHolder = new THREE.Group();
scene.add(boxHolder);

//Kitten box
var geometry = new THREE.BoxGeometry(0.55, 0.55, 0.55);
//create the GLOBAL material, color, or image, (TEXTURE)
var material1 = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true
});
//Array of mesh materials
var cubeMaterials = [
  new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("img/kit1.jpg"),
    side: THREE.DoubleSide
  }),
  new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("img/kit2.jpg"),
    side: THREE.DoubleSide
  }),
  new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("img/kit3.jpg"),
    side: THREE.DoubleSide
  }),
  new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("img/kit1.jpg"),
    side: THREE.DoubleSide
  }),
  new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("img/kit2.jpg"),
    side: THREE.DoubleSide
  }),
  new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("img/kit3.jpg"),
    side: THREE.DoubleSide
  })
];

//create the GLOBAL material, color, or image, (TEXTURE)
var material2 = new THREE.MeshFaceMaterial(cubeMaterials);

//creates the full instance of geomtery with texture
// var cube = new THREE.Mesh(geometry, material2);
//add the instance to the scene
// scene.add(cube);

let kittenBoxes = [];
for (var k = 0; k < 10; k++) {
  for (var j = 0; j < 10; j++) {
    for (var i = 0; i < 10; i++) {
      var object = new THREE.Mesh(geometry, material2);
      object.position.x = i;
      object.position.y = j;
      object.position.z = k;
      kittenBoxes.push(object);
      boxHolder.add(object);
    }
  }
}

// SKYBOX
var skyboxGeo = new THREE.BoxGeometry(50, 50, 50);
// FRONT BACK UP DOWN RIGHT LEFT
var skyboxTex = [
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("img/cottoncandy_ft.png"),
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("img/cottoncandy_bk.png"),
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("img/cottoncandy_up.png"),
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("img/cottoncandy_dn.png"),
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("img/cottoncandy_rt.png"),
    side: THREE.DoubleSide
  }),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("img/cottoncandy_lf.png"),
    side: THREE.DoubleSide
  })
];
var skyboxMat = new THREE.MeshFaceMaterial(skyboxTex);
var skyboxObj = new THREE.Mesh(skyboxGeo, skyboxMat);
skyboxObj.position.x = 5;
skyboxObj.position.y = 5;
skyboxObj.position.z = 5;
scene.add(skyboxObj);

//LIGHTS
// Create light
var ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
//Add light
scene.add(ambientLight);

//Point light1
var light1 = new THREE.PointLight(0xff0000, 2, 200);
scene.add(light1);
var lightSphere1g = new THREE.SphereGeometry(1, 8, 8);
var lightSphere1m = new THREE.MeshBasicMaterial({
  color: 0xff0000
});
var lightSphere1 = new THREE.Mesh(lightSphere1g, lightSphere1m);
scene.add(lightSphere1);

//Point light2
var light2 = new THREE.PointLight(0x00ff00, 2, 200);
scene.add(light2);
var lightSphere2g = new THREE.SphereGeometry(1, 8, 8);
var lightSphere2m = new THREE.MeshBasicMaterial({
  color: 0x00ff00
});
var lightSphere2 = new THREE.Mesh(lightSphere2g, lightSphere2m);
scene.add(lightSphere2);

//Point light2
var light3 = new THREE.PointLight(0x0000ff, 2, 200);
scene.add(light3);
var lightSphere3g = new THREE.SphereGeometry(1, 8, 8);
var lightSphere3m = new THREE.MeshBasicMaterial({
  color: 0x0000ff
});
var lightSphere3 = new THREE.Mesh(lightSphere3g, lightSphere3m);
scene.add(lightSphere3);

//game logic
var update = function() {
  for (var u = 0; u < kittenBoxes.length; u++) {
    kittenBoxes[u].rotation.x += 0.011;
    kittenBoxes[u].rotation.y += 0.012;
    kittenBoxes[u].rotation.z -= 0.015;
  }

  var time = Date.now() * 0.0025;
  boxHolder.rotation.x -= 0.011;
  boxHolder.rotation.y += 0.012;
  boxHolder.rotation.z += 0.015;

  light1.position.y = Math.sin(time * 0.7) * 12;
  lightSphere1.position.y = Math.sin(time * 0.7) * 12;
  light1.position.x = Math.cos(time * 0.7) * 12;
  lightSphere1.position.x = Math.cos(time * 0.7) * 12;

  light2.position.z = Math.sin(time * 0.7) * 9;
  lightSphere2.position.z = Math.sin(time * 0.7) * 9;
  light2.position.x = Math.cos(time * 0.7) * 9;
  lightSphere2.position.x = Math.cos(time * 0.7) * 9;

  light3.position.z = Math.cos(time * 0.7) * 13;
  lightSphere3.position.z = Math.cos(time * 0.7) * 13;
  light3.position.y = Math.cos(time * 0.7) * 13;
  lightSphere3.position.y = Math.cos(time * 0.7) * 13;
};

//draw scene
var render = function() {
  renderer.render(scene, camera);
};

//game construct - how game flows (update, check, process, render, repeat)
var GameLoop = function() {
  requestAnimationFrame(GameLoop);

  //check for updates
  update();
  //render the scene through the camera
  render();
};

GameLoop();
