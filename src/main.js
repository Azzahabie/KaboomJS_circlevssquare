import k from './kaboom.js'
import randomPos from './components/utils/generateEnemyPos.js'
import levelOne from './components/scenes/level_1.js'
import levelTwo from './components/scenes/level_2.js'
import bossFight from './components/scenes/bossFight.js'
import startScreen from './components/scenes/start.js'

var info ={}
k.scene("startScreen", startScreen())
k.scene("level1",levelOne())
k.scene("level2", levelTwo())
// k.scene("bossFight", (info) => {
// 	bossFight(info)
// })

k.start("startScreen")

