import k from '../../kaboom.js'
import findHades from '../utils/findHades.js'
import findNextSector from '../utils/movementGuide.js'

k.loadSound("secondphase", "./src/components/sounds/secondphase.mp3")

export default function bossFightFinalPhase(info) {
	return (info) => {
		console.log(info);
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
			solid,
			layers,
			layer,
			rgba,
			rand,
			vec2,
			camPos,
			camScale,

		} = k

		let d = "up"
		var randX = 0
		var randY = 0
		var doesBossMove = true

		

		const music = play("secondphase", {
			volume: 0.4,
		})

		music.play()

		const player = add([
			sprite("hades"),
			pos(info.hadesPosX, info.hadesPosY),
			scale(1),
			health(info.theHp),
			solid(),
			"hades"
		])

		layers([
			"bg",
			"ui",
			"game",
		], "game");


		var score = info.theScore
		var hp = player.hp();

		const scoreCount = add([
			text(`${score}`),
			pos(50, 60),
			color(rgba(1, 1, 1)),
			scale(2),
			layer("ui"),
			"score"
		]);
		const star = add([
			sprite("star"),
			pos(10, 50),
			scale(0.5),
			layer("ui"),
			"star"
		]);
		const healthCount = add([
			text(`${hp}`),
			pos(50, 100),
			color(rgba(1, 0, 0)),
			scale(2),
			layer("ui"),
			"score"
		]);
		const heartIcon = add([
			sprite("heartIcon"),
			pos(10, 90),
			scale(0.5),
			layer("ui"),
			"heart"
		]);


		let boss = add([
			sprite("enemy3"),
			pos(info.bossX, info.bossY),
			scale(5),
			"boss",
			"reset",
			health(50),
			solid(),
		])
	
		function createEnemy() {
			let enmy = add([
				sprite("enemy"),
				pos(rand(vec2(0), vec2(790))),
				scale(3),
				"bot",
				"reset",
				health(4),
				solid(),
			])
			let enmy1 = add([
				sprite("enemy"),
				pos(rand(vec2(0), vec2(790))),
				scale(3),
				"bot1",
				"reset",
				health(4),
				solid(),
			])
			let enmy2 = add([
				sprite("enemy"),
				pos(rand(vec2(0), vec2(790))),
				scale(3),
				"bot2",
				"reset",
				health(4),
				solid(),
			])
			
		}
		k.action("bot", (e) => {
			findHades(player.pos.x, player.pos.y, e.pos.x, e.pos.y)
				.then((data) => {
					e.move(data.x, data.y)
				})
			e.resolve()
		})
		k.action("bot1", (e) => {
			findHades(player.pos.x, player.pos.y, e.pos.x, e.pos.y)
				.then((data) => {
					e.move(data.x, data.y)
				})
			e.resolve()
		})
		k.action("bot2", (e) => {
			findHades(player.pos.x, player.pos.y, e.pos.x, e.pos.y)
				.then((data) => {
					e.move(data.x, data.y)
				})
			e.resolve()
		})
		function health(hp) {
			// these functions will directly assign to the game object
			return {
				hurt(n) {
					hp -= n;
					if (this._tags[0] == "hades") {
						var gameContainer = document.getElementById("game-container");
						gameContainer.style.backgroundColor = "red"
						k.wait(0.2,()=>{
							gameContainer.style.backgroundColor = "black"
						})
					}
					if (hp <= 0) {
						if (this._tags[0] == "hades") {
							music.stop()
							destroy(this)
							info.theHp = hp
							info.theScore = score
							info["outcome"] = false
							go("endScreen",info)
						}
						if (this._tags[0] == "boss") {
							destroy(this)
							music.stop()
							go("startScreen")
						} else {
							destroy(this)
						}
						// trigger a custom event


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

		function updateScore() {
			score++
			scoreCount.use(text(`${score}`))
		}

		function updateHP() {
			hp--
			healthCount.use(text(`${hp}`))
		}

		function bossNormalAttack() {

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
			let b3 = add([
				sprite("bullet"),
				pos(boss.pos.x, boss.pos.y),
				"bossBullet3",
			])
			let b4 = add([
				sprite("bullet"),
				pos(boss.pos.x, boss.pos.y),
				"bossBullet4",
			])
			let b5 = add([
				sprite("bullet"),
				pos(boss.pos.x, boss.pos.y),
				"bossBullet5",
			])
			let b6 = add([
				sprite("bullet"),
				pos(boss.pos.x, boss.pos.y),
				"bossBullet6",
			])
			let b7 = add([
				sprite("bullet"),
				pos(boss.pos.x, boss.pos.y),
				"bossBullet7",
			])
		}

		var bDir = {

			topLeftToBtmLeft: {
				x: 258,
				y: 646
			},
			topLeftToBtmRight: {
				x: 761,
				y: 699
			},
			topLeftToTopRight: {
				x: 761,
				y: 215
			},
			btmRightToTopLeft: {
				x: -761,
				y: -699
			},
			btmRightToTopRight: {
				x: 0,
				y: -500
			},
			btmRightToBtmLeft: {
				x: -600,
				y: 0
			},
			btmLeftToTopLeft: {
				x: 20,
				y: -450
			},
			btmLeftToBtmRight: {
				x: 450,
				y: 0
			},
			btmLeftToTopRight: {
				x: 400,
				y: -400
			},
			topRightToTopLeft: {
				x: -400,
				y: 20
			},
			topRightToBtmLeft: {
				x: -400,
				y: 400
			},
			topRightToBtmRight: {
				x: 20,
				y: 400
			},

		}

		k.action("bossBullet", (b) => {
				b.move(bDir.topLeftToBtmLeft.x, bDir.topLeftToBtmLeft.y)

			wait(1, () => {
				destroy(b)
			})

		})

		k.action("bossBullet1", (b) => {
				b.move(bDir.topLeftToBtmRight.x, bDir.topLeftToBtmRight.y)

			wait(1, () => {
				destroy(b)
			})
		})

		k.action("bossBullet2", (b) => {
				b.move(bDir.topLeftToTopRight.x, bDir.topLeftToTopRight.y)
			
			wait(1, () => {
				destroy(b)
			})
		})
		k.action("bossBullet3", (b) => {
				b.move(bDir.topRightToTopLeft.x, bDir.topRightToTopLeft.y)

			wait(1, () => {
				destroy(b)
			})

		})

		k.action("bossBullet4", (b) => {
				b.move(bDir.topRightToBtmLeft.x, bDir.topRightToBtmLeft.y)

			wait(1, () => {
				destroy(b)
			})
		})

		k.action("bossBullet5", (b) => {
				b.move(bDir.btmRightToTopRight.x, bDir.btmRightToTopRight.y)
			
			wait(1, () => {
				destroy(b)
			})
		})
		k.action("bossBullet6", (b) => {
				b.move(bDir.btmRightToTopLeft.x, bDir.btmRightToTopLeft.y)
			
			wait(1, () => {
				destroy(b)
			})
		})
		k.action("bossBullet7", (b) => {
				b.move(bDir.btmLeftToTopRight.x, bDir.btmLeftToTopRight.y)
			
			wait(1, () => {
				destroy(b)
			})
		})
		function loadMap() {
			let topWall = add([
				sprite("longWall"),
				solid(),
				pos(0, -15)
			])
			let botWall = add([
				sprite("longWall"),
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
		function createBullet(direction) {
			if(direction == "left"){
				let b = add([
					sprite("bulletLeft"),
					pos(player.pos.x, player.pos.y),
					"bullet",
					{
						wDirection: direction
					},
				])
			}else if(direction =="right"){
				let b = add([
					sprite("bulletRight"),
					pos(player.pos.x, player.pos.y),
					"bullet",
					{
						wDirection: direction
					},
				])
			} else if (direction == "up"){
				let b = add([
					sprite("bulletUp"),
					pos(player.pos.x, player.pos.y),
					"bullet",
					{
						wDirection: direction
					},
				])
			}else {
				let b = add([
					sprite("bulletDown"),
					pos(player.pos.x, player.pos.y),
					"bullet",
					{
						wDirection: direction
					},
				])
			}
			
	
	
		}

		k.keyPress("s", () => { d = "down" })
		k.keyPress("w", () => { d = "up" })
		k.keyPress("c", () => { crashFunction() })
		k.keyPress("a", () => { d = "left" })
		k.keyPress("d", () => { d = "right" })
		k.keyDown("s", () => { player.move(0, 300) });
		k.keyDown("w", () => { player.move(0, -300) });
		k.keyDown("a", () => { player.move(-300, 0) });
		k.keyDown("d", () => { player.move(300, 0) });
		k.keyPress("space", () => {
			play("shoot", {
				volume: 0.6,
				speed: 1.0
			})
			createBullet(d)
		});

		boss.action(() => {
			if (doesBossMove) {
				boss.move(randX, randY)
			} 
			boss.resolve()
		})

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

		k.collides("boss", "bullet", (e, b) => {
			e.hurt(1)
			boss.changeSprite("enemy2")

			wait(0.3, () => {
				boss.changeSprite("enemy3")
			})
			destroy(b)
			updateScore()
		})

		k.collides("bullet", "bot", (e, b) => {
			b.hurt(1)
			destroy(e)
			updateScore()
		})
		k.collides("bullet", "bot1", (e, b) => {
			b.hurt(1)
			destroy(e)
			updateScore()
		})
		k.collides("bullet", "bot2", (e, b) => {
			b.hurt(1)
			destroy(e)
			updateScore()
		})

		k.collides("hades", "bossBullet", (e, b) => {
			camShake(12)
			play("hurt", {
				volume: 0.3,
				speed: 1.0
			})
			e.hurt(1)
			destroy(b)
			updateHP()
		})
		k.collides("hades", "bossBullet1", (e, b) => {
			camShake(12)
			play("hurt", {
				volume: 0.3,
				speed: 1.0
			})
			e.hurt(1)
			destroy(b)
			updateHP()
		})
		k.collides("hades", "bossBullet2", (e, b) => {
			camShake(12)
			play("hurt", {
				volume: 0.3,
				speed: 1.0
			})
			e.hurt(1)
			destroy(b)
			updateHP()
		})
		k.collides("hades", "bossBullet3", (e, b) => {
			camShake(12)
			play("hurt", {
				volume: 0.3,
				speed: 1.0
			})
			e.hurt(1)
			destroy(b)
			updateHP()
		})
		k.collides("hades", "bossBullet4", (e, b) => {
			camShake(12)
			play("hurt", {
				volume: 0.3,
				speed: 1.0
			})
			e.hurt(1)
			destroy(b)
			updateHP()
		})
		k.collides("hades", "bossBullet5", (e, b) => {
			camShake(12)
			play("hurt", {
				volume: 0.3,
				speed: 1.0
			})
			e.hurt(1)
			destroy(b)
			updateHP()
		})
		k.collides("hades", "bossBullet6", (e, b) => {
			camShake(12)
			play("hurt", {
				volume: 0.3,
				speed: 1.0
			})
			e.hurt(1)
			destroy(b)
			updateHP()
		})
		k.collides("hades", "bossBullet7", (e, b) => {
			camShake(12)
			play("hurt", {
				volume: 0.3,
				speed: 1.0
			})
			e.hurt(1)
			destroy(b)
			updateHP()
		})

		k.loop(15,()=>{
			createEnemy()
		})

		k.loop(2,()=>{
			bossNormalAttack()
		})
		k.loop(2.5, () => {
			findNextSector(boss.pos.x, boss.pos.y)
				.then((data) => {
					randX = data.x
					randY = data.y
				})

			wait(1, () => {
					bossNormalAttack()
			})
			wait(2, () => {
					bossNormalAttack()
			})
		})

		player.action(() => {
			player.resolve()
		})

		loadMap()
	}

}