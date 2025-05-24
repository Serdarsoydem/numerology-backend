// src/policies/is-profile-owner.ts
export default async (ctx, next) => {
  const profileId = ctx.params.id;
  const userId = ctx.state.user.id; // Assuming you're using Strapi's authentication

  // Fetch the profile with the associated user
  const profile = await strapi.query('api::profile.profile').findOne({
    where: { id: profileId },
    populate: ['user'], // Populate the user relation
  });

  // Check if the profile belongs to the current user
  if (profile.user.id !== userId) {
    return ctx.unauthorized('You are not authorized to access this profile.');
  }

  return next();
};
