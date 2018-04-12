import 'aframe';
import 'aframe-animation-component';
import 'aframe-environment-component';
import 'aframe-particle-system-component';
import lowpoly from './components/aframe-lowpoly';
import 'babel-polyfill';
import { Entity, Scene } from 'aframe-react';
import React, { Component } from 'react';


// Color palette
const COLORS =['#D29B6A', '#9564F2', '#FFCF59']

class App extends Component {
  constructor() {
    super();
    this.state = {
      colorIndex: 0,
      spherePosition: { x: 0.0, y: 4, z: -10 }
    };
  }

  render() {
    return (
      <Scene environment={{
        preset: 'starry',
        seed: 2,
        lightPosition: { x: 10, y: 0.03, z: 0.5 },
        fog: 0.8,
        ground: 'canyon',
        groundYScale: 6.31,
        groundTexture: 'walkernoise',
        groundcolor: '#8a7f8a',
        grid: 'none'
      }}>



        // Low-poly entity
        <Entity
          lowpoly={{
            color: '#D92B6A',
            nodes: true,
            opacity: 0.15,
            wireframe: true
          }}
          primitive="a-octahedron"
          detail={2}
          radius={2}
          position={{ x: 0.0, y: 4, z: -10.0 }}
          color="FAFAFA1"
        />

        // Lighting
        <Entity
          primitive="a-light"
          type="directional"
          color="#FFF"
          intensity={1}
          position={{ x: 2.5, y: 0.0, z: 0 }}
        />

        // Camera
        <Entity primitive="a-camera" look-controls>
          <Entity
            primitive="a-cursor"
            cursor={{ fuse: false }}
            material={{ color: 'white', shader: 'flat', opacity: 0.75 }}
            geometry={{ radiusInner: 0.005, radiusOuter: 0.007 }}
          />
        </Entity>
      </Scene>
    );
  }
}

export default App;
