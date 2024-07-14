import * as THREE from 'three';
import {FontLoader, TextGeometry} from "three/addons";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight, true );
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = 0;
renderer.domElement.style.left = 0;
renderer.domElement.style.zIndex = -1;
document.body.appendChild( renderer.domElement );
let cube;
const loader = new FontLoader();

loader.load( '../fonts/Roboto_Black_Regular.json', function ( font ) {

    function addText(text, position, rotation = {x: 0, y: 0, z: 0}){
        const geometry = new TextGeometry( text, {
            font: font,
            size: 10,
            depth: 0.5,
            curveSegments: 4,
        } );
        const material = new THREE.MeshBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.5 } );
        let cube = new THREE.Mesh( geometry, material );
        cube.position.x = position.x;
        cube.position.y = position.y;
        cube.position.z = position.z;
        cube.sourcePosition.x = position.x;
        cube.sourcePosition.y = position.y;
        cube.sourcePosition.z = position.z;
        cube.rotation.x = rotation.x;
        cube.rotation.y = rotation.y;
        cube.rotation.z = rotation.z;
        scene.add( cube );
        return cube;
    }

    cube = addText("C++", {x: -60, y: 20, z: 0}, {x: -0.14, y: 0, z: -0.1});

}, undefined, function ( err ) {
    console.error( err );
}
);

camera.position.z = 50;

function animate() {
    requestAnimationFrame( animate );

    cube.position.y = Math.sin( Date.now() * 0.001 ) * 10 + cube.sourcePosition.y;

    renderer.render( scene, camera );
}
animate();