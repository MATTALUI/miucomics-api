exports.up = function(knex, Promise) {
  return knex.schema.createTable("stock", function (table) {
  table.increments('id').notNullable();
  table.string('condition').notNullable();
  table.float('price').defaultTo(0.00);
  table.integer('quantity').defaultTo(0);
  table.integer('issue_id').references('issues.id').notNullable().onDelete('cascade');
  table.integer('shopify_id').defaultTo(null);
});

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("stock");
};
