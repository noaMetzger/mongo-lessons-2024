use catalog
//1
  db.books.find({})
  const array= db.books.distinct("title")
  array.map(x=>x.toUpperCase())
  //2
  const array2=db.books.distinct("categories")
  array2.map(x =>{return { category: x, count: db.books.countDocuments({ categories: x })} })
  
  //4
  db.books.aggregate([{$match:{status:"PUBLISH"}},
  {$set:{is_published:true}},
       {$project:{status:false}}
      
  ])