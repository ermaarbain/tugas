'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
var mobil = mongoose.model('mobil');

router.get('/', function (req, res) {
	mobil.find({}).exec(function(err, mobil) {
		res.render('mobil_index', { data : mobil });
	});
});
//Tambah data
router.get('/tambah', function (req, res) {
 res.render('mobil_tambah', { title : 'Tambah mobil', data: '' });
 });
 
 router.post('/tambah', function (req, res) {
	var merk = req.body.merk;
	var tipe = req.body.tipe;
	var warna = req.body.warna;
	var jenis = req.body.jenis;
	
	var mobilBaru = new mobil ({ merk : merk, tipe: tipe, warna : warna, jenis: jenis});
	mobilBaru.save(function(err){
	if (err) throw err;
	res.redirect('/mobil');
	});
	});
	
//ubah data
router.get('/ubah/:mobil_id([0-9a-z]+)', function (req, res) {
mobil.findOne({_id: req.params.mobil_id}).exec(function(err, mobil) {
if (err) throw err;
res.render('mobil_tambah', {title: 'Ubah mobil', data: mobil});
});
});

router.post('/ubah/:mobil_id([0-9a-z]+)', function (req,res) {
	var data_berubah = req.body;
	mobil.findOneAndUpdate({_id: req.params.mobil_id}, data_berubah).exec(function(err) {
		if (err)throw err;
	res.redirect('/mobil');
	});
});

//hapus data
router.get('/hapus/:mobil_id([0-9a-z]+)', function(req, res) {
	mobil.findOneAndRemove({_id: req.params.mobil_id}).exec(function(err){
	if (err) throw err;
	res.redirect('/mobil');
	});
	});
module.exports = router;
