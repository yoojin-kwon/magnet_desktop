import { firebaseDatabase } from './firebase';

class ChatRepository {
  sendChat(id, message) {
    return firebaseDatabase.ref(`channels/${id}/chat`).push(message);
  }

  showChat(id, category, update) {
    firebaseDatabase
      .ref(`channels/${id}`)
      .child(category)
      .on('value', (snapshot) => {
        const value = snapshot.val();
        update(Object.values(value));
      });
  }
}

export default ChatRepository;
