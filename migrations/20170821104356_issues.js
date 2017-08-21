exports.up = function(knex, Promise) {
  return knex.schema.createTable("series", function (table) {
  table.increments('id');
  table.integer('number');
  table.string('cover_image');
  table.date('pub_date');
  table.boolean('ebay');
  table.boolean('shopify');
});

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("series");
};
