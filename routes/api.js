const user_Schema = require('../models/data')
const express = require('express')
const router = express.Router()

router.get('/give',async(req,res)=>
{
    try
    {
        const consumer = await user_Schema.find();
        res.json(consumer)
    }catch(err){`Error shown as ${error}`}
})


router.get('/:id', async (req, res, next) => {
    let user;
    try {
        user = await user_Schema.findById(req.params.id);
        if (user == null) {
            return res.status(404).send('Cannot Find User');
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.json(user);
});


router.post('/add',async(req,res,next)=>
{
    const customer = new user_Schema(
        {
            name : req.body.name,
            age : req.body.age
        }
    )

    try{
        const add_user = await customer.save();
        res.status(201).json(add_user)
    }
    catch(error){ res.status(400).send(`It gives as ${error}`)}
})

router.post('/update/:id', async (req, res) => {
    try {
        let user = await user_Schema.findById(req.params.id);
        if (user == null) {
            return res.status(404).send('Data Not Found');
        }

        if (req.body.name != null) {
            user.name = req.body.name;
        }
        if (req.body.age != null) {
            user.age = req.body.age;
        }

        const updatedUser = await user.save();
        return res.status(200).json({ message: 'Updated Successfully', user: updatedUser });
    } catch (error) {
        return res.status(500).json({ message: `Error found: ${error.message}` });
    }
});

router.delete('/del/:id', async (req, res) => {
    try {
        let user = await user_Schema.findById(req.params.id);
        if (user != null) {
            await user.deleteOne();
            return res.status(200).send("User Deleted Successfully");
        } else {
            return res.status(404).send('User Not Exists');
        }
    } catch (error) {
        console.error(`Error found at ${error}`);
        return res.status(500).send(`Error found: ${error.message}`);
    }
});



module.exports = router;