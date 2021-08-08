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
			loop,
			wait
		} = k
	
		
		const music = play("startMenuSound");
		music.volume(0.4)
		music.play()
		
		var name = ''
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
			username.use(text(`${name}`))
		})
	
		charInput((ch) => {
			if(ch == " "){
				ch = "_"
			}
			if(name.length >= 8){
				return
			}
			name = name + ch;
			username.use(text(`${name}`))
		});
	
		const names = add([
			text(`Enter Your Name${name}`),
			pos(275, 400),
			color(rgba(1, 1, 1)),
			scale(2),
		]);
		const username = add([
			text(`${name}`),
			pos(335, 430),
			color(rgba(1, 1, 1)),
			scale(2),
		]);
		const welcome = add([
			text(`circle VS square`, 9),
			pos(256, 300),
			color(rgba(1, 1, 1)),
			scale(2),
		]);
		const enterToStart = add([
			text(`Press Enter To Start`, 10),
			pos(210, 600),
			color(rgba(1, 1, 1)),
			scale(2)
		]);
		
		loop(1.5,()=>{
			wait(1,()=>{
				enterToStart.use(color(0,0,0))
			})
				enterToStart.use(color(rgba(1, 1, 1)))
		})
	
	}
	
}