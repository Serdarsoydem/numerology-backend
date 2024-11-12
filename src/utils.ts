
export async function findResourceBySlug(entity : string, slug : string, populate : string[]) {
  return strapi.db.query(`api::${entity}.${entity}`).findOne({
    where: { slug },
    populate,
  });
}
