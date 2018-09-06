var express = require('express');
var router = express.Router();
const db = require('../db')

/* GET employees listing. */
router.get('/', async (req, res, next) => {
    try{
        const result =  await db.query('SELECT * from EMP_DTL')
        if(result.rowCount === 0){
            throw new Error('No employees available')
        }
        else{
            res.status(200)
            .json({
                status:'Success',
                message:'recieved employees',
                data: result.rows
            })
        }
        
    }
    catch(e) {
        next(e)
    }
    
});


router.post('/', async (req, res, next) => {
    try{
        const result = await db.query("INSERT INTO EMP_DTL(name, email) values($1, $2)", [req.body.name, req.body.email])
        console.log(result)
        res.status(200)
        .json({
            status:'Success',
            message:'added employee'
        })
    }
    
    catch(e) {
        next(e)
    }
})

router.delete('/:email', async (req, res, next) => {
    try{
        const result = await db.query("DELETE FROM EMP_DTL WHERE email=$1", [req.params.email])
        console.log(result)
        res.status(200)
        .json({
            status:'Success',
            message:'deleted employee'
        })
    }
    catch(e) {
        next(e)
    }
})

router.get('/:email', async (req, res, next) => {
    try{
        const result = await db.query("SELECT * FROM EMP_DTL WHERE ID=$1", [req.params.email]);
        if(result.rowCount === 0){
            throw new Error("No user with that email")
        }
        res.status(200)
        .json({
            status:'Success',
            message:'recieved employee',
            data: result.rows
        })
    }
    catch(e) {
        next(e)
    }
})

router.put('/:email', async (req, res, next) => {
    try{
        const result = await db.query("UPDATE EMP_DTL SET name=$1, email=$2 WHERE email=$3", [req.body.name, req.body.email, req.params.email])
        console.log(result)
        res.status(200)
        .json({
            status:'Success',
            message:'updated employee',
        })
    }
    catch(e) {
        next(e)
    }
})

module.exports = router;
