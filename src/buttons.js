import React from 'react';
import Button from './button';

const Buttons = (props) =>{
    let Buttons=[];
    for(let i=1;i<=9;i++){
        Buttons.push(<div key={i} className="five wide column" > <Button state={props.arrayState[i-1]} onClick={props.onClick} number={i}/></div>);
    }
    return (<> {Buttons}  </>);
}
export default Buttons;