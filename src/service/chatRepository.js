import { firebaseDatabase } from './firebase';

class ChatRepository {
  sendChat(message) {
    firebaseDatabase.ref(`user1/messages/${message.createdAt}`).set(message);
  }

  // viewChat() {
  //   const ref = firebaseDatabase.ref('user1/messages');
  //   ref.on('value', (snapshot) => {
  //     const value = snapshot.val();
  //     console.log(value);
  //   });
  // }
}

export default ChatRepository;
