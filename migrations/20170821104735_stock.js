exports.up = function(knex, Promise) {
  return knex.schema.createTable("stock", function (table) {
  table.increments('id');
  table.string('condition');
  table.float('price').defaultTo(0.00);
  table.integer('quantity').defaultTo(0);
  table.integer('issue_id').references('issues.id').notNullable().onDelete('cascade');
});

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("stock");
};
