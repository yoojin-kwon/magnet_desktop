import { firebaseDatabase } from './firebase';

class ChannelRepository {
  getChannelMember(channelId) {
    const ref = firebaseDatabase.ref(`channels/${channelId}/members`);
    return ref.get();
  }

  getChannelList(update) {
    firebaseDatabase.ref('channels').on('value', (snapshot) => {
      const value = snapshot.val();
      value && update(Object.values(value));
    });
  }

  makeChannel(channel) {
    return firebaseDatabase.ref(`channels/${channel.createdAt}`).set(channel);
  }

  joinChannel(channelId, memberInfo) {
    const ref = firebaseDatabase.ref(`channels/${channelId}/members`);
    return ref.push(memberInfo);
  }

  checkJoin(channel, update, user) {
    firebaseDatabase
      .ref(`channels/${channel.createdAt}/members`)
      .on('value', (snapshot) => {
        const userId = Object.values(snapshot.val()).map((el) => el.userId);
        update(userId.includes(user));
      });
  }
}

export default ChannelRepository;
