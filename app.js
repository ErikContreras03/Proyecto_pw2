const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app= express();
const path = require('path');

app.use( bodyParser.urlencoded({extended:false}));

app.use('/style', express.static(path.join(__dirname, 'style')));

//platillas que sean dinamicas
app.set('view engine','ejs');

//crear la conexion
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',// tu usuario de MySQL
    password: '',// tu contraseña de MySQL
    database: 'libreria',
    port: 3306
});

//comprobacion de la conexion de la base de datos
db.connect(err=>{
    if(err){
        console.log(`Error en la conexion de base de datos DB ${err}`);
    }else {
        console.log(`La base de datos funciona y esta conectada`)    
    }
});

//iniciamos el server
const port = 3009;
app.listen(port,()=>{
    console.log(`Servidor en funcionamiento desde http://localhost:${port}`);
});

//index
app.get('/', (req, res) => {
    const query = 'SELECT * FROM libros';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al buscar los libros:', err);
            res.send('Error');
        } else {
            res.render('index', { libros: results });
        }
    });
});

app.get('/add', (req, res) => {
    res.render('add'); // Envia hacia el formulario
});


//agregar libro
app.post('/add', (req, res) => {
    const { fecha_regreso, titulo, autor, editorial, genero, stock, edicion } = req.body;
    const query = 'INSERT INTO `libros` (`fecha_regreso`, `titulo`, `autor`, `editorial`, `genero`, `stock`, `edicion`) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [fecha_regreso, titulo, autor, editorial, genero, stock, edicion], (err) => {
        if (err) {
            console.error('Error al agregar los libros:', err);
            res.send('Error');
        } else {
            res.redirect('/');
        }
    });
});

// Mostrar el formulario de edición del libro
app.get('/edit/:id', (req, res) => {
    const { id } = req.params; // Obtén el ID del parámetro de la URL
    const query = 'SELECT * FROM libros WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error mostrar el libros:', err);
            res.send('Error');
        } else {
            if (results.length > 0) {
                res.render('edit', { libros: results[0] });
            } else {
                res.send('libros no encontrado');
            }
        }
    });
});

// Modulo para actualizar libro
app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const {  fecha_regreso, titulo, autor, editorial, genero, stock, edicion } = req.body;
    const query = 'UPDATE libros SET fecha_regreso = ?, titulo = ?, autor = ?, editorial = ?, genero = ?, stock = ?, edicion = ? WHERE id = ?';
    db.query(query, [fecha_regreso, titulo, autor, editorial, genero, stock, edicion, id], (err) => {
        if (err) {
            console.error('Error actualizando:', err);
            res.send('Error');
        } else {
            res.redirect('/'); // Redirige al listado de libros
        }
    });
});


//eliminar libro
app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM libros WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            console.error('Error al eliminar el libros:', err);
            res.send('Error');
        } else {
            res.redirect('/');
        }
    });
});