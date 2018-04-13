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

    // Modify the color of the material
    obj.material = new THREE.MeshPhongMaterial({
      color: this.data.color,
      shading: THREE.FlatShading
    });

    // Wireframe segments initialization
    // Define geometry and material for the wireframe segments
    const wireGeom = new THREE.OctahedronGeometry(2.5, 2);
    const wireMaterial = new THREE.MeshPhongMaterial({
      color: '#FFFFFF',
      opacity: this.data.opacity,
      transparent: true,
      wireframe: true
    });

    // create wireframe mesh
    const wireFrame = new THREE.Mesh(wireGeom, wireMaterial);

    // Set position of the mesh to the position of the sphere
    const { x, y, z} = obj.position;
    wireFrame.position.set(0.0, 4, -10.0);

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
          color: '#FFFFF',
          opacity: this.data.opacity,
          shading: THREE.FlatShading,
          transparent: true
        });

        // Create a wireframe node
        let sphere = new THREE.Mesh(geometry, material);

        // Set position of the spheres
        sphere.position.set(
          vertices[i].x,
          vertices[i].y + 4,
          vertices[i].z + -10.0
        );

        // Add sphere to the group
        spheres.add(sphere);
      }

      // Add spheres to the scene
      scene.add(spheres);
    }
  }
});
