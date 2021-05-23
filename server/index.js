const express = require('express');
const mongoose = require('mongoose');
const FoodModel = require('./models/Food')
const cors = require('cors');
const app = express();

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://yonatanmagalcrud:motihazak@cluster0.lqnnd.mongodb.net/food?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});

app.post('/insert', async (req, res) => {
    const foodName = req.body.foodName
    const days = req.body.days

    const food = new FoodModel({foodName: foodName, daysSinceIAte: days})
    try {
        await food.save()
        res.send("inserted data")
    } catch(error) {
        console.log(error)
    }
})

app.get('/read', async (req, res) => {
    FoodModel.find({}, (error, result) => {
        if(error) res.status(404).send(error)
        res.send(result)
    })
})

app.put('/update', async (req, res) => {
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;
    try {
        await FoodModel.findById(id, (error, updatedFood) => {
            updatedFood.foodName = newFoodName
            updatedFood.save();
            res.send('updated')
        })
    } catch(error) {
        console.log(error)
    }
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await FoodModel.findByIdAndRemove(id).exec();
    res.send('deleted');
})



app.listen(3001, () => {
    console.log('Server running on port 3001...')
});