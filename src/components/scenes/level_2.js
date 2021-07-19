import k from '../../kaboom.js'
import findHades from '../utils/findHades.js'
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
k.loadSound("levelTwoMusic", "./src/components/sounds/level2.mp3")

export default function levelTwo(info) {
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
			rgba,
			get
		} = k

		let d = "up"

		const music = play("levelTwoMusic", {
			volume: 0.6,
			detune: -100
		})
		music.play()
		const player = add([
			sprite("hades"),
			pos(200, 200),
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
		var hp = player.hp()
		let wave = 20

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
		const waveCount = add([
			text(`Wave :${wave}`, 8),
			pos(275, 50),
			color(rgba(1, 0, 0.3)),
			scale(2),
			layer("ui"),
			"wave"
		]);

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
		function updateScore() {
			score++
			scoreCount.use(text(`${score}`))
		}
		function updateHP() {
			hp--
			healthCount.use(text(`${hp}`))
		}
		function updateWave() {
			wave--
			if (wave <= 0) {
				wave = 0
				waveCount.use(text(`Wave :${wave}`, 8))
			} else {
				waveCount.use(text(`Wave :${wave}`, 8))
			}

		}

		function loadMap() {
			let topWall = add([
				sprite("hello"),
				solid(),
				pos(0, 0)
			])
			let botWall = add([
				sprite("hello"),
				solid(),
				pos(0, 790)
			])
			let leftWall = add([
				sprite("vWall"),
				solid(),
				pos(790, 0)
			])
			let rightWall = add([
				sprite("vWall"),
				solid(),
				pos(0, 7)
			])
		}
		function createEnemy() {
			let enmy = [
				sprite("enemy"),
				pos(rand(vec2(0), vec2(790))),
				scale(3),
				"enemy",
				"reset",
				health(4),
				solid(),
			]
			add(enmy)
		}

		function createEnemy2() {
			let enmy2 = [
				sprite("enemy2"),
				pos(rand(vec2(0), vec2(790))),
				scale(2),
				"enemy2",
				"reset",
				health(2),
				solid(),
			]
			add(enmy2)
		}

		function createEnemy3() {
			let enmy3 = [
				sprite("enemy3"),
				pos(rand(vec2(10), vec2(790))),
				scale(2),
				"enemy3",
				"reset",
				health(2),
				solid(),
			]
			add(enmy3)
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

		k.keyPress("enter", () => {
			go("levelTwoPointFive", ({
				theScore: score,
				theHp: hp,
				theName: info.name,
				theMusic : music
			}));
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
		k.action("reset",(r)=>{
			if (r.pos.x > 790 || r.pos.x < 0 || r.pos.y > 790 || r.pos.y < 0){
				destroy(r)
			}
		})
		k.action("enemy", (e) => {
			findHades(player.pos.x, player.pos.y, e.pos.x, e.pos.y)
				.then((data) => {
					e.move(data.x, data.y)
				})
			e.resolve()
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
				k.action("reset",(r)=>{
			if (r.pos.x > 790 || r.pos.x < 0 || r.pos.y > 790 || r.pos.y < 0){
				destroy(r)
			
			}
		})
		k.collides("enemy", "bullet", (e, b) => {
			e.hurt(1)
			destroy(b)
			updateScore()
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
		player.action(() => {
			player.resolve()
		})

		loadMap()

			k.loop(4, () => {
				if (wave == 10) {
					k.loop(2, () => {
						var arr = get("reset")
						if (arr.length == 0) {
							go("levelTwoPointFive", {
								theScore: score,
								theHp: hp,
								theName: info.name,
								theMusic : music
							}
							)
						}
					})
					
				} else {
					createEnemy()
					createEnemy2()
					createEnemy3()
					updateWave()
				}
			})

	}
}



