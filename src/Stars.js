import React from 'react';
import Star from './star';

const Stars = (props) =>{
    let Buttons=[];
    for(let i=1;i<=9;i++){   
        Buttons.push(<div key={i} className="five wide column" > <Star visible={props.arrayState[i-1]} number={i}/></div>);
    }
    return (<>{Buttons}</>);
}
    
export default Stars;