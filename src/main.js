import k from './kaboom.js'
import randomPos from './components/utils/generateEnemyPos.js'
import levelOne from './components/scenes/level_1.js'
import levelTwo from './components/scenes/level_2.js'
import levelTwoPointFive from './components/scenes/level_2PointFive.js'
import bossFight from './components/scenes/bossFight.js'
import bossFightFinalPhase from './components/scenes/bossFightFinalPhase.js'
import bossFightTransition from './components/scenes/bossFightTransition.js'
import startScreen from './components/scenes/start.js'
import endScreen from './components/scenes/endScreen.js'

k.scene("startScreen", startScreen())
k.scene("level1",levelOne())
k.scene("level2", levelTwo())
k.scene("levelTwoPointFive", levelTwoPointFive())
k.scene("bossFight", bossFight())
k.scene("bossFightFinalPhase", bossFightFinalPhase())
k.scene("bossFightTransition", bossFightTransition())
k.scene("endScreen", endScreen())

k.start("startScreen")

