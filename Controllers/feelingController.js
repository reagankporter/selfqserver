const Express = require('express');
const router = Express.Router();
let validateJWT = require('../Middleware/validate-jwt');
const {FeelingModel} = require('../Models');


//* Create List Item
router.post('/create', validateJWT, async (req,res) => {
    const {howFeeling, happyFeeling, okayFeeling, sadFeeling} = req.body.feeling;
    const {id} = req.user;
    const feelingEntry = {
        howFeeling, 
        happyFeeling, 
        okayFeeling, 
        sadFeeling,
        owner: id  
    }

    try{
        const newFeeling = await FeelingModel.create(feelingEntry);          
        res.status(200).json(newFeeling)
    } catch(err) {
        res.status(500).json({
            message: `Feeling failed to register, try again ${err}`});
    }
});

//* Update List Item
router.put('/update/:entryId', validateJWT, async (req, res) => {
    const {howFeeling, happyFeeling, okayFeeling, sadFeeling} = req.body.feeling;
    const feelingId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: feelingId,
            owner: userId
        }
    };
    const updatedFeeling = {
        howFeeling: howFeeling,
        happyFeeling: happyFeeling,
        okayFeeling: okayFeeling,
        sadFeeling: sadFeeling
    };

    try {
        const update = await FeelingModel.update(updatedFeeling, query);
        res.status(200).json(update);
    } catch(err) {
        res.status(500).json({error: err});
    }

});


//* Delete List Item
router.delete('/delete/:id', validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const feelingId = req.params.id;

    try {
        const query = {
            where: {
                id: feelingId,
                owner: ownerId
            }
        };
        await FeelingModel.destroy(query);
        res.status(200).json({message: 'Feeling Log Removed'});
    } catch(err) {
        res.status(500).json({error: err});
    }
});

router.get('/mine', validateJWT, async (req, res) => {
    let {id} = req.user;
    
    try {
        const userFeeling = await FeelingModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userFeeling);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;