import k from './kaboom.js'
import randomPos from './components/utils/generateEnemyPos.js'
import findHades from './components/utils/findHades.js'

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
k.loadSprite("hades", "./src/sprites/friendly/hades.png")
k.loadSprite("bullet", "./src/sprites/world/bullet.png")
k.loadSprite("enemy", "./src/sprites/enemy/enemy.png")
k.loadSprite("enemy2", "./src/sprites/enemy/enemy2.png")
k.loadSprite("enemy3", "./src/sprites/enemy/enemy3.png")
k.loadSound("shoot","./src/components/sounds/shoot.wav")


k.scene("main", () => {
	const {
		add,
		pos,
		rect,
		color,
		origin,
		overlaps,
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
		resolve
	} = k

	let d = "up"
	const player = add([
		sprite("hades"),
		pos(200, 200),
		scale(2),
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

	function moveBullet(direction) {

		return {
			fuck(direction) {
				this.move(200,200)
			},
			heal(n) {
				hp += n;
			},
			hp() {
				return hp;
			},
		};
	}
	
	function createEnemy() {
		let enmy = [
			sprite("enemy"),
			pos(rand(vec2(0), vec2(800))),
			scale(2),
			"enemy",
			health(2),
			solid(),
		]
		add(enmy)
	}

	function createEnemy2() {
		let enmy2 = [
			sprite("enemy2"),
			pos(rand(vec2(0), vec2(800))),
			scale(2),
			"enemy2",
			health(2),
			solid(),
		]
		add(enmy2)
	}

	function createEnemy3() {
		let enmy3 = [
			sprite("enemy3"),
			pos(rand(vec2(0), vec2(800))),
			scale(2),
			"enemy3",
			health(2),
			solid(),
		]
		add(enmy3)
	}

	function createBullet(direction) {

		let b = [
			sprite("bullet"),
			pos(player.pos.x, player.pos.y),
			"bullet",
			{
				wDirection: direction
			},
			moveBullet()
		]
		return new Promise(function(resolve,reject){
			resolve(b)
		})

	}
	k.keyPress("down", () => {
		d = "down"
	})
	k.keyPress("up", () => {
		d = "up"
	})
	k.keyPress("c", () => {
		crashFunction()
	})
	k.keyPress("left", () => {
		d = "left"
	})
	k.keyPress("right", () => {
		d = "right"
	})
	k.keyDown("down", () => {
		player.move(0, 200)
	});
	k.keyDown("up", () => {
		player.move(0, -200)
	});
	k.keyDown("left", () => {
		player.move(-200, 0)
	});
	k.keyDown("right", () => {
		player.move(200, 0)
	});
	k.keyPress("space", () => {
		
		play("shoot",{
			volume:1.0,
			speed:1.0
		})
		createBullet(d)
		.then((data)=>{
			console.log(data);
		})
	});

	k.keyPress("enter", () => {
	});
	
	k.action("bullet", (r) => {
		// let x = r.wDirection
		// if (x == "down") {
			
		// 	r.move(0, 500)
		// }
		// if (x == "up") {
			
		// 	r.move(0, -500)
		// }
		// if (x == "left") {
			
		// 	r.move(-500, 0)
		// }
		// if (x == "right") {
			
		// 	r.move(500, 0)
		// }
		// wait(0.5, () => {
		// 	destroy(r)
		// })
	})

	k.action("enemy",(e)=>{
		findHades(player.pos.x,player.pos.y,e.pos.x,e.pos.y)
		.then((data)=> {
			e.move(data.x,data.y)
		})
		e.resolve()
	})
	k.action("enemy2",(e)=>{
		findHades(player.pos.x,player.pos.y,e.pos.x,e.pos.y)
		.then((data)=> {
			e.move(data.x,data.y)
		})
		e.resolve()
	})
	k.action("enemy3",(e)=>{
		findHades(player.pos.x,player.pos.y,e.pos.x,e.pos.y)
		.then((data)=> {
			e.move(data.x,data.y)
		})
		e.resolve()
	})

	k.collides("enemy", "bullet", (e, b) => {
		e.hurt(1)
		destroy(b)
	})
	k.collides("enemy2", "bullet", (e, b) => {
		e.hurt(1)
		destroy(b)
	})
	k.collides("enemy3", "bullet", (e, b) => {
		e.hurt(1)
		destroy(b)
	})
	k.loop(5, () => {
		createEnemy()
		createEnemy2()
		createEnemy3()
	})
	

});


k.start("main")

