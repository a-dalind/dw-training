export default function (state=null, action) {
	// console.log('action.type', action.type);
	switch (action.type) {
		case 'SHOW_SIDE_MENU':
			return action.payload;
		default:
			return state;
	}
}