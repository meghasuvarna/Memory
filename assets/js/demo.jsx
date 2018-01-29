import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(root) {
  ReactDOM.render(<Layout/>, root);
}

const height = 4;
const width = 4;

function createArray(x,y)
 {
 return Array.apply(null, Array(x)).map(function(e) {
 return Array(y);});
 
 } 
 


const modes = {a:"first click", b:"second click", c:"match", d:"not matched"};
class Card extends React.Component {


  render() {
    return <div className="backGround"><div className="block"><span>{this.props.card.flipped?this.props.card.cardValue:" "}</span></div></div>;
  }
}


class Layout extends React.Component {
 constructor(props) {
 super(props);
 
 

 var cards = createArray(height,width);
 var b= [];

  var alphabets = ["h","d","e","c","a","f","g","d","f","a","b","c","h","b","e","g"];
 
 for(var i=0;i<height;i++)
 {
 for(var j=0;j<width;j++)
 {
 cards[i][j]={cardValue:alphabets[i*width+j], flipped:false,rowIndex:i,colIndex:j}
 
 }
 }
 this.state = {cards: cards, firstInput: null,secondInput:null,mode: modes.a, clicks:0, score:0};
 }
 
 
  render() {
  const cardsRendered = this.state.cards.map((rowOfCards, rowindex)=><tr>{rowOfCards.map((card, indexOfCardInRow)=><td onClick={()=>this.cardClick(card)}><Card card={card}/></td>)}</tr>);
    return (<div><table><tbody>{cardsRendered}</tbody></table>
    <div><label className="lblScore">Score:</label><textbox className="score" id="lblScore">{this.state.score}</textbox>
    <label className="lblScore">Clicks:</label><textbox className="score" id="lblCount">{this.state.clicks}</textbox>
    <br></br><br></br><button  className="button" onClick={ () => this.restartGame()}>Restart Game</button></div></div>)
  }
  
restartGame()
{
var cards = createArray(height,width);
 var b= [];


  var alphabets = ["h","d","e","c","a","f","g","d","f","a","b","c","h","b","e","g"];
 
 for(var i=0;i<4;i++)
 {
 for(var j=0;j<4;j++)
 {
 cards[i][j]={cardValue:alphabets[i*4+j], flipped:false,rowIndex:i,colIndex:j}
 
 }
 }
this.setState({cards: cards, firstInput: null,secondInput:null,mode: modes.a,clicks: 0,score:0});


}
  
cardClick(card) 
{
var count = this.state.clicks;
var numberOfClicks = count + 1;

this.setState({clicks: numberOfClicks});
if(!card.flipped)
{
switch(this.state.mode) 
{

case modes.a:
this.state.cards[card.rowIndex][card.colIndex].flipped = !this.state.cards[card.rowIndex][card.colIndex].flipped;
this.setState({cards:this.state.cards,firstInput:card, mode:modes.b});
break;
case modes.b:

this.state.cards[card.rowIndex][card.colIndex].flipped = !this.state.cards[card.rowIndex][card.colIndex].flipped;
if(this.state.firstInput.cardValue==card.cardValue)
{
var currentScore = this.state.score;

currentScore = currentScore + 20;

this.setState({cards:this.state.cards,secondInput:card, mode:modes.a, score: currentScore});
}
else
{

this.setState({cards:this.state.cards,secondInput:card, mode:modes.d});

}
break;
case modes.d:
var currentScore = this.state.score;
if(currentScore <= 0)
{
currentScore = 0;
}
else 
{
currentScore = currentScore - 5;
}
this.state.cards[this.state.firstInput.rowIndex][this.state.firstInput.colIndex].flipped= false;
this.state.cards[this.state.secondInput.rowIndex][this.state.secondInput.colIndex].flipped= false;
this.setState({cards:this.state.cards,firstInput:card, mode:modes.b, score: currentScore});
this.state.cards[card.rowIndex][card.colIndex].flipped = true;

break;

}
}
}
}
