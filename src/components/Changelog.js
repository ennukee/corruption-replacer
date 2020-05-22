import React, { useState } from 'react'
import './Changelog.scss'
import ReactMarkdown from 'react-markdown'

const changelogInput = `
Only includes the last 3 updates\n
5/22/20
 * Added ability to override sockets (adds a blank socket to all cloned pieces, this is temporary until 
    wrathion sockets are fixed on Raidbots)\n
 * Added ability to set item level of all cloned pieces to 475\n
 * Added changelog\n
5/21/20
 * Released\n
`
export default function Changelog() {
    const [ visible, setVisibility ] = useState(false)
    return (
        <div id="changelog-container">
            <div id="open-changelog" onClick={() => setVisibility(true)}>Changelog</div>
            { visible && (
                <div id="changelog">
                    <div id="clog-title">CMC Changelog</div>
                    <ReactMarkdown
                        source={changelogInput}
                    />
                    <div id="close-button" onClick={() => setVisibility(false)}>X</div>
                </div>
            )}
        </div>
    )
}
