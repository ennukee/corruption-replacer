import React, { useState, useReducer } from 'react';
import processSimcInput from './util/processSimcInput';
import { corruptionData } from './util/corruptionIds'
import './App.scss';

function App() {
  const [ input, setInput ] = useState('# Paste your /simc input here');
  const [ buttonFlair, setButtonFlair ] = useState(false)
  const [ activeCorruptions, toggleCorruption ] = useReducer((state, id) => {
    const newState = {...state};
    newState[id] = !newState[id];
    return newState;
  }, {})
  const submitInput = () => {
    const output = processSimcInput(input, activeCorruptions)
    setInput(output)
    setButtonFlair(true)
    setTimeout(() => setButtonFlair(false), 2500)
  }
  const handleCorruptionClick = (id) => {
    toggleCorruption(id)
  }
  return (
    <div className="App">
      <div id="inner-body">
        <div id="title">Corruption Mass Cloner</div>
        <div id="description">
          <div className="main-body">
            Paste your /simc input into the box below, then click on the corruptions
            below that represent any corruption you want to get a copy of on your active gear.
          </div>
          <div className="main-body">
            This will ignore all non-equipped gear to prevent absurdly large outputs. Equip the pieces you would ideally corrupt before inputting. 
          </div>
          <div id="credits">This may have bugs, it was made in about 2 hours. Hit up Chickenism on US-Icecrown ingame or enragednuke#0001 on Discord with any issues.</div>
        </div>
        <div id="input-area">
          <textarea rows="8" onChange={(e) => setInput(e.target.value)} value={input}/>
          <button
            className={buttonFlair ? 'flair' : ''}
            onClick={submitInput}
          >
            {buttonFlair ? 'Done! Copy the above into raidbots :)' : 'Clone'}
          </button>
        </div>
        <div id="corruption-selector">
          { corruptionData.map(({ name, id }) => (
            <div
              className={activeCorruptions[id] ? 'active' : 'inactive'}
              onClick={() => handleCorruptionClick(id)}
              key={name}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
