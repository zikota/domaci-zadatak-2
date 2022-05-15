import logo from './logo.svg';
import './App.css';
import { React, useEffect, useState } from "react";
import Card from './Card';


function App() {

  const [tries, setTries] = useState(5);
  const [points, setPoints] = useState(0);
  const [cards, setCards] = useState([
    { id: 0, image_url: "https://semantic-ui.com/images/avatar/large/elliot.jpg", open: false },
    { id: 1, image_url: "https://semantic-ui.com/images/avatar2/large/kristy.png", open: false },
    { id: 2, image_url: "https://semantic-ui.com/images/avatar2/large/matthew.png", open: false },
    { id: 3, image_url: "https://semantic-ui.com/images/avatar2/large/molly.png", open: false },
    { id: 4, image_url: "https://semantic-ui.com/images/avatar2/large/elyse.png", open: false },
    { id: 5, image_url: "https://semantic-ui.com/images/avatar/large/jenny.jpg", open: false },
    { id: 6, image_url: "https://semantic-ui.com/images/avatar/large/elliot.jpg", open: false },
    { id: 7, image_url: "https://semantic-ui.com/images/avatar2/large/kristy.png", open: false },
    { id: 8, image_url: "https://semantic-ui.com/images/avatar2/large/matthew.png", open: false },
    { id: 9, image_url: "https://semantic-ui.com/images/avatar2/large/molly.png", open: false },
    { id: 10, image_url: "https://semantic-ui.com/images/avatar2/large/elyse.png", open: false },
    { id: 11, image_url: "https://semantic-ui.com/images/avatar/large/jenny.jpg", open: false }]);
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const [paired, setPaired] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    let temp = shuffleArray(cards);
    setCards(temp);
  }, [])

  useEffect(() => {
    if (tries == 0) {
      setGameOver(true);
      setMessage('LOSER');
    }
    console.log(tries);
  }, [tries])

  useEffect(() => {
    if (points == 6) {
      setMessage("WINNER");
      setGameOver(true);
    }
  },[points])

  function handleClick(id, key) {

    let temp = { id: id, key: key }
    setSelected([...selected, temp]);

    let cards2 = cards;
    cards2[key].open = true;
    setCards(cards2);

    if (selected.length == 1) {
      if (selected[0].id % 6 != id % 6) {
        setTries(tries - 1);
      }
      else {
        setPaired(true);
        setPoints(points + 1);
      }
    }

    if (selected.length == 2) {
      if (!paired) {
        cards2[selected[0].key].open = false;
        cards2[selected[1].key].open = false;
        setCards(cards2);
      }
      setSelected([temp]);
      setPaired(false);
    }
  }

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  function cardsToShow() {
    return cards.map((el, index) => {
      let cardel = el;
      return <Card cardInfo={cardel} key={index} position={index} handleClick={handleClick} over={gameOver}></Card>;
    });
  };

  function handleNewGame() {
    let temp = shuffleArray(cards);
    for (var i = 0; i < temp.length; i++) {
      temp[i].open = false;
    }
    setCards(temp);
    setPoints(0);
    setTries(5);
    setSelected([]);
    setMessage('');
    setGameOver(false);
  }

  return (

    <div className="container">
      <div className="ui grid">
        <div className="four column row">
          <div className="left floated column"><h2>Score: {points}</h2></div>
          <div className="column"><h1>Igra memorije</h1></div>
          <div className="right floated column"><h2>Tries: {tries}</h2></div>
        </div>
        <div className="row">
          <div className="three wide column"><button className="ui red button" onClick={handleNewGame}>New game</button></div>
          <div className="five wide column"><h2>{message}</h2></div>
        </div>
      </div>

      <div className="ui link cards" >
        {cardsToShow()}
      </div>

    </div>
  );
}

export default App;