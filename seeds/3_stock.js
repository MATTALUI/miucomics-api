
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('stock').del()
    .then(function () {
      // Inserts seed entries
      return knex('stock').insert([
 {condition: 'Mint', issue_id: 1, quantity: 3, price: 4.99 },
        { condition: 'Near Mint', issue_id: 1, quantity: 0, price: 0 },
        { condition: 'Very Fine', issue_id: 1, quantity: 1, price: 2.33 },
        { condition: 'Fine', issue_id: 1, quantity: 0, price: 0 },
        { condition: 'Very Good', issue_id: 1, quantity: 0, price: 0 },
        {condition: 'Good', issue_id: 1, quantity: 0, price: 0 },
        {condition: 'Fair', issue_id: 1, quantity: 0, price: 0 },
        { condition: 'Poor', issue_id: 1, quantity: 1, price: 1.06 },



        { condition: 'Mint', issue_id: 2, quantity: 45, price: 1 },
        { condition: 'Near Mint', issue_id: 2, quantity: 0, price: 0 },
        { condition: 'Very Fine', issue_id: 2, quantity: 0, price: 2 },
        { condition: 'Fine', issue_id: 2, quantity: 0, price: 0 },
        { condition: 'Very Good', issue_id: 2, quantity: 0, price: 0 },
        { condition: 'Good', issue_id: 2, quantity: 0, price: 0 },
        { condition: 'Fair', issue_id: 2, quantity: 0, price: 0 },
        { condition: 'Poor', issue_id: 2, quantity: 1, price: .99 },



        { condition: 'Mint', issue_id: 3, quantity: 2, price: 3.07 },
        { condition: 'Near Mint', issue_id: 3, quantity: 0, price: 0 },
        { condition: 'Very Fine', issue_id: 3, quantity: 0, price: 2 },
        { condition: 'Fine', issue_id: 3, quantity: 4, price: 2.56 },
        { condition: 'Very Good', issue_id: 3, quantity: 0, price: 0 },
        { condition: 'Good', issue_id: 3, quantity: 0, price: 0 },
        { condition: 'Fair', issue_id: 3, quantity: 5, price: .45 },
        { condition: 'Poor', issue_id: 3, quantity: 0, price: 0 },



        { condition: 'Mint', issue_id: 4, quantity: 0, price: 0 },
        { condition: 'Near Mint', issue_id: 4, quantity: 0, price: 0 },
        { condition: 'Very Fine', issue_id: 4, quantity: 1, price: 2 },
        { condition: 'Fine', issue_id: 4, quantity: 0, price: 0 },
        { condition: 'Very Good', issue_id: 4, quantity: 0, price: 0 },
        { condition: 'Good', issue_id: 4, quantity: 0, price: 0 },
        { condition: 'Fair', issue_id: 4, quantity: 0, price: 0 },
        { condition: 'Poor', issue_id: 4, quantity: 8, price: 4.65 },



        { condition: 'Mint', issue_id: 5, quantity: 45, price: 1 },
        { condition: 'Near Mint', issue_id: 5, quantity: 0, price: 0 },
        { condition: 'Very Fine', issue_id: 5, quantity: 0, price: 2 },
        { condition: 'Fine', issue_id: 5, quantity: 0, price: 0 },
        { condition: 'Very Good', issue_id: 5, quantity: 0, price: 0 },
        { condition: 'Good', issue_id: 5, quantity: 0, price: 0 },
        { condition: 'Fair', issue_id: 5, quantity: 0, price: 0 },
        { condition: 'Poor', issue_id: 5, quantity: 1, price: .99 },



        { condition: 'Mint', issue_id: 6, quantity: 45, price: 1 },
        { condition: 'Near Mint', issue_id: 6, quantity: 0, price: 0 },
        { condition: 'Very Fine', issue_id: 6, quantity: 0, price: 2 },
        { condition: 'Fine', issue_id: 6, quantity: 0, price: 0 },
        { condition: 'Very Good', issue_id: 6, quantity: 0, price: 0 },
        { condition: 'Good', issue_id: 6, quantity: 0, price: 0 },
        { condition: 'Fair', issue_id: 6, quantity: 0, price: 0 },
        { condition: 'Poor', issue_id: 6, quantity: 1, price: .99 },



        { condition: 'Mint', issue_id: 7, quantity: 45, price: 1 },
        { condition: 'Near Mint', issue_id: 7, quantity: 0, price: 0 },
        { condition: 'Very Fine', issue_id: 7, quantity: 0, price: 2 },
        { condition: 'Fine', issue_id: 7, quantity: 0, price: 0 },
        { condition: 'Very Good', issue_id: 7, quantity: 0, price: 0 },
        { condition: 'Good', issue_id: 7, quantity: 0, price: 0 },
        { condition: 'Fair', issue_id: 7, quantity: 0, price: 0 },
        { condition: 'Poor', issue_id: 7, quantity: 1, price: .99 },



        { condition: 'Mint', issue_id: 8, quantity: 45, price: 1 },
        { condition: 'Near Mint', issue_id: 8, quantity: 0, price: 0 },
        { condition: 'Very Fine', issue_id: 8, quantity: 0, price: 2 },
        { condition: 'Fine', issue_id: 8, quantity: 0, price: 0 },
        { condition: 'Very Good', issue_id: 8, quantity: 0, price: 0 },
        { condition: 'Good', issue_id: 8, quantity: 0, price: 0 },
        { condition: 'Fair', issue_id: 8, quantity: 0, price: 0 },
        { condition: 'Poor', issue_id: 8, quantity: 1, price: .99 },



        { condition: 'Mint', issue_id: 9, quantity: 45, price: 1 },
        { condition: 'Near Mint', issue_id: 9, quantity: 0, price: 0 },
        { condition: 'Very Fine', issue_id: 9, quantity: 0, price: 2 },
        { condition: 'Fine', issue_id: 9, quantity: 0, price: 0 },
        { condition: 'Very Good', issue_id: 9, quantity: 0, price: 0 },
        { condition: 'Good', issue_id: 9, quantity: 0, price: 0 },
        { condition: 'Fair', issue_id: 9, quantity: 0, price: 0 },
        { condition: 'Poor', issue_id: 9, quantity: 1, price: .99 },



        { condition: 'Mint', issue_id: 10, quantity: 45, price: 1 },
        { condition: 'Near Mint', issue_id: 10, quantity: 0, price: 0 },
        { condition: 'Very Fine', issue_id: 10, quantity: 0, price: 2 },
        { condition: 'Fine', issue_id: 10, quantity: 0, price: 0 },
        { condition: 'Very Good', issue_id: 10, quantity: 0, price: 0 },
        { condition: 'Good', issue_id: 10, quantity: 0, price: 0 },
        { condition: 'Fair', issue_id: 10, quantity: 0, price: 0 },
        { condition: 'Poor', issue_id: 10, quantity: 1, price: .99 },



        { condition: 'Mint', issue_id: 11, quantity: 45, price: 1 },
        { condition: 'Near Mint', issue_id: 11, quantity: 0, price: 0 },
        { condition: 'Very Fine', issue_id: 11, quantity: 0, price: 2 },
        { condition: 'Fine', issue_id: 11, quantity: 0, price: 0 },
        { condition: 'Very Good', issue_id: 11, quantity: 0, price: 0 },
        { condition: 'Good', issue_id: 11, quantity: 0, price: 0 },
        { condition: 'Fair', issue_id: 11, quantity: 0, price: 0 },
        { condition: 'Poor', issue_id: 11, quantity: 1, price: .99 },



        { condition: 'Mint', issue_id: 12, quantity: 0, price: 0 },
        { condition: 'Near Mint', issue_id: 12, quantity: 0, price: 0 },
        { condition: 'Very Fine', issue_id: 12, quantity: 0, price: 0 },
        { condition: 'Fine', issue_id: 12, quantity: 0, price: 0 },
        { condition: 'Very Good', issue_id: 12, quantity: 0, price: 0 },
        { condition: 'Good', issue_id: 12, quantity: 0, price: 0 },
        { condition: 'Fair', issue_id: 12, quantity: 0, price: 0 },
        { condition: 'Poor', issue_id: 12, quantity: 0, price: 0 },

        { condition: 'Mint', issue_id: 13, quantity: 0, price: 0 },
        { condition: 'Near Mint', issue_id: 13, quantity: 0, price: 0 },
        { condition: 'Very Fine', issue_id: 13, quantity: 0, price: 0 },
        { condition: 'Fine', issue_id: 13, quantity: 0, price: 0 },
        { condition: 'Very Good', issue_id: 13, quantity: 0, price: 0 },
        { condition: 'Good', issue_id: 13, quantity: 0, price: 0 },
        { condition: 'Fair', issue_id: 13, quantity: 0, price: 0 },
        { condition: 'Poor', issue_id: 13, quantity: 0, price: 0 },
      ]);
    })
    .then(function(){
      return knex.raw("SELECT setval('stock_id_seq', (SELECT MAX(id) FROM stock));");
    });
};
