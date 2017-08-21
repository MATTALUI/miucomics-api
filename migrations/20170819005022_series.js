exports.up = function(knex, Promise) {
  return knex.schema.createTable("series", function (table) {
  table.increments('id');
  table.string('title').notNullable().defaultTo('');
  table.integer('issue_number').notNullable().defaultTo('');
  table.integer('series_number');
  table.date('pub_date');
  table.string('cover_image');
  table.boolean('ebay').defaultTo(false);
  table.boolean('shopify').defaultTo(false);
});

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("series");
};
