let express = require('express');
let router = express.Router();

module.exports.displayHomePage = (req, res, next) =>{
	res.render('index', { title: 'Welcome to my portfolio website',key: "home"});
}

module.exports.displayAboutPage = (req, res, next) =>{
	res.render('index', { title: 'About Me',name: "",key: "about"});
}

module.exports.displayProjectsPage = (req, res, next) =>{
	res.render('index', { title: 'Recent Projects',name: "",key: "projects"});
}

module.exports.displayServicesPage = (req, res, next) =>{
	res.render('index', { title: 'Main Services',name: "",key:"services"});
}

module.exports.displayContactPage = (req, res, next) =>{
	res.render('index', { title: 'Contact Info',name: "",key:"contact"});
}
