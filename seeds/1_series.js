
exports.seed = function(knex, Promise) {
  return knex('series')
  .del()
  .then(function () {
      return knex('series').insert([
        {
          id: 1,
          title: "The Walking Dead",
          volume: 1
        },
        {
          id: 2,
          title: "The Amory Wars",
          volume: 1
        }
      ]);
  })
  .then(function(){
      return knex.raw("SELECT setval('series_id_seq', (SELECT MAX(id) FROM series));");
    });
};
