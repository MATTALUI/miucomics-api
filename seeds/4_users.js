
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          username: 'mixitup',
          password: '$2a$10$OqzXjvs60XwMBC3v.UyoWe64wkcyto/XcnDWlb3Qa/bQme4yNX/Z6',
          admin: true
        },
        {
          username: 'matt',
          password: '$2a$10$OqzXjvs60XwMBC3v.UyoWe64wkcyto/XcnDWlb3Qa/bQme4yNX/Z6',
          admin: true
        }
      ])
      .then(function(){
          return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
        });
    });
};
