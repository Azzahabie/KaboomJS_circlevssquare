import k from './kaboom.js'
import randomPos from './components/utils/generateEnemyPos.js'
import levelOne from './components/scenes/level_1.js'

// import startScreen from './components/scenes/start.js'
// import level1 from './components/scenes/level_1.js'
// k.scene("main", () => {

// 	// add a text at position (100, 100)
// 	k.add([
// 		k.text("ohhimark", 32),
// 		k.pos(120, 100),
// 	]);
//     console.log("test");
// });

// k.scene('start', startScreen)
// k.scene('level_1', level1)

// // start the game
// k.start("start");


k.scene("main", ()=>{
	levelOne()
})


k.start("main")

