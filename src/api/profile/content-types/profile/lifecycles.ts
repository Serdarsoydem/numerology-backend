
interface EventParams {
  data: any;
  where: any;
  select?: any;
  populate?: any;
}

interface Event {
  params: EventParams;
  state: {
    user: {
      id: number;
    };
  };
}

export default {
  beforeCreate(event: Event) {
    //console.log('beforeCreate', event);
    const { data } = event.params;

    // Get the current user from the admin store
    const userInfo = strapi.requestContext.get()?.state?.auth?.credentials;
    console.log("userInfo", userInfo);

    // Set the admin_user field to the current user's id
    if (userInfo && userInfo.id) {
      data.admin_user = userInfo.id;
    }
  },

};
