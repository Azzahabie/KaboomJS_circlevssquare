import k from '../../kaboom.js'

k.loadSound("died", "./src/components/sounds/died.mp3")
k.loadSound("win", "./src/components/sounds/winMusic.mp3")

export default function startScreen() {

	return (info) => {
		console.log(info);
		var gameContainer = document.getElementById("game-container");
		gameContainer.style.backgroundColor = "black"
		const {
			add,
			pos,
			color,
			go,
			play,
			scale,
			text,
			rgba,
		} = k

		const yourScore = add([
			text(`Score`),
			pos(335, 360),
			color(rgba(1, 1, 1)),
			scale(2),
		]);
		const score = add([
			text(`${info.theScore}`),
			pos(364, 390),
			color(rgba(1, 1, 1)),
			scale(2),
		]);
		var music

		if (info.outcome) {
			music = play("win")
			music.play()
			const outcome = add([
				text(`You Won!`, 9),
				pos(320, 300),
				color(rgba(1, 1, 1)),
				scale(2),
			]);
		} else {
			music = play("died")
			music.play()
			const outcome = add([
				text(`You Died`, 9),
				pos(314, 300),
				color(rgba(1, 0.1, 0)),
				scale(2),
			]);
		}

		const restart = add([
			text(`Press R To Restart`),
			pos(256, 460),
			color(rgba(1, 1, 1)),
			scale(2),
		]);
		const save = add([
			text(`Press Enter To Save Score`),
			pos(195, 500),
			color(rgba(1, 1, 1)),
			scale(2),
		]);

		k.keyPress("r", () => {
			music.pause()
			go("startScreen")
		})
		k.keyPress("enter", () => {
			music.pause()
			let data = {
				username : info.theName,
				score : info.theScore
			}
			fetch('https://desolate-citadel-26138.herokuapp.com/updateScore', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data)
			})
			.then(()=>{
				alert("score added")
				go("startScreen")
			})
			.catch(()=>{
				alert("failed to add score")
			})		
		})
	}

}