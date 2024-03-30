// Todo: Take from editor official url
const defaultUrl = "https://app-dev.glorify.com/assets/designer/static/media/cursors/";
const getCustomCursor = (cursor) => {
    let x1 = 11;
    let y1 = 9;

    if (coords[cursor]) {
        let { x, y } = coords[cursor];
        x1 = x;
        y1 = y;
    }
    return `url("${defaultUrl + cursors[cursor]}") ${x1} ${y1} , ${fallbackCursors[cursor]}`;
}

export default getCustomCursor;

export const cursors = {
    'textContainer': 'cursor-text.svg',
    'customCrosshair': 'cursor-crosshair.svg',
    'shape': 'cursor-crosshair.svg',
    'pencil': 'cursor-pentool-pencil.svg',
    'pen': 'cursor-pentool.svg',
    'frame': 'cursor-crosshair.svg',
    'w-resize': 'cursor-eresize.svg',
    'we-resize': 'cursor-eresize.svg',
    'e-resize': 'cursor-eresize.svg',
    'ew-resize': 'cursor-eresize.svg',
    'ne-resize': 'cursor-neresize.svg',
    'sw-resize': 'cursor-neresize.svg',
    'n-resize': 'cursor-nresize.svg',
    's-resize': 'cursor-nresize.svg',
    'nwse-resize': 'cursor-nwseresize.svg',
    'se-resize': 'cursor-nwseresize.svg',
    'nw-resize': 'cursor-nwseresize.svg',
    'ns-resize': 'cursor-nresize.svg',
    'nesw-resize': 'cursor-nwseresize.svg',
    'comment': 'cursor-map.svg',
    'color-picker': 'cursor-pipette.svg',
    'grab': 'cursor-hand.svg',
    'grabbing': 'cursor-pointer.svg',
    'move': 'cursor.svg',
    'moveCursor': 'cursor-move.svg',
    'crosshair': 'cursor-move.svg',
    'default': 'cursor.svg',
    'cursor-cross': 'cursor-cross.svg',
}

const fallbackCursors = {
    'textContainer': 'text',
    'shape': 'crosshair',
    'pencil': 'crosshair',
    'pen': 'crosshair',
    'frame': 'crosshair',
    'default': 'default',
    'cursor-cross': 'default',

    'e-resize': 'e-resize',
    'ew-resize': 'ew-resize',
    'w-resize': 'w-resize',
    'we-resize': 'we-resize',
    'ne-resize': 'ne-resize',
    'ns-resize': 'ns-resize',
    'n-resize': 'n-resize',
    's-resize': 's-resize',
    'sw-resize': 'sw-resize',
    'nwse-resize': 'nwse-resize',
    'nw-resize': 'nw-resize',
    'se-resize': 'se-resize',
    'comment': 'default',
    'color-picker': 'crosshair',
    'grab': 'grab',
    'grabbing': 'grabbing',
    '-webkit-grab': '-webkit-grab',
    '-webkit-grabbing': '-webkit-grabbing',
    'move': 'move',
    'moveCursor': 'move',
    'crosshair': 'crosshair',
    'customCrosshair': 'crosshair',
    'cell': 'cell',

}

let coords = {
    'pencil': { x: 11, y: 100 },
    'pen': { x: 5, y: 2 },
    'crosshair': { x: 15, y: 15 },
    'color-picker': { x: 4, y: 21 },
    'default': { x: 6, y: 6 },
}