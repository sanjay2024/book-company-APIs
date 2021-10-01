let books = [
        {
          ISBN: "12345One",
          title: "Getting started with MERN",
          authors: [1, 2],
          language: "en",
          pubDate: "2021-07-07",
          numOfPage: 225,
          category: ["fiction", "programming", "tech", "web dev"],
          publication: 1,
        },
        {
          ISBN: "12345Two",
          title: "Getting started with Python",
          authors: [1,2],
          language: "en",
          pubDate: "2021-08-07",
          numOfPage: 550,
          category:["fiction", "tech", "web dev"],
          publication: 1,
        },
      ];
      let authors=[{
              id:1,
              name:"sanjay",
              books:["12345One","12345Two"]
      },
      {
        id:2,
        name:"pradhive",
        books:["12345Two"]
}]
      
let publications=[{
        id:1,
        name:"sri krishna publication",
        books:["12345One","12345Two"]

},
{
        id:2,
        name:"bharani park publication",
        books:[]
}]
module.exports={books,authors,publications};