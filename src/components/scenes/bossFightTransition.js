import k from '../../kaboom.js'


k.loadSound("firstPhase", "./src/components/sounds/firstPhase.mp3")

export default function bossFight(info) {
	return (info) => {

		const {
			add,
			pos,
			color,
			camShake,
			go,
			play,
			wait,
			scale,
			sprite,
			layers,
			layer,
			camScale,
			camPos
		} = k

	
		// const music = play("firstPhase", {
		// 	volume: 0.4,
		// })

		// music.play()


		layers([
			"bg",
			"ui",
			"game",
		], "game");

		const player = add([
			sprite("hades"),
			pos(info.hadesPosX, info.hadesPosY),
			scale(2),
		
		])

		let boss = add([
			sprite("enemy"),
			pos(info.bossX, info.bossY),
			scale(5),
			"boss",
			"reset",
		])

		camPos(info.camPosX,info.camPosY)
		var i = 2.5
		var l = 5
		camScale(i)

		wait(1,()=>{

			let llop = k.loop(1,()=>{
				boss.changeSprite("enemy2")
				wait(0.5,()=>{
					boss.changeSprite("enemy")
				})
			})

			wait(3,()=>{
				llop.stop()
				boss.changeSprite("enemy3")
				var kloop = k.loop(0.2,()=>{
					i = i - 0.1
					camScale(i)
					
			
					if(i <= 1){
						kloop.stop()
						camPos(400,400)
						wait(2,()=>{

							go("bossFightFinalPhase",info)
						})
					}
				})
			})

		})
		

	}

}