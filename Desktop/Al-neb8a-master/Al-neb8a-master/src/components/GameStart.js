import React ,{useState}from 'react'
import './GameStart.css'

const GameStart = () => {
    const [groupe1Name, setGroupe1Name] = useState('');
  const [groupe2Name, setGroupe2Name] = useState('');
   const handleStart = () => {
    if (groupe1Name && groupe2Name) {
      alert(`Le jeu commence avec le groupe 1 : ${groupe1Name} et le groupe 2 : ${groupe2Name}`);
      // Logique pour lancer le jeu
    } else {
      alert('Veuillez entrer les noms des deux groupes.');
    }
  };
  return (
    <div className="game-container">
      <div className="input-group">
        <label htmlFor="groupe1">Groupe 1</label>
        <input 
          id="groupe1" 
          type="text" 
          placeholder="Entrez le nom du groupe 1" 
          value={groupe1Name} 
          onChange={(e) => setGroupe1Name(e.target.value)} 
        />
      </div>
      <div className="input-group">
        <label htmlFor="groupe2">Groupe 2</label>
        <input 
          id="groupe2" 
          type="text" 
          placeholder="Entrez le nom du groupe 2" 
          value={groupe2Name} 
          onChange={(e) => setGroupe2Name(e.target.value)} 
        />
      </div>
      <button className="start-button" onClick={handleStart}>
        Start
      </button>
    </div>
  );
};
  

export default GameStart
