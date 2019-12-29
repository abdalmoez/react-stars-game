import React from 'react';

const Button = (props) =>{
    return (
      
<button onClick={props.onClick} class={"ui button "+props.state}>{props.number}</button>
  
    
    );
  }
  
  export default Button;