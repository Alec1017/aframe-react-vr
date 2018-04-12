import 'aframe';

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

    // Modify the color o fthe material
    obj.material = new THREE.MeshPhongMaterial({
      color: this.data.color,
      shading: THREE.FlatShading
    });

    // Define geometry for the outer wireframe
    const frameGeom = new THREE.OctahedronGeometry(2.5, 2);

    // Define material for frameGeom
    const frameMaterial = new THREE.MeshPhongMaterial({
      color: '#FFFFF',
      opacity: this.data.opacity,
      transparent: true,
      wireframe: true
    });

    // Final mesh is a combo of the geometry and the material
    const icosFrame = new THREE.Mesh(frameGeom, frameMaterial);

    // Set position of the mesh to the position of the sphere
    const { x, y, z} = obj.position;
    icosFrame.position.set(0.0, 4, -10.0);

    // Node attribute
    if (this.data.nodes) {
      let spheres = new THREE.Group();
      let vertices = icosFrame.geometry.vertices;

      // Traverse all verticles and attach small spheres
      for (var i in vertices) {
        // Create a sphere
        let geometry = new THREE.SphereGeometry(0.045, 16, 16);
        let material = new THREE.MeshBasicMaterial({
          color: '#FFFFF',
          opacity: this.data.opacity,
          shading: THREE.FlatShading,
          transparent: true
        });

        let sphere = new THREE.Mesh(geometry, material);
        // Reposition properly
        shpere.position.set(
          vertices[i].x,
          vertices[i].y + 4,
          vertices[i].z + -10.0
        );

        spheres.add(sphere);
      }

      scene.add(spheres);
    }
  }
});
