import k from '../../kaboom.js'

export default function level1() {
    const {
		add,
		pos,
		text,
		color,
		origin,
		width,
		height,
		keyPress,
		go
	} = k

	add([
		pos(width() * 0.5, height() * 0.5),
		text('Level 1', 24),
		color(1, 0, 0, 1),
		origin('center')
	])


}