import React ,{useState}from 'react'
import './GameStart.css'
import { Link, Route, Router, Routes } from 'react-router-dom';

const GameStart = () => {
    const [groupe1Name, setGroupe1Name] = useState('');
  const [groupe2Name, setGroupe2Name] = useState('');
   
  console.log(groupe1Name, groupe2Name);

  const handlClick = () => {
    
  }
  return (
    <div className="gamestar">
    <div className="game-container">
      <div className="input-group">
        <input 
          id="groupe1" 
          type="text" 
          placeholder="Group 1 Name :  "  
          value={groupe1Name} 
          onChange={(e) => setGroupe1Name(e.target.value)} 
        />
      </div>
      <div className="input-group">
        <input 
          id="groupe2" 
          type="text" 
          placeholder="Group 2 Name :" 
          value={groupe2Name} 
          onChange={(e) => setGroupe2Name(e.target.value)} 
        />
      </div>
      <button className="start-button" onClick={() => handlClick( 
        <Link to={"category"} className="category-link">
    </Link>)} >Start
      </button>
    </div>
    
</div>
  );
};
  

export default GameStart
