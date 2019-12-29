import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import Buttons from './buttons';
import Stars from './Stars';
import Counter from './Counter';

function availableSolutions(btnStates)
{
  let comb=[
    [],//1
    [],//2
    [[1,2]],//3
    [[1,3]],//4
    [[1,4],[2,3]],//5
    [[1,5],[1,2,3],[2,4]],//6
    [[1,6],[1,2,4],[2,5],[3,4]],//7
    [[1,7],[1,2,5],[1,3,4],[2,6],[3,5]],//8
    [[1,8],[1,2,6],[2,3,4],[3,6],[4,5]]//9
  ];
  let avSol=[];
  btnStates.forEach((el,idx)=>{
    if(el!=='positive')
      avSol.push(idx+1);
  });
  if(avSol.length===9)
    return avSol;
  let combSol=[];
  for(let i=0;i<9;i++){
    if(!avSol.includes(i+1) && !combSol.includes(i+1)) {
      let done=false;
        console.log("I: ",i);
      for(let j=0;j<comb[i].length && !done;j++){
        let exist=true;
        for(let k=0;k<comb[i][j].length && exist;k++){
          if(!avSol.includes(comb[i][j][k]))
            exist=false;
        }
        if(exist){
          combSol.push(i+1);
          done = true;
        }
      }
    }
  }
  return [...avSol,...combSol];
}

function getRandomState(btnStates=['','','','','','','','',''])
{  
  let sol=availableSolutions(btnStates);
  let state=[false,false,false,false,false,false,false,false,false];
  let target=sol[Math.round((sol.length -1)*Math.random())];
  
  for(let i=0;i<target;i++){
    let idx;
    do{
      idx=Math.round(Math.random()*8);
    }while(state[idx]);
    state[idx]=true;
  }
  return state;
}

class App extends React.Component {
  constructor(){
    super();
    this.TimerHandler = setInterval(this.Timer, 1000);
  }
  Timer=()=>{
    if(this.state.GameOver===false && this.state.Winner===false) {
      if(this.state.TimeLeft>0 && this.state.GameOver===false){
        this.setState({TimeLeft:this.state.TimeLeft-1});
        if(this.state.TimeLeft===0)
        {
          this.setState({GameOver:true});
          alert('GameOver');
          this.restartGame();
        }
      } 
    }
  }
  state={
    starsState:getRandomState(),
    btnState:['','','','','','','','',''],
    TimeLeft: 10,
    GameOver:false,
    Winner:false
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
        this.setState({starsState:getRandomState(btnState)});
        if(this.getTagetValue()===0)
        {
          alert("Well done!");
          this.restartGame();
        }
      } else if(this.currentCount < target) {
        for(let i=0;i<9;i++){
          if(btnState[i]==='primary negative'){
            btnState[i]='primary';
          }
        }
        
      }
      this.setState({btnState:btnState});
      return;
    }
    this.currentCount+=id;

    if(this.currentCount>target) {
      btnState[id-1]='primary negative';
      for(let i=0;i<9;i++){
        if(btnState[i]==='primary'){
          btnState[i]='primary negative';
        }
      }
    }else if(this.currentCount === target){

      btnState[id-1]='positive';
      let done=true;
      for(let i=0;i<9;i++){
        if(btnState[i]==='primary'){
          btnState[i]='positive';
        }else if(btnState[i]!=='positive') {
          done = false;
        }
      }
      this.currentCount=0;
      this.setState({starsState:getRandomState(btnState)});

      if(done)
      {
        this.setState({Winner:true});
        alert("Well done!");
        this.restartGame();
        return;
      }
    } else
      btnState[id-1]='primary';
    this.setState({btnState:btnState});
  };
  restartGame=(event)=>{
    this.currentCount=0;
    this.setState({
        btnState:['','','','','','','','',''],
        starsState:getRandomState(),
        Winner:false,
        GameOver:false,
        TimeLeft:10
      });
  }
  render(){ 
    return (<>
      <Segment>
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
    <Counter time={this.state.TimeLeft}/>
    </>
    );
  }
}

export default App;
