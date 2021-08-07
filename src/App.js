import { useState, useEffect } from 'react'
import style from './App.module.css';

function App() {

  const [movement, setMovement] = useState('steady')
  const [animate, setAnimation] = useState(false)
  const [animal, setAnimal] = useState('dog')
  const [isOnHold, setIsOnHold] = useState(false)
  const [timeoutId, setTimeoutId] = useState()

  const keyMovements = [
    { key: 87, animal: 'dog', movement: 'up'},
    { key: 83, animal: 'dog', movement: 'down'},
    { key: 65, animal: 'dog', movement: 'left'},
    { key: 68, animal: 'dog', movement: 'right'},
  ]

  const checkMovement = (key) => {
      const move = keyMovements.find(keyMovement => keyMovement.key === key.keyCode) 
      setMovement( move !== undefined ? move.movement : 'steady')
  }

  useEffect(()=>{
    if(isOnHold)
      console.log('test')
  }, [])

  const onHoldStart = (key) => {
    checkMovement(key)

    setIsOnHold(true);
    const timeout = setTimeout(() => {
      if(isOnHold){
        setAnimation(true)
      }
    }, 800)


    setTimeoutId(timeout)
  }

  const onHoldEnd = () => {
    console.log("on hold end")
    setIsOnHold(false);
    setAnimation(false)

    clearTimeout(timeoutId)
  }

  useEffect(() => {
    window.addEventListener('keydown', onHoldStart)
    window.addEventListener('keyup', onHoldEnd)

    return () => {
      window.removeEventListener('keydown', onHoldStart)
      window.removeEventListener('keyup', onHoldEnd)
    }

  })


  return (
    <div className="App">
      <h3>{movement}</h3>
      <div className={`${style[animal]} ${style[movement]} ${ animate ? style.move : ''}`}></div>
    </div>
  );
}

export default App;
