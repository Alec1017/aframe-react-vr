import AFRAME, { THREE } from 'aframe';

AFRAME.registerComponent('lowpoly', {
  schema: {
    // Define property, type, and default value
    color: { type: 'string', default: '#FFF' },
    nodes: { type: 'boolean', default: false },
    opacity: { type: 'number', default: 1.0 },
    wireframe: { type: 'boolean', default: false }
  },

  init: function() {
    // Get the reference of the object to which the component is attached
    const obj = this.el.getObject3D('mesh');

    // Get the reference to the scene
    const scene = document.querySelector('a-scene').object3D;

    // Get the position of the object to which the component is attached
    const { x, y, z } = this.el.getAttribute('position');

    // Modify the color of the material
    obj.material = new THREE.MeshPhongMaterial({
      color: this.data.color,
      shading: THREE.FlatShading
    });

    // Wireframe segments initialization
    // Define geometry and material for the wireframe segments
    const objRadius = Number(this.el.getAttribute('radius'));
    const wireGeom = new THREE.OctahedronGeometry(objRadius + .5, 2);
    const wireMaterial = new THREE.MeshPhongMaterial({
      color: '#FFFFFF',
      opacity: this.data.opacity,
      transparent: true,
      wireframe: true
    });

    // create wireframe mesh
    const wireFrame = new THREE.Mesh(wireGeom, wireMaterial);

    // Set position of the mesh to the position of the sphere
    wireFrame.position.set(x, y, z);

    // Add wireframe to the scene
    if (this.data.wireframe) {
      scene.add(wireFrame);
    }

    // Wireframe nodes initialization
    if (this.data.nodes) {
      let spheres = new THREE.Group();
      let vertices = wireFrame.geometry.vertices;

      // Traverse all verticles and attach small spheres
      for (var i in vertices) {
        // Define geometry and material for a wireframe node
        let geometry = new THREE.SphereGeometry(0.045, 16, 16);
        let material = new THREE.MeshBasicMaterial({
          color: '#FFFFFF',
          opacity: this.data.opacity,
          shading: THREE.FlatShading,
          transparent: true
        });

        // Create a wireframe node
        let sphere = new THREE.Mesh(geometry, material);

        // Set position of the spheres
        sphere.position.set(
          vertices[i].x + x,
          vertices[i].y + y,
          vertices[i].z + z
        );

        // Add sphere to the group
        spheres.add(sphere);
      }

      // Add spheres to the scene
      scene.add(spheres);
    }
  },


  update: function() {
    // Get the reference of the object to which the component is attached
    const obj = this.el.getObject3D('mesh');

    // Modify the color of the material during runtime
    obj.material.color = new THREE.Color(this.data.color);
  }
});
