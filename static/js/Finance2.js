'use strict';

const o = React.createElement;

class Reloadbutton extends React.Component {
  render(){
    return(
      <button onclick={()=>{window.location.reload(false)}}>RELOAD!</button>
    )
  }
}
 
const domContainer = document.querySelector('#container2');
ReactDOM.render(<Reloadbutton/>, domContainer);