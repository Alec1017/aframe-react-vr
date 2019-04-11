import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React, {useState} from 'react';
import ReactDOM from 'react-dom';


function VRScene() {
  const [color, setColor] = useState('red');

  const changeColors = () => {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  };

  useEffect(() => {
    changeColors();
    console.log(color);
  }, [color]);

  return (
    <Scene>
      <Entity geometry={{primitive: 'box'}} material={{color: 'red'}} position={{x: 0, y: 0, z: -5}}/>
      <Entity light={{type: 'point'}}/>
      <Entity gltf-model={{src: 'virtualcity.gltf'}}/>
      <Entity text={{value: 'Hello, WebVR!'}}/>
    </Scene>
  );
}

ReactDOM.render(
  <VRScene />,
  document.getElementById('root'),
);
