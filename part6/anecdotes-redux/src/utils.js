import { doNotice, doNoticeClear } from './reducers/notificationReducer'

export const notification = (store, message) => {
	store.dispatch(doNotice(message))
    setTimeout(() => { store.dispatch(doNoticeClear()) }, 5000)
}