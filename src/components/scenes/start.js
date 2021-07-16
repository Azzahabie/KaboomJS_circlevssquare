import k from '../../kaboom.js'

k.loadSound("startMenuSound","./src/components/sounds/startMenuMusic.mp3")

export default function startScreen() {
	return () =>{
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
		
		var name = ""
		console.log(name.length);
		keyPress("enter", () => {
			if(name.length <= 0){
				window.alert("your name fucker!")
				return
			}
			music.pause()
			go("level1",name);
		})
		keyPress("backspace", () => {
			name = name.slice(0, -1);
			names.use(text(`Enter Your Name:\n\n${name}`))
		})
	
		charInput((ch) => {
			name = name + ch;
			names.use(text(`Enter Your Name:\n\n${name}`))
		});
	
		const names = add([
			text(`Enter Your Name:\n\n${name}`),
			pos(270, 400),
			color(rgba(1, 1, 1)),
			scale(2),
		]);
		const welcome = add([
			text(`WELCOME TO HADES`, 9),
			pos(250, 300),
			color(rgba(1, 1, 1)),
			scale(2),
		]);
		const enterToStart = add([
			text(`Press Enter To Start`, 10),
			pos(170, 600),
			color(rgba(1, 1, 1)),
			scale(2)
		]);
		
		
	
	}
	
}