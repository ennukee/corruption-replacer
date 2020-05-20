import { corruptionIds, corruptionData } from './corruptionIds'

export default (input, toggledCorruptions) => {
    const lines = input.split('\n')
    const bagGearIndex = lines.findIndex(line => line.startsWith('###'))
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
        })
    })
    const allExtraPieces = []
    const cleansedLines = corruptableSlotLines.map(line => {
        return corruptionIds.reduce((acc, id) => acc.replace(id, ''), line).replace('/,', ',').replace('//', '/')
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

    return `${mainGear.join('\n')}\n### GEAR FROM CLONER\n${allExtraPieces.map(line => `# ${line}`).join('\n')}`
}