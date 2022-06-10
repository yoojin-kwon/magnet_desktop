import { firebaseDatabase } from './firebase';

class ChannelRepository {
  getChannelMember(channelId) {
    const ref = firebaseDatabase.ref(`channels/${channelId}/members`);
    return ref.get();
  }

  getChannelList(setChannels) {
    firebaseDatabase.ref('channels').on('value', (snapshot) => {
      const value = snapshot.val();
      value && setChannels(Object.values(value));
    });
  }

  makeChannel(channel) {
    return firebaseDatabase.ref(`channels/${channel.createdAt}`).set(channel);
  }

  joinChannel(channelId, memberInfo) {
    const ref = firebaseDatabase.ref(`channels/${channelId}/members`);
    return ref.push(memberInfo);
  }
}

export default ChannelRepository;
