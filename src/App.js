import React, { cloneElement } from 'react';
import logo from './logo.svg';
import './App.css';
import Buttons from './buttons';
import Stars from './Stars';
import { Divider, Grid, Image, Segment } from 'semantic-ui-react';
import Star from './star';

function getRandomState()
{
  let state=[];
  for(let i=0;i<9;i++){
    state.push(Math.random()>0.5)
    console.log(state[i]);
  }
  return state;
}

class App extends React.Component {
  state={
    starsState:getRandomState(),
    btnState:['','','','','','','','',''],
    
  };
  currentCount = 0 ; 
  getTagetValue(){
    let c=0;
    this.state.starsState.forEach(e => {
      if(e) c++;
    });
    return c;
  }
  btnClick=(event)=>{
    let {btnState} = this.state;
    let id=parseInt(event.target.innerText);
    let target=this.getTagetValue();
    if(btnState[id-1]==='positive'){
      return;
    }
    else if(btnState[id-1]==='primary negative' || btnState[id-1]==='primary'){
      this.currentCount-=id;
      btnState[id-1]='';
      if(this.currentCount === target){
        for(let i=0;i<9;i++){
          if(btnState[i]==='primary negative'){
            btnState[i]='positive';
          }
        }
        this.currentCount=0;
        this.setState({starsState:getRandomState()});
      }
      this.setState({btnState:btnState});
      return;
    }
    this.currentCount+=id;
    console.log(this.currentCount,target);

    if(this.currentCount>target)
      btnState[id-1]='primary negative';
    else if(this.currentCount === target){

      btnState[id-1]='positive';
      for(let i=0;i<9;i++){
        if(btnState[i]==='primary'){
          btnState[i]='positive';
        }
      }
      this.currentCount=0;
      this.setState({starsState:getRandomState()});
    } else
      btnState[id-1]='primary';

     
    this.setState({btnState:btnState});
  };
  restartGame=(event)=>{
    this.currentCount=0;
    this.setState({btnState:['','','','','','','','',''],starsState:getRandomState()});
  }
  render(){ 
    return (<Segment>
      <button className="ui button yellow" style={{float:"right"}} onClick={this.restartGame}>Restart Game</button>
      <Grid columns={2} relaxed='very'>
        <Grid.Column className="1">
          <div className="ui grid containter">
            
              <Buttons arrayState={this.state.btnState} onClick={this.btnClick} />
            
          </div>
        </Grid.Column>



        <Grid.Column className="2">
        <div className="ui grid containter">
          
      <Stars arrayState={this.state.starsState}/>
      </div>
      
        </Grid.Column>
      
        </Grid>
        </Segment>
    );
  }
}

export default App;
