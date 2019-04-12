import 'aframe';
import 'aframe-environment-component';
import 'aframe-event-set-component';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import './components/aframe-lowpoly';


class VRScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorIndex: 0,
      colors: ['#D92B6A', '#9564F2', '#FFCF59'],
      position: {x: 2, y: 4, z: -5} 
    };
  }

  changeColor() {
    this.setState({
      colorIndex: (this.state.colorIndex + 1) % this.state.colors.length
    });
  }

  render() {
    return (
      <Scene
        environment={{
          preset: 'starry',
          seed: 2,
          lightPosition: {x: 10, y: 0.03, z: 0.5},
          fog: 0.8,
          ground: 'canyon',
          groundYScale: 6.31,
          groundTexture: 'walkernoise',
          grid: 'none'
        }}
      >
    
        // Lowpoly entity
        <Entity primitive="a-octahedron"
          class="clickable"
          lowpoly={{
            color: this.state.colors[this.state.colorIndex],
            nodes: true,
            opacity: 0.15,
            wireframe: true
          }}
          detail={2}
          radius={2}
          position={this.state.position}
          events={{click: this.changeColor.bind(this)}}
          animation__rotate={{
            property: 'rotation',
            dur: 60000,
            easing: 'linear',
            loop: true,
            to: '0 -360 0'
          }}
          animation__oscillate={{
            property: 'position',
            dur: 2000,
            dir: 'alternate',
            easing: 'linear',
            loop: true,
            from: this.state.position,
            to: {
              x: this.state.position.x,
              y: this.state.position.y + 0.2,
              z: this.state.position.z
            }
          }}
        />

        // Light
        <Entity primitive="a-light"
          type="directional"
          color="#FFF"
          intensity="1"
          position={{x: 2.5, y: 0.0, z: 0}}
        />

        // Camera
        <Entity primitive="a-camera">
          <Entity primitive="a-cursor"
            material={{color: 'white', shader: 'flat', opacity: 0.75}}
            geometry={{radiusInner: 0.005, radiusOuter: 0.007}}
            animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1.4 1.4 1.4', dur: 150}}
            event-set__mouseenter={{
              scale: { x: 1.4, y: 1.4, z: 1.4 }
            }}
            event-set__mouseleave={{
              scale: { x: 1, y: 1, z: 1 }
            }}
            raycaster="objects: .clickable"
          />
        </Entity>

        // Controls
        <Entity 
          oculus-touch-controls="hand: right"
  
        />
      </Scene>
    );
  }
}

ReactDOM.render(
  <VRScene />,
  document.getElementById('root'),
);
