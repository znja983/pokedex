const mysql = require('mysql2'); 
const connection = mysql.createConnection({ 
   host: 'localhost', 
   user: 'root', 
   password: 'Dkki9%86', 
   database: 'usuarios_app' 
}); 
 
connection.connect((err) => { 
   if (err) { 
       console.error('Error conectando a la base de datos:', 
err); 
       return; 
   } 
   console.log('✅ Conectado a MySQL'); 
}); 
 
module.exports = connection; 