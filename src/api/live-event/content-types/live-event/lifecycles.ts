// src/api/meeting/content-types/meeting/lifecycles.js
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    if (!data.jitsiRoomId) {
      const roomId = uuidv4(); // or slugify(data.title)
      data.jitsiRoomId = roomId;
      data.roomLink = `https://meet.jit.si/${roomId}`;
    }
  },
};
