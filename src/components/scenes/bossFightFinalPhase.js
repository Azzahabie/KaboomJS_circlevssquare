import k from '../../kaboom.js'
import findHades from '../utils/findHades.js'
import findNextSector from '../utils/movementGuide.js'
import shootToSector from '../utils/checkSector.js'

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
k.loadSound("hurt", "./src/components/sounds/explosion.wav")
k.loadSound("secondphase", "./src/components/sounds/secondphase.mp3")

export default function bossFightFinalPhase(info) {
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
			solid,
			layers,
			layer,
			rgba,
			camPos,
			camScale,

		} = k

		let d = "up"
		let shootWhere = 0
		var randX = 0
		var randY = 0
		var doesBossMove = false

		

		const music = play("secondphase", {
			volume: 0.4,
		})

		music.play()

		const player = add([
			sprite("hades"),
			pos(info.hadesPosX, info.hadesPosY),
			scale(2),
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
			
		]);

		const healthCount = add([
			text(`${hp}`),
			pos(50, 100),
			color(rgba(1, 0, 0.3)),
			scale(2),
			layer("ui"),
			
		]);

		let boss = add([
			sprite("enemy3"),
			pos(info.bossX, info.bossY),
			scale(5),
			"boss",
			"reset",
			health(100),
			solid(),
		])
	
		function health(hp) {
			// these functions will directly assign to the game object
			return {
				hurt(n) {
					hp -= n;

					if (hp <= 0) {
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
			if (shootWhere == 1) {
				b.move(bDir.topLeftToBtmLeft.x, bDir.topLeftToBtmLeft.y)
			}
			if (shootWhere == 2) {
				b.move(bDir.topRightToBtmLeft.x, bDir.topRightToBtmLeft.y)
			}
			if (shootWhere == 3) {
				b.move(bDir.btmLeftToBtmRight.x, bDir.btmLeftToBtmRight.y)
			}
			if (shootWhere == 4) {
				b.move(bDir.btmRightToBtmLeft.x, bDir.btmRightToBtmLeft.y)
			}

			wait(1, () => {
				destroy(b)
			})

		})

		k.action("bossBullet1", (b) => {
			if (shootWhere == 1) {
				b.move(bDir.topLeftToBtmRight.x, bDir.topLeftToBtmRight.y)
			}
			if (shootWhere == 2) {
				b.move(bDir.topRightToBtmRight.x, bDir.topRightToBtmRight.y)
			}
			if (shootWhere == 3) {
				b.move(bDir.btmLeftToTopLeft.x, bDir.btmLeftToTopLeft.y)
			}
			if (shootWhere == 4) {
				b.move(bDir.btmRightToTopLeft.x, bDir.btmRightToTopLeft.y)
			}

			wait(1, () => {
				destroy(b)
			})
		})

		k.action("bossBullet2", (b) => {
			if (shootWhere == 1) {
				b.move(bDir.topLeftToTopRight.x, bDir.topLeftToTopRight.y)
			}
			if (shootWhere == 2) {
				b.move(bDir.topRightToTopLeft.x, bDir.topRightToTopLeft.y)
			}
			if (shootWhere == 3) {
				b.move(bDir.btmLeftToTopRight.x, bDir.btmLeftToTopRight.y)
			}
			if (shootWhere == 4) {
				b.move(bDir.btmRightToTopRight.x, bDir.btmRightToTopRight.y)
			}


			wait(1, () => {
				destroy(b)
			})
		})

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

		k.loop(2.5, () => {
			findNextSector(boss.pos.x, boss.pos.y)
				.then((data) => {
					randX = data.x
					randY = data.y
				})

			if (!doesBossMove) {
				doesBossMove = true
			}

			wait(2, () => {
				shootToSector(boss.pos.x, boss.pos.y)
					.then((data) => {
						shootWhere = data
					})
				doesBossMove = false
				bossNormalAttack()
				wait(0.5,()=>{

					bossNormalAttack()
				})
			})
		})

		player.action(() => {
			player.resolve()
		})

		loadMap()
	}

}