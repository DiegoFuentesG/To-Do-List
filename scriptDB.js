//Conexion a la BD------------

const { Pool } = require('pg');

const config = {
    user: 'postgres',      
    host: 'localhost',       
    password: '123',           
    database: 'appdb'         
}

const pool = new Pool(config);

const getTasks = async () => {
    try {
        const res = await pool.query('select * from tareas');
        console.log(res.rows);
    } catch (e) {
        console.log(e);
    }
};

const insertUser = async () => {
    try {
        const text = 'INSERT INTO users(name, email, password) VALUES ($1, $2 , $3)'
        const values = ['Dani', 'dani@gmail.com', 'dani']
        const res = await pool.query(text, values);
        console.log(res);
    } catch (e) {
        console.log(e);
    }
}

//export async function insertTask(description, state, cod_user) 
const insertTask = async (description) => {
    try {
        const text = 'INSERT INTO tareas(description,state,cod_user) VALUES ($1, $2, $3)';
        const values = [description, false , 1];
        const res = await pool.query(text, values);
        console.log(res);
    } catch (e) {
        console.log(e);
    }
}


const deleteUser = async (id_user) =>{
    const text = 'DELETE FROM users WHERE name = $1'
    const values = [id_user];

    const res = await pool.query(text,values);
    console.log(res);

}

const deleteTask = async (id_task) =>{
    const text = 'DELETE FROM tareas WHERE id_task = $1'
    const values = [id_task];

    const res = await pool.query(text,values);
    console.log(res);

}

const editUser = async (nActual , nNuevo) =>{
    try {
        const text = 'UPDATE users SET name = $1 WHERE name = $2';
        const values = [nNuevo,nActual]
        const res = await pool.query(text, values);
        console.log(res);
    } catch (e) {
        console.log(e);
    }

}

const editTask = async (NewTextTask, id_task) =>{
    try {
        const text = 'UPDATE tareas SET description = $1 WHERE id_task = $2';
        const values = [NewTextTask, id_task ]
        const res = await pool.query(text, values);
        console.log(res);
    } catch (e) {
        console.log(e);
    }

}

getTasks();
//insertUser();
//deleteUser();
//editUser();
//insertTask();
//deleteTask();
//editTask();
//insertTask("Arreglar boton +");
