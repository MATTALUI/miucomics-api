exports.up = function(knex, Promise) {
  return knex.schema.createTable("series", function (table) {
  table.increments('id');
  table.integer('volume');
});

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("series");
};
