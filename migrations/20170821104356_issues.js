exports.up = function(knex, Promise) {
  return knex.schema.createTable("issues", function (table) {
  table.increments('id');
  table.integer('series_id').references('series.id').notNullable().onDelete('cascade');
  table.integer('number');
  table.string('cover_image').defaultTo('https://s3.us-east-2.amazonaws.com/mixitupcomicimages/logo.jpg');
  table.date('pub_date');
  table.boolean('ebay').defaultTo(false);
  table.boolean('shopify').defaultTo(false);
});

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("issues");
};
