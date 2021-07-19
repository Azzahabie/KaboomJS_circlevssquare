import k from './kaboom.js'
import randomPos from './components/utils/generateEnemyPos.js'
import levelOne from './components/scenes/level_1.js'
import levelTwo from './components/scenes/level_2.js'
import levelTwoPointFive from './components/scenes/level_2PointFive.js'
import bossFight from './components/scenes/bossFight.js'
import startScreen from './components/scenes/start.js'

k.scene("startScreen", startScreen())
k.scene("level1",levelOne())
k.scene("level2", levelTwo())
k.scene("levelTwoPointFive", levelTwoPointFive())
k.scene("bossFight", bossFight())

k.start("startScreen")

