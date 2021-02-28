let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to our Book model
let Book = require('../models/book');



/* GET Route for the Book List page - READ OPeration */
module.exports.displayBookList = (req, res, next) => {
    Book.find((err, bookList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BookList);

            res.render('book/list', {title: 'Books', BookList: bookList})            
        }
    });
}

/* GET Route for the displaying Add page - CREATE Operation */
module.exports.displayAddPage = (req, res, next) =>{
            res.render('book/add', {title: 'Add Book'})            

}

/* POST Route for the processing Add page - CREATE Operation */
module.exports.processAddPage = (req, res, next) =>{
	let newBook = Book({
		"name": req.body.name,
		"author": req.body.author,
		"published": req.body.published,
		"description": req.body.description,
		"price": req.body.price
	});

	Book.create(newBook,(err, book )=>{
		if(err)
		{
			console.log(err);
		}
		else
		{
			//Refesh Book list
			res.redirect('/book-list');
		}
	});
	
}

/* GET Route for the displaying Edit page - UPDATE Operation */
module.exports.displayEditPage = (req, res, next) =>{
	let id = req.params.id;

	Book.findById(id, (err,bookToEdit)=>{
		if(err)
		{
			console.log(err);
			res.end(err);
		}
		else
		{
			//Show the edit view
			res.render('book/edit', {title :'Edit Book', book: bookToEdit})
		}
	});
	
}

/* POST Route for the processing Edit page - UPDATE Operation */
module.exports.processEditPage = (req, res, next) =>{
	let id = req.params.id

	let updatedBook = Book({
		"_id": id,
		"name": req.body.name,
		"author": req.body.author,
		"published": req.body.published,
		"description": req.body.description,
		"price": req.body.price

	});

	Book.updateOne({_id: id}, updatedBook, (err)=>{
		if(err)
		{
			console.log(err);
			res.end(err);
		}
		else{
			//Refesh Book list
			res.redirect('/book-list'); 
		}
	});
	
}

/* GET to perform deletion - DELETE Operation */
module.exports.performDelete =  (req, res, next) =>{

	let id = req.params.id;

	Book.remove({_id:id}, (err)=>{
		if(err)
		{
			console.log(err);
			res.end(err);
		}
		else{
			//Refesh Book list
			res.redirect('/book-list'); 
		}
	});
	
}