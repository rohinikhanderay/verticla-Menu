import io from 'socket.io-client'
import { API_URL } from '../../../src/store/API_URL'
export const connection = () => {
  return io(API_URL, {
    transports: ['websocket'],
    upgrade: false,
    reconnection: true,
    reconnectionDelay: 5000,
    reconnectionAttempts: Infinity,
  })
}
