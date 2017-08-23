
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('issues').del()
    .then(function () {
      // Inserts seed entries
      return knex('issues').insert([
        {
          id:1,
          series_id: 1,
          number: 1,
          cover_image: 'https://s3.us-east-2.amazonaws.com/mixitupcomicimages/The-Walking-Dead-1-1.jpeg',
          pub_date: new Date(2003,10,8),
          ebay: false,
          shopify: false
        },
        {
          id:2,
          series_id: 1,
          number: 2,
          cover_image: 'https://s3.us-east-2.amazonaws.com/mixitupcomicimages/The-Walking-Dead-1-2.jpeg',
          pub_date: new Date(2003,11,12),
          ebay: false,
          shopify: false
        },
        {
          id:3,
          series_id: 1,
          number: 3,
          cover_image: 'https://s3.us-east-2.amazonaws.com/mixitupcomicimages/The-Walking-Dead-1-3.jpeg',
          pub_date: new Date(2003,12,10),
          ebay: false,
          shopify: false
        },
        {
          id: 4,
          series_id: 1,
          number: 4,
          cover_image: 'https://s3.us-east-2.amazonaws.com/mixitupcomicimages/The-Walking-Dead-1-4.jpeg',
          pub_date: new Date(2004,1,28),
          ebay: false,
          shopify: false
        }
      ]);
    })
    .then(function(){
      return knex.raw("SELECT setval('issues_id_seq', (SELECT MAX(id) FROM issues));");
    });
};
