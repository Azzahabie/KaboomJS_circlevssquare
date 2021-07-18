import k from '../../kaboom.js'
import findHades from '../utils/findHades.js'
import checkSector from './movementGuide.js'
k.loadSprite("hades", "./src/sprites/friendly/hades.png")
k.loadSprite("bullet", "./src/sprites/world/bullet.png")
k.loadSprite("enemy", "./src/sprites/enemy/enemy.png")
k.loadSprite("enemy2", "./src/sprites/enemy/enemy2.png")
k.loadSprite("enemy3", "./src/sprites/enemy/enemy3.png")
k.loadSound("shoot", "./src/components/sounds/shoot.wav")
k.loadSprite("wall", "./src/sprites/world/wall.png")
k.loadSprite("hello", "./src/sprites/world/longwall.png")
k.loadSprite("vWall", "./src/sprites/world/vWall.png")
k.loadSound("hit", "./src/components/sounds/hit.wav")
k.loadSound("firstPhase", "./src/components/sounds/firstPhase.mp3")



export default function bossFight(info) {
	return (info) => {

		const {
			add,
			pos,
			color,
			destroy,
			camShake,
			go,
			play,
			wait,
			scale,
			sprite,
			text,
			vec2,
			rand,
			solid,
			layers,
			layer,
			time,
			rgba,
			debug,
		} = k

		let d = "up"


		const music = play("firstPhase", {
			volume: 0.4,
		})

		music.play()
		const player = add([
			sprite("hades"),
			pos(100, 100),
			scale(2),
			health(20),
			solid(),
			"hades"
		])

		layers([
			"bg",
			"ui",
			"game",
		], "game");


		var score = 20
		var hp = player.hp();
		//var bossHP = boss.hp()
		var bossOriginalPos = {
			posX: 400,
			posY: 400
		}

		const scoreCount = add([
			text(`${score}`),
			pos(50, 60),
			color(rgba(1, 1, 1)),
			scale(2),
			layer("ui"),
			"score"
		]);
		const healthCount = add([
			text(`${hp}`),
			pos(50, 100),
			color(rgba(1, 0, 0.3)),
			scale(2),
			layer("ui"),
			"score"
		]);

		let boss = add([
			sprite("enemy"),
			pos(200,200),
			scale(5),
			"boss",
			"reset",
			health(50),
			solid(),
		])
		function health(hp) {
			// these functions will directly assign to the game object
			return {
				hurt(n) {
					hp -= n;
					if (hp <= 0) {
						// trigger a custom event
						destroy(this)
					}
				},
				heal(n) {
					hp += n;
				},
				hp() {
					return hp;
				},
			};
		}
		// function bloop(){
		// 	return {
		// 		bruh(){
		// 			boss.action(()=>{
		// 				frames++
		// 				boss.move(200,0)
		// 				if (frames == 40){
		// 					bossStop()
		// 					console.log("hi");
		// 				}
		// 				console.log("hi");
		// 			})
		// 		},
		// 		bruhStop(){
		// 			boss.action(()=>{
		// 				boss.move(0,0)
		// 			})
		// 		}
		// 	}
		// }
		var okk = true
		
		function bloop(){
			boss.move(200,200)
		
		}
		function bossStop(){
			boss.stop()
		}
		function updateScore() {
			score++
			scoreCount.use(text(`${score}`))
		}
		function updateHP() {
			hp--
			healthCount.use(text(`${hp}`))
		}
		function bossNormalAttack(sector) {
			let b = add([
				sprite("bullet"),
				pos(boss.pos.x, boss.pos.y),
				"bossBullet",
			])
			let b1 = add([
				sprite("bullet"),
				pos(boss.pos.x, boss.pos.y),
				"bossBullet1",
			])
			let b2 = add([
				sprite("bullet"),
				pos(boss.pos.x, boss.pos.y),
				"bossBullet2",
			])
			k.action("bossBullet", (b) => {
				b.move(200, 200)
	
				wait(1, () => {
					destroy(b)
				})
			})
			k.action("bossBullet1", (b) => {
				b.move(400, 200)
	
				wait(1, () => {
					destroy(b)
				})
			})
			k.action("bossBullet2", (b) => {
				b.move(600, 200)
	
				wait(1, () => {
					destroy(b)
				})
			})
		}

		const bossNormalMovement = (x, y) => {
			boss.move(x, y)

		}
		// const bossStop = () => {
		// 	boss.move(0, 0)
		// }

		function loadMap() {
			let topWall = add([
				sprite("hello"),
				solid(),
				pos(0, -15)
			])
			let botWall = add([
				sprite("hello"),
				solid(),
				pos(0, 798)
			])
			let rightWall = add([
				sprite("vWall"),
				solid(),
				pos(799, 0)
			])
			let leftWall = add([
				sprite("vWall"),
				solid(),
				pos(-14, 0)
			])
		}


		// function createEnemy2() {
		// 	let enmy2 = [
		// 		sprite("enemy2"),
		// 		pos(rand(vec2(0), vec2(790))),
		// 		scale(2),
		// 		"enemy2",
		// 		"reset",
		// 		health(2),
		// 		solid(),
		// 	]
		// 	add(enmy2)
		// }

		// function createEnemy3() {
		// 	let enmy3 = [
		// 		sprite("enemy3"),
		// 		pos(rand(vec2(10), vec2(790))),
		// 		scale(2),
		// 		"enemy3",
		// 		"reset",
		// 		health(2),
		// 		solid(),
		// 	]
		// 	add(enmy3)
		// }

		function createBullet(direction) {

			let b = add([
				sprite("bullet"),
				pos(player.pos.x, player.pos.y),
				"bullet",
				{
					wDirection: direction
				},
			])


		}
		k.keyPress("s", () => {
			d = "down"
		})
		k.keyPress("w", () => {
			d = "up"
		})
		k.keyPress("c", () => {
			crashFunction()
		})
		k.keyPress("a", () => {
			d = "left"
		})
		k.keyPress("d", () => {
			d = "right"
		})
		k.keyDown("s", () => {
			boss.move
			player.move(0, 300)
		});
		k.keyDown("w", () => {
			player.move(0, -300)
		});
		k.keyDown("a", () => {
			player.move(-300, 0)
		});
		k.keyDown("d", () => {
			player.move(300, 0)
		});
		k.keyPress("space", () => {
			play("shoot", {
				volume: 0.6,
				speed: 1.0
			})
			createBullet(d)
						
		
		});
		k.action("boss",()=>{
			console.log(okk);
			if(okk){
				boss.move(200,0)
			}
		})

		k.keyPress("enter", () => {
			okk = false
		

		});
		k.keyPress("backspace", () => {
			okk=true
		});

		k.action("bullet", (r) => {
			let x = r.wDirection
			if (x == "down") {
				r.move(0, 500)
			}
			if (x == "up") {

				r.move(0, -500)
			}
			if (x == "left") {

				r.move(-500, 0)
			}
			if (x == "right") {

				r.move(500, 0)
			}
			wait(0.5, () => {
				destroy(r)
			})
		})


		k.action("enemy2", (e) => {
			findHades(player.pos.x, player.pos.y, e.pos.x, e.pos.y)
				.then((data) => {
					e.move(data.x, data.y)
				})
			e.resolve()
		})
		k.action("enemy3", (e) => {
			findHades(player.pos.x, player.pos.y, e.pos.x, e.pos.y)
				.then((data) => {
					e.move(data.x, data.y)
				})
			e.resolve()
		})
		k.collides("reset", "hades", (e, h) => {
			camShake(12)
			play("hit", {
				volume: 1.0,
				speed: 1.0
			})
			h.hurt(1)
			updateHP()
		})
		k.collides("enemy2", "bullet", (e, b) => {
			e.hurt(1)
			destroy(b)
			updateScore()
		})
		k.collides("enemy3", "bullet", (e, b) => {
			e.hurt(1)
			destroy(b)
			updateScore()
		})
		let frames = 0
		// boss.action(() => {

		// 	switch (Math.floor(time())) {
		// 		case 5:
		// 			boss.move(200, 200)
		// 			break;
		// 		case 6:
		// 			frames++
		// 			if(frames == 5){
					
		// 				checkSector(boss.pos.x,boss.pos.y)
		// 			}
		// 			if (frames == 10) {
						
		// 				bossNormalAttack()
		// 			}
		// 			if (frames >= 60) {
		// 				frames = 0
		// 			}
					
		// 			break;

		// 		case 10:
		// 			boss.move(200, 200)

		// 			console.log(frames);
		// 			break;

		// 		case 11:
		// 			frames++
		// 			if(frames == 5){
					
		// 				checkSector(boss.pos.x,boss.pos.y)
		// 			}
		// 			if (frames == 10) {
						
		// 				bossNormalAttack()
		// 			}
		// 			if (frames == 59 || frames == 60) {
		// 				frames = 0
		// 			}

		// 			break;
		// 		case 15:
		// 			boss.move(200, 0)

		// 			console.log("15");
		// 			break;
		// 		case 16:
		// 			frames++
		// 			if(frames == 5){
					
		// 				checkSector(boss.pos.x,boss.pos.y)
		// 			}
		// 			if (frames == 10) {
						
		// 				bossNormalAttack()
		// 			}
		// 			if (frames == 59 || frames == 60) {
		// 				frames = 0
		// 			}

		// 			break;

		// 		case 20:
		// 			boss.move(-200, -200)

		// 			console.log("20");
		// 			break;
		// 		case 21:
		// 			frames++
		// 			if(frames == 5){
					
		// 				checkSector(boss.pos.x,boss.pos.y)
		// 			}
		// 			if (frames == 10) {
						
		// 				bossNormalAttack()
		// 			}
		// 			if (frames == 59 || frames == 60) {
		// 				frames = 0
		// 			}

		// 			break;

		// 		case 25:
		// 			console.log("25");
		// 			break;

		// 		case 30:
		// 			console.log("30");
		// 			break;

		// 		case 35:
		// 			console.log("35");
		// 			break;

		// 		case 40:
		// 			console.log("40");
		// 			break;
		// 	}


		// })
		k.loop(5,()=>{
		
			bossNormalAttack()
			
		})
		

		
			
		
		
		player.action(() => {
			player.resolve()
		})

		
		loadMap()



	}

}