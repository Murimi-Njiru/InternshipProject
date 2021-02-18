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

class MyView1 extends LitElement {
  
  static get styles() {
    return css`
      #my-view1Container{
        display: flex;
        flex: 1;
        justify-content: center
      }
      form {
        display: flex;
        flex-direction: column;
        padding: 10px;
        align-items: center
      }
    `
  }

  static get properties() {
    return { 
      userName: {type: String},
      email: {type: String},
      phoneNumber: {type: String},
    };
  }

  constructor() {
    super();
    this.userName="";
    this.email="";
    this.phoneNumber="";
  };

  

  render () {
    return html `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css">
      <div id="my-view1Container">
        <form >
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input is-primary" value=${this.userName} type="text" placeholder="example: Peter Karanja" @change="${e=>this.userName=e.target.value}" required>
              </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input is-primary" value=${this.email} type="email" placeholder="example: abc@gmail.com" @change="${e => this.email=e.target.value}" required>
            </div>
          </div>
          <div class="field">
            <label class="label">Phone Number</label>
            <div class="control">
              <input class="input is-primary" value=${this.phoneNumber} type="tel" placeholder="example: 0712345678" @change="${e => this.phoneNumber=e.target.value}" required>
            </div>
          </div>
          <div class="control">
            <button class="button is-link" @click="${()=>this._onSubmitBtnClickHandler()}">Submit</button>
          </div>
        </form>
      </div>
    `
  }
  

  // false is invalid
  _userNameValidation () {
    return this.userName === "" ? false : true;
  };

  _emailValidation () {
    return this.email.indexOf("@") < 0 ? false : true;
  };

  _phoneNumberValidation () {
    return this.phoneNumber === "" ? false : true;
  }

  _onSubmitBtnClickHandler (){
    // validate form first
    if(this._userNameValidation() && this._emailValidation() && this._phoneNumberValidation())
    {
      console.log("Name: "+this.userName+"\nEmail: "+this.email+"\nPhone Number: "+this.phoneNumber);
      alert("Name: "+this.userName+"\nEmail: "+this.email+"\nPhone Number: "+this.phoneNumber);
    }
    else 
    {
      alert("Make sure to fill all fields.");
    }
  }

}

window.customElements.define('my-view1', MyView1);
