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

const Dictionary = {'34': 'thirty-four', '90': 'ninety',
'91': 'ninety-one','21': 'twenty-one',
'61': 'sixty-one', '9': 'nine',
'2': 'two', '6': 'six', '3': 'three',
'8': 'eight', '80': 'eighty', '81': 'eighty-one',
'Ninety-Nine': '99', 'nine-hundred': '900'}

class MyView3 extends LitElement {

  static get styles() {
    return css`
      #my-view3Container{
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: center
      }
      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      li {
        width: 70%;
        margin: 20px 20px 20px 20px
      }
    `
  }

  static get properties () {
    return {
      toDoData: {type: Array}
    }
  };

  async getToDoData () {
    try
      {
        let response=await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5 ",{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        return await response.json()
      }
    catch (error)
    {
      console.error(error);
    }
  };

  sortDictionary()
  {
    const sortNumericKeys = (keys) =>{
      //convert keys to numbers first then turn them back to strings
      return keys.map(key=>parseInt(key)).sort((a,b)=>a-b).map(key=>key.toString());
    };

    const sortAlphaNumericKeys = (keys) =>{
      return keys.sort();
    };

    const sortKeys = () => {
      let numericKeys=[];
      let alphaNumericKeys=[];
      Object.keys(Dictionary).forEach(key => {
        isNaN(parseInt(key)) ? alphaNumericKeys.push(key) : numericKeys.push(key);
      });
      return sortNumericKeys(numericKeys).concat(sortAlphaNumericKeys(alphaNumericKeys));
    }

    const createSortedDictionary = () => {
      let newDictionary={};
      sortKeys().forEach(key=>{
        Object.assign(newDictionary,{[key]: Dictionary[key]});
      });
      return newDictionary;
    };

    return createSortedDictionary();
  };
  
  constructor () {
    super();
    this.toDoData=[];
    
    console.log(this.sortDictionary());
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.getToDoData().then(response=>{
      console.log(response);
      this.toDoData=response;
    }).catch(error=>{
      console.error(error);
    })
  };

  toDoCard (toDo) {
    return html `
      <div class="card">
        <header class="card-header">
          <h1 class="title is-4">
            ${"Title: "+toDo.title}
          </h1>
        </header>
        <div class="card-content">
          <p class="subtitle is-6">${"User Id: "+toDo.userId}</p>
          <p class="subtitle is-6">${"Id: "+toDo.id}</p>
          <p class="subtitle is-6">${"Completed: "+toDo.completed}</p>
        <div>
      </div>
    `
  }

  render () {
    return html `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css">
      <div id="my-view3Container">
        <h1 class="title">To Do</h1>
        <ul>
          ${
          // show progress before data is downloaded
            this.toDoData.length>0 ? (
              this.toDoData.map(item=>html`<li>${this.toDoCard(item)}</li>`)
          ) : (
            html `<progress class="progress is-large is-info" max="100">60%</progress>`
          )
        }        
        </ul>
        <p class="subtitle is-5">Sorted Dictionary: ${JSON.stringify(this.sortDictionary())}</p>
      </div>
    `
  }
}


window.customElements.define('my-view3', MyView3);
