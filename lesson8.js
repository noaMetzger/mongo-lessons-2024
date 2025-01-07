use catalog
//1
  db.books.find({})
  const array= db.books.distinct("title")
  array.map(x=>x.toUpperCase())
  //2
  const array2=db.books.distinct("categories")
  array2.map(x =>{return { category: x, count: db.books.countDocuments({ categories: x })} })
  
  //3
 db.books.aggregate([
    {$match:{title:/^A/}} ,
    {$project:{title:1,pageCount:1}},
    {$sort:{publishedDate:-1}}
 ]) 
  
  //4
  db.books.aggregate([{$match:{status:"PUBLISH"}},
  {$set:{is_published:true}},
       {$project:{status:false}}
      
  ])
  
  //5
  db.books.aggregate([
  {$match:{pageCount:{$gt:0}}},
  {$skip:10},
  {$limit:100},
  {$project:{shortDescription:0,longDescription:0}},
  {$out:'books100'}
  
  ])
  
  //6
  db.books.aggregate([
  {$group:{_id:'$pageCount',
      amount:{$sum:1}
  }},
  {$addFields:{pageCount:'$_id'}},
  {$project:{_id:0}},
  {$sort:{pageCount:1}}
  ])
  
   //7
  db.books.aggregate([
  {$group:{_id:'$status',
        avg:{$avg:'$pageCount'},
        max:{$max:'$pageCount'},
        min:{$min:'$pageCount'},
        last:{$last:'$title'},
        first:{$first:'$title'},      
  }}
  ]) 
  
//8
  db.books.aggregate([
  {$group:{_id:'$status',
        booksNameDistinct:{$addToSet:'$title'} ,
        booksName:{$push:'$title'}     
  }}
  ])    
  
//9
  db.books.aggregate([
  {$unwind:'$authors'},
  {$group:{_id:'$authors',
        booksName:{$push:'$title'},
        amount:{$sum:1}     
  }},
  {$sort:{amount:-1}}
  ])   
  
  //10
  db.books.aggregate([
  {$unwind:'$categories'},
  {$group:{_id:'$categories',
   amount:{$sum:1}}},
   {$sort:{amount:-1}}      
  ]) 
  
  //11
  db.books.aggregate([
    {$unwind:'$authors'},
    {$match:{authors:{$not:{$eq:""}} }},
    {$group:{_id:'$authors'}},
    {$addFields:{name:'$_id'}},
    {$project:{name:1,_id:0}}, 
    {$sort:{name:1}},   
    {$out:'authors'}
  ]) 
  
  

  
  
   
  
  
  
  
  
  