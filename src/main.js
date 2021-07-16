import k from './kaboom.js'
import randomPos from './components/utils/generateEnemyPos.js'
import levelOne from './components/scenes/level_1.js'
import startScreen from './components/scenes/start.js'

k.scene("startScreen", () => {
	startScreen()
})
k.scene("level1", (name) => {
	levelOne(name)
})


k.start("level1")

