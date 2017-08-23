
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('stock').del()
    .then(function () {
      // Inserts seed entries
      return knex('stock').insert([
        {
          id: 1,
          condition: 'Mint',
          price: 100.00,
          quantity:2,
          issue_id: 1
        },
        {
          id: 2,
          condition: 'Poor',
          price: 3.50,
          quantity:6,
          issue_id: 1
        },
        {
          id: 3,
          condition: 'Fine',
          price: 10.11,
          quantity: 21,
          issue_id: 1
        },
        {
          id: 4,
          condition: 'Near Mint',
          price: 40.50,
          quantity:6,
          issue_id: 2
        },
        {
          id: 5,
          condition: 'Very Good',
          price: 20.50,
          quantity:3,
          issue_id: 2
        },
        {
          id: 6,
          condition: 'Good',
          price: 10.50,
          quantity:6,
          issue_id: 2
        },
        {
          id: 7,
          condition: 'Near Mint',
          price: 40.50,
          quantity: 2,
          issue_id: 3
        },
        {
          id: 8,
          condition: 'Mint',
          price: 30.50,
          quantity: 1,
          issue_id: 3
        },
        {
          id: 9,
          condition: 'Mint',
          price: 30.50,
          quantity: 1,
          issue_id: 4
        },
        {
          id: 10,
          condition: 'Fair',
          price: 310.50,
          quantity: 12,
          issue_id: 4
        }


      ]);
    })
    .then(function(){
      return knex.raw("SELECT setval('stock_id_seq', (SELECT MAX(id) FROM stock));");
    });
};
