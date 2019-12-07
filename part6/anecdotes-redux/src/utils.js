export const notification = ({ doNotice, doNoticeClear }, message) => {
	doNotice(message)
    setTimeout(() => { doNoticeClear() }, 5000)
}