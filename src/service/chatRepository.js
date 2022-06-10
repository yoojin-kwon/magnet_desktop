import { firebaseDatabase } from './firebase';

class ChatRepository {
  sendChat(id, message) {
    return firebaseDatabase.ref(`channels/${id}/chat`).push(message);
  }

  showChat(id, category, setItem) {
    firebaseDatabase
      .ref(`channels/${id}`)
      .child(category)
      .on('value', (snapshot) => {
        const value = snapshot.val();
        setItem(Object.values(value));
      });
  }
}

export default ChatRepository;
