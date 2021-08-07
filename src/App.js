import { useState, useEffect } from 'react'
import style from './App.module.css';

function App() {

  const [movement, setMovement] = useState('steady')
  const [animal, setAnimal] = useState('dog')
  const [timeoutId, setTimeoutId] = useState()

  const keyMovements = [
    { key: 87, animal: 'dog', movement: 'up'},
    { key: 83, animal: 'dog', movement: 'down'},
    { key: 65, animal: 'dog', movement: 'left'},
    { key: 68, animal: 'dog', movement: 'right'},
  ]

  const checkMovementUp = (key) => {
      const move = keyMovements.find(keyMovement => keyMovement.key === key.keyCode) 
      setMovement( move !== undefined ? move.movement : 'steady')
  }

  useEffect(() => {
    window.addEventListener('keyup', checkMovementUp)

  }, [])


  return (
    <div className="App">
      <h3>{movement}</h3>
      <div className={`${style[animal]} ${style[movement]}`}></div>
    </div>
  );
}

export default App;
