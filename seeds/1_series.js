
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
        },
        {
          id:3,
          title: "Flat Track Furies",
          volume: 1
        },
        {
          id:4,
          title: "Alpha Flight",
          volume: 1
        },
        {
          id:5,
          title: "Alpha Flight",
          volume: 2
        },
        {
          id:6,
          title: "X-Men",
          volume: 1
        }
      ]);
  })
  .then(function(){
      return knex.raw("SELECT setval('series_id_seq', (SELECT MAX(id) FROM series));");
    });
};
