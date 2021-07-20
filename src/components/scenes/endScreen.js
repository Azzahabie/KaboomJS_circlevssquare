import k from '../../kaboom.js'

k.loadSound("startMenuSound","./src/components/sounds/startMenuMusic.mp3")

export default function startScreen(info) {
	return (info) =>{
		console.log(info);

		const {
			add,
			pos,
			color,
			go,
			play,
			scale,
			text,
			keyPress,
			charInput,
			rgba,
		} = k
	
		
		const music = play("startMenuSound");
		music.detune(-200)
		music.play()
		

	
		const score = add([
			text(`Your Score:\n\n${info.theScore}`),
			pos(270, 400),
			color(rgba(1, 1, 1)),
			scale(2),
		]);
		const outcome = add([
			text(`You ${info.outcome}`, 9),
			pos(250, 300),
			color(rgba(1, 1, 1)),
			scale(2),
		]);
		const enterToStart = add([
			text(`${info.theName}`, 10),
			pos(170, 600),
			color(rgba(1, 1, 1)),
			scale(2)
		]);
		
		
	
	}
	
}