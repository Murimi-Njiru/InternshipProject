/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { LitElement, html, css } from 'lit-element';
import { ExhaustParticle } from './ExhaustParticle';
import { Rocket } from './Rocket';

const exhaust=[];
let hue=0;

class MyView2 extends LitElement {

  static get styles() {
    return css` 
      #view2Container {
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: center;
        background-color: hsl(171, 100%, 41%);
      }
      #gameDashboardContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        width: 100%;
      }
      #gameContainer {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        width: 100%;
      }
      #gameSettings {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        flex: 1;
        height: 500px;
      }
      #gameControls {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        flex: 1;
        height: 500px;
      }
      #gameCanvas {
        display: flex;
        background-color:black;
        margin-bottom: 10px;
      }
    `
  }

  static get properties() {
    return {
      canvas: {type: Object},
      ctx: {type: Object},
      rocket: {type: Object},
      rocketExhaust: {type: Number}

    }
  };

  constructor() {
    super();
    this.canvas={};
    this.ctx={};
    this.rocket={};
    this.rocketExhaust=5
  }

  firstUpdated() {
    this.canvas = this.shadowRoot.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    
    // draw rocket
    this.rocket=new Rocket(this.ctx);
    this.rocket.draw(this.ctx);
    
    window.addEventListener("keydown",e=>{
      this.rocket.move(e.key);
      //create exhaust
      for(let i =0; i<this.rocketExhaust; i++)
      {
        exhaust.push(new ExhaustParticle(this.rocket.exhausterPosition(),hue));
      }
      // stop rocket
      if(e.key === "s")
      {
        this.rocket.default();
        alert("Thanks for playing Rainbow Rocket")
      }
    });
  };

  updated(){
    const handleExhaust = hue=> {
      exhaust.forEach((exhaustParticle,index)=>{
        exhaustParticle.update();
        exhaustParticle.draw(this.ctx);

        // remove exhaustParticle smaller than 0.3 in size
        if(exhaustParticle.size <=0.3)
        {
          exhaust.splice(index,1);
        }       
      });     
    };

    const animate = () => {
      requestAnimationFrame(animate);
      this.ctx.fillStyle= "black";
      this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
      
      // redraw the objects
      this.rocket.draw(this.ctx);
      handleExhaust(hue);
      hue+=5
    }
    animate();
  };
  
  render () {
    return html `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css">
      <div id="view2Container">
        <div id="rocketDashboardContainer">
          <h1  class="title is-3">Rainbow Rocket: Explore the Galaxy with JavaScript</h1>
        </div>
        <div id="gameContainer">
          <div id="gameSettings">
            <h2  class="title is-4">Game Settings: </h2>
            <div class="field">
              <label class="label">Rocket Speed</label>
              <div class="control">
                <input value=${this.rocket.speed} min="10" max="25" type="range" @change="${e => this.rocket.speed=parseInt(e.target.value)}">
              </div>
            </div>
            <div class="field">
              <label class="label">Rocket Exhaust</label>
              <div class="control">
                <input value=${this.rocketExhaust} min="5" max="30" type="range" @change="${e => this.rocketExhaust=parseInt(e.target.value)}">
              </div>
            </div>
          </div>
          <canvas id="gameCanvas" height=500 width=500></canvas>
          <div id="gameControls">
            <h2  class="title is-4">Game Controls: </h2>
            <h3 class="subtitle is-5">1. Use Arrow Keys to navigate rocket.<h3>
            <h3 class="subtitle is-5">2. Press S to stop and park rocket.<h3>
          </div>
        </div>
        
      </div>
    `
  }
}

window.customElements.define('my-element', MyView2);
