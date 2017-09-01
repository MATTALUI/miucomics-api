
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('stock').del()
    .then(function () {
      // Inserts seed entries
      return knex('stock').insert([
        { id:1, condition: 'Mint', issue_id: 1, quantity: 3, price: 4.99 },
        { id:2, condition: 'Near Mint', issue_id: 1, quantity: 0, price: 0 },
        { id:3, condition: 'Very Fine', issue_id: 1, quantity: 1, price: 2.33 },
        { id:4, condition: 'Fine', issue_id: 1, quantity: 0, price: 0 },
        { id:5, condition: 'Very Good', issue_id: 1, quantity: 0, price: 0 },
        { id:6,condition: 'Good', issue_id: 1, quantity: 0, price: 0 },
        { id:7,condition: 'Fair', issue_id: 1, quantity: 0, price: 0 },
        { id:8, condition: 'Poor', issue_id: 1, quantity: 1, price: 1.06 },



        { id:9,condition: 'Mint', issue_id: 2, quantity: 45, price: 1 },
        { id:10,condition: 'Near Mint', issue_id: 2, quantity: 0, price: 0 },
        { id:11,condition: 'Very Fine', issue_id: 2, quantity: 0, price: 2 },
        { id:12,condition: 'Fine', issue_id: 2, quantity: 0, price: 0 },
        { id:13,condition: 'Very Good', issue_id: 2, quantity: 0, price: 0 },
        { id:14,condition: 'Good', issue_id: 2, quantity: 0, price: 0 },
        { id:15,condition: 'Fair', issue_id: 2, quantity: 0, price: 0 },
        { id:16,condition: 'Poor', issue_id: 2, quantity: 1, price: .99 },



        { id:17,condition: 'Mint', issue_id: 3, quantity: 2, price: 3.07 },
        { id:18,condition: 'Near Mint', issue_id: 3, quantity: 0, price: 0 },
        { id:19,condition: 'Very Fine', issue_id: 3, quantity: 0, price: 2 },
        { id:20,condition: 'Fine', issue_id: 3, quantity: 4, price: 2.56 },
        { id:21,condition: 'Very Good', issue_id: 3, quantity: 0, price: 0 },
        { id:22,condition: 'Good', issue_id: 3, quantity: 0, price: 0 },
        { id:23,condition: 'Fair', issue_id: 3, quantity: 5, price: .45 },
        { id:24,condition: 'Poor', issue_id: 3, quantity: 0, price: 0 },



        { id:25,condition: 'Mint', issue_id: 4, quantity: 0, price: 0 },
        { id:26,condition: 'Near Mint', issue_id: 4, quantity: 0, price: 0 },
        { id:27,condition: 'Very Fine', issue_id: 4, quantity: 1, price: 2 },
        { id:28,condition: 'Fine', issue_id: 4, quantity: 0, price: 0 },
        { id:29,condition: 'Very Good', issue_id: 4, quantity: 0, price: 0 },
        { id:30,condition: 'Good', issue_id: 4, quantity: 0, price: 0 },
        { id:31,condition: 'Fair', issue_id: 4, quantity: 0, price: 0 },
        { id:32,condition: 'Poor', issue_id: 4, quantity: 8, price: 4.65 },



        { id:33,condition: 'Mint', issue_id: 5, quantity: 45, price: 1 },
        { id:34,condition: 'Near Mint', issue_id: 5, quantity: 0, price: 0 },
        {id:35, condition: 'Very Fine', issue_id: 5, quantity: 0, price: 2 },
        { id:36,condition: 'Fine', issue_id: 5, quantity: 0, price: 0 },
        { id:37,condition: 'Very Good', issue_id: 5, quantity: 0, price: 0 },
        {id:38, condition: 'Good', issue_id: 5, quantity: 0, price: 0 },
        { id:39,condition: 'Fair', issue_id: 5, quantity: 0, price: 0 },
        { id:40,condition: 'Poor', issue_id: 5, quantity: 1, price: .99 },



        { id:41,condition: 'Mint', issue_id: 6, quantity: 45, price: 1 },
        { id:42,condition: 'Near Mint', issue_id: 6, quantity: 0, price: 0 },
        { id:43,condition: 'Very Fine', issue_id: 6, quantity: 0, price: 2 },
        { id:44,condition: 'Fine', issue_id: 6, quantity: 0, price: 0 },
        { id:45,condition: 'Very Good', issue_id: 6, quantity: 0, price: 0 },
        { id:46,condition: 'Good', issue_id: 6, quantity: 0, price: 0 },
        { id:47,condition: 'Fair', issue_id: 6, quantity: 0, price: 0 },
        { id:48,condition: 'Poor', issue_id: 6, quantity: 1, price: .99 },



        { id:49,condition: 'Mint', issue_id: 7, quantity: 45, price: 1 },
        {id:50, condition: 'Near Mint', issue_id: 7, quantity: 0, price: 0 },
        { id:51,condition: 'Very Fine', issue_id: 7, quantity: 0, price: 2 },
        { id:53,condition: 'Fine', issue_id: 7, quantity: 0, price: 0 },
        { id:54,condition: 'Very Good', issue_id: 7, quantity: 0, price: 0 },
        { id:55,condition: 'Good', issue_id: 7, quantity: 0, price: 0 },
        { id:56,condition: 'Fair', issue_id: 7, quantity: 0, price: 0 },
        { id:57,condition: 'Poor', issue_id: 7, quantity: 1, price: .99 },



        { id:58,condition: 'Mint', issue_id: 8, quantity: 45, price: 1 },
        {id:59, condition: 'Near Mint', issue_id: 8, quantity: 0, price: 0 },
        { id:60,condition: 'Very Fine', issue_id: 8, quantity: 0, price: 2 },
        { id:61,condition: 'Fine', issue_id: 8, quantity: 0, price: 0 },
        { id:62,condition: 'Very Good', issue_id: 8, quantity: 0, price: 0 },
        { id:63,condition: 'Good', issue_id: 8, quantity: 0, price: 0 },
        { id:64,condition: 'Fair', issue_id: 8, quantity: 0, price: 0 },
        { id:65,condition: 'Poor', issue_id: 8, quantity: 1, price: .99 },



        {id:66, condition: 'Mint', issue_id: 9, quantity: 45, price: 1 },
        { id:67,condition: 'Near Mint', issue_id: 9, quantity: 0, price: 0 },
        { id:68,condition: 'Very Fine', issue_id: 9, quantity: 0, price: 2 },
        { id:69,condition: 'Fine', issue_id: 9, quantity: 0, price: 0 },
        { id:70,condition: 'Very Good', issue_id: 9, quantity: 0, price: 0 },
        { id:71,condition: 'Good', issue_id: 9, quantity: 0, price: 0 },
        { id:72,condition: 'Fair', issue_id: 9, quantity: 0, price: 0 },
        { id:73,condition: 'Poor', issue_id: 9, quantity: 1, price: .99 },



        { id:74,condition: 'Mint', issue_id: 10, quantity: 45, price: 1 },
        { id:75,condition: 'Near Mint', issue_id: 10, quantity: 0, price: 0 },
        { id:76,condition: 'Very Fine', issue_id: 10, quantity: 0, price: 2 },
        { id:77,condition: 'Fine', issue_id: 10, quantity: 0, price: 0 },
        { id:78,condition: 'Very Good', issue_id: 10, quantity: 0, price: 0 },
        { id:79,condition: 'Good', issue_id: 10, quantity: 0, price: 0 },
        { id:80,condition: 'Fair', issue_id: 10, quantity: 0, price: 0 },
        { id:81,condition: 'Poor', issue_id: 10, quantity: 1, price: .99 },



        { id:82,condition: 'Mint', issue_id: 11, quantity: 45, price: 1 },
        { id:83,condition: 'Near Mint', issue_id: 11, quantity: 0, price: 0 },
        { id:84,condition: 'Very Fine', issue_id: 11, quantity: 0, price: 2 },
        { id:85,condition: 'Fine', issue_id: 11, quantity: 0, price: 0 },
        { id:86,condition: 'Very Good', issue_id: 11, quantity: 0, price: 0 },
        { id:87,condition: 'Good', issue_id: 11, quantity: 0, price: 0 },
        {id:88, condition: 'Fair', issue_id: 11, quantity: 0, price: 0 },
        { id:89,condition: 'Poor', issue_id: 11, quantity: 1, price: .99 },
      ]);
    })
    .then(function(){
      return knex.raw("SELECT setval('stock_id_seq', (SELECT MAX(id) FROM stock));");
    });
};
