import React, { useState, useRef, useReducer } from 'react';
import processSimcInput from './util/processSimcInput';
import { corruptionData } from './util/corruptionIds'
import Changelog from './components/Changelog'
import './App.scss';

function App() {
  const [ input, setInput ] = useState('# Paste your /simc input here')
  const [ buttonFlair, setButtonFlair ] = useState(false)
  const inputRef = useRef()

  // Additional option reducer
  const [ options, setOption ] = useReducer((state, action) => {
    // action is of form: { type?: string, param: string, value?: any }
    const newState = { ...state }
    if (action.type !== 'BOOLEAN') {
      newState[action.param] = action.value
    } else {
      newState[action.param] = !newState[action.param]
    }
    return newState
  }, {})

  // Selected corruptions
  const [ activeCorruptions, toggleCorruption ] = useReducer((state, id) => {
    const newState = {...state};
    newState[id] = !newState[id];
    return newState;
  }, {})

  const submitInput = () => {
    const output = processSimcInput(input, activeCorruptions, options)
    setInput(output)
    setTimeout(() => {
      inputRef.current.select()
      document.execCommand('copy')
    }, 20)
    setButtonFlair(true)
    setTimeout(() => setButtonFlair(false), 2500)
  }

  const handleCorruptionClick = (id) => {
    toggleCorruption(id)
  }

  return (
    <div className="App">
      <Changelog />
      <div id="inner-body">
        <div id="title">Corruption Mass Cloner</div>
        <div id="subtitle">version 1.2.0 (last updated 6/4/2020)</div>
        <div id="description">
          <div className="main-body">
            Paste your /simc input into the box below, then click on the corruptions
            below that represent any corruption you want to get a copy of on your equipped gear
            (default ignores unequipped)
          </div>
          <div id="credits">This likely has bugs. Hit up enragednuke#0001 on Discord with any issues. Direct any corruption-specific questions to your class discord.</div>
        </div>
        <div id="input-area">
          <textarea ref={inputRef} rows="8" onChange={(e) => setInput(e.target.value)} value={input}/>
          <button
            className={buttonFlair ? 'flair' : ''}
            onClick={submitInput}
          >
            {buttonFlair ? 'Done! Copy the above into raidbots :)' : 'Clone'}
          </button>
        </div>
        <div id="options">
          <div
            id="override-sockets"
            className={`additional-option ${options.overrideSockets ? 'active' : 'inactive'}`}
            onClick={() => setOption({ type: 'BOOLEAN', param: 'overrideSockets' })}
          >
            Override sockets
          </div>
          <div
            id="ilvl-475"
            className={`additional-option ${options.ilvl475 ? 'active' : 'inactive'}`}
            onClick={() => setOption({ type: 'BOOLEAN', param: 'ilvl475' })}
          >
            Set item levels to 475
          </div>
          <div
            id="bags"
            className={`additional-option ${options.bags ? 'active' : 'inactive'}`}
            onClick={() => setOption({ type: 'BOOLEAN', param: 'bags' })}
          >
            Clone in-bags gear too
          </div>
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
