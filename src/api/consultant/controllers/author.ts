/**
 * A set of functions called "actions" for `consultant`
 */

export default {
   find: async (ctx) => {
     try {
       // Fetch users with the "authors" role
       const authors = await strapi.query('admin::user').findMany({
         where: {
           roles: {
             name: 'Consultant', // Filter by the "authors" role
           },
         },
         select: ['firstname', 'lastname', 'email',"id"],
         populate: ['roles'], // Populate roles if needed
       });

       // Fetch all profiles
       const profiles = await strapi.query('api::profile.profile').findMany({
         populate: ['image','admin_user'],
       });
       console.log("profiles",profiles);

      // Map authors and add their profile images
       const authorsWithProfiles = await Promise.all(authors.map(async (author) => {
         // Find the matching profile for this author
         const userProfile = profiles.find(profile =>
           profile.admin_user && profile.admin_user.id === author.id
         );

         // Add the image to the author object if profile exists
         return {
           ...author,
           image: userProfile?.image || null,
           summary: userProfile?.summary || null,
           experience: userProfile?.experience || null,
         };
       }));

       // Return the filtered users
       ctx.send(authorsWithProfiles);
     } catch (error) {
       ctx.throw(500, error.message);
     }

   }
};
