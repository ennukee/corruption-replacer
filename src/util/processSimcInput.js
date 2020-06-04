import { corruptionIds, corruptionData } from './corruptionIds'

export default (input, toggledCorruptions, options) => {
    const lines = input.split('\n')
    const bagGearIndex = options.bags ? lines.length : lines.findIndex(line => line.startsWith('###'))
    const mainGear = lines.slice(0, bagGearIndex)
    const corruptableSlots = [
        'wrist',
        'hands',
        'waist',
        'legs',
        'feet',
        'finger1',
        'finger2',
        'main_hand',
        'off_hand',
    ]
    const corruptableSlotLines = []
    mainGear.forEach(line => {
        corruptableSlots.forEach(slot => {
            if (line.startsWith(slot)) {
                corruptableSlotLines.push(line)
            }
            if (options.bags && line.startsWith(`# ${slot}`)) {
                corruptableSlotLines.push(line.slice(2))
            }
        })
    })
    const allExtraPieces = []
    const cleansedLines = corruptableSlotLines.map(line => {
        return [...(options.overrideSockets ? ['4802'] : []), ...corruptionIds].reduce((acc, id) => acc.replace(id, ''), line).replace('/,', ',').replace('//', '/')
    })
    allExtraPieces.push(...cleansedLines)

    // { a: true, b: false, c: true } => [a, c]
    const idsToAdd = Object.keys(toggledCorruptions).filter(id => toggledCorruptions[id])

    // Now we begin to add each corruption we want
    idsToAdd.forEach(id => {
        // if (id.includes('/')) id = id.split('/')[0]
        const corruptedLines = cleansedLines.map(line => line.replace('bonus_id=', `bonus_id=${id}/`))
        allExtraPieces.push(...corruptedLines)
    })
    let piecesPostFilter = allExtraPieces
    if (options.overrideSockets) {
        piecesPostFilter = piecesPostFilter.map(line =>
            line.replace('bonus_id=', 'bonus_id=4802/')
        )
    }
    if (options.ilvl475) {
        piecesPostFilter = piecesPostFilter.map(line =>
            line += ',ilevel=475'    
        )
    }

    return `${mainGear.join('\n')}\n### GEAR FROM CLONER\n${piecesPostFilter.map(line => `# ${line}`).join('\n')}`
}