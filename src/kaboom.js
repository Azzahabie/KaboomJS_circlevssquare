import kaboom from "../node_modules/kaboom/dist/kaboom.mjs";

export const k = kaboom({
    width:800,
    height:800,
    scale:1,
    fullscreen:false,
    canvas:document.getElementById("canvas"),
    clearColor: [0, 0, 0, 1],
    debug: true
});

export default k