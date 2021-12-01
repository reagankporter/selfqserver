const Express = require('express');
const router = Express.Router();
let validateJWT = require('../Middleware/validate-jwt');
const {JournalModel} = require('../Models');

router.post('/create', validateJWT, async (req,res) => {
    const {date, howDay, improveDay, rating} = req.body.journal;
    const {id} = req.user;
    const journalEntry = {
        date, 
        howDay, 
        improveDay, 
        rating,
        owner: id  
    }

    try{
        const newJournal = await JournalModel.create(journalEntry);          
        res.status(200).json(newJournal)
    } catch(err) {
        res.status(500).json({
            message: `Day Log failed to register, try again ${err}`});
    }
});

router.put('/update/:entryId', validateJWT, async (req, res) => {
    const {date, howDay, improveDay, rating} = req.body.journal;
    const journalId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: journalId,
            owner: userId
        }
    };
    const updatedJournal = {
        date: date,
        howDay: howDay,
        improveDay: improveDay,
        rating: rating
    };

    try {
        const update = await JournalModel.update(updatedJournal, query);
        res.status(200).json(update);
    } catch(err) {
        res.status(500).json({error: err});
    }

});


//* Delete List Item
router.delete('/delete/:id', validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const journalId = req.params.id;

    try {
        const query = {
            where: {
                id: journalId,
                owner: ownerId
            }
        };
        await JournalModel.destroy(query);
        res.status(200).json({message: 'Day Log Removed'});
    } catch(err) {
        res.status(500).json({error: err});
    }
});

router.get('/mine', validateJWT, async (req, res) => {
    let {id} = req.user;
    
    try {
        const userJournal = await JournalModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userJournal);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;







// router.post('/create', validateJWT, async (req,res) => {
//     const {date, howDay, improveDay, rating} = req.body.journal;
//     const {id} = req.user;
//     const journalEntry = {
//         date,
//         howDay,
//         improveDay,
//         rating,
//         owner: id
//     }
//     try {
//         const newJournal = await JournalModel.create(journalEntry);
//         res.status(200).json(newJournal);
//     }catch (err){
//         res.status(500).json({ error: err });
//     }
// });

// router.get ('/', validateJWT, async (req, rgites) => {
//     try{
//         const entries = await JournalModel.findAll();
//         res.status(200).json(entries);
//     } catch (err) {
//         res.status(500).json ({ error: err });
//     }
// });

// router.get('/mine', validateJWT, async (req, res) => {
//     let {id} = req.user;
//     try {
//         const userJournal = await JournalModel.findAll({
//             where: {
//                 owner: id
//             }
//         });
//         res.status(200).json(userJournal);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

// router.get('/:title', async (req, res) => {
//     const {title} = req.params;
//     try {
//         const results = await JournalModel.findAll({
//             where: {date: date}
//         });
//         res.status(200).json(results);
//     } catch (err) {
//         res.status(500).json({ error: err })
//     }
// });

// router.put('/update/:entryId', validateJWT, async (req, res) =>{
// const {date, howDay, improveDay, rating} = req.body.journal;
// const journalId = req.params.entryId;
// const userId = req.user.id;

// const query = {
//     where: {
//         id: journalId,
//         owner: userId
//     }
// };

// const updatedJournal = {
//     date: date,
//     howDay: howDay,
//     improveDay: improveDay,
//     rating: rating
// };
// try {
//     const update = await JournalModel.update(updatedJournal, query)
//     res.status(200).json(update);
// } catch (err) {
//     res.status(500).json({ error: err });
// }
// });

// router.delete('/:id',validateJWT,async (req, res) =>{
//     const ownerId=req.user.id;
//     const journalId = req.params.id;

//     try {
//         const query ={
//             where:{
//                 id: journalId,
//                 owner: ownerId
//             }
//         };
//         await JournalModel.destroy(query);
//         res.status(200).json({message: 'Journal Entry Removed' })
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// })

// module.exports = router;

















// router.get('/practice', (req, res) => {
//     res.send('hey')
// });

// router.get('/about', (req, res) => {
//     res.send('This was Created by Team 5: Reagan Porter, Ginea Merrill, and Nolan Trgovac')
// })

// router.post('/create', validateJWT, async (req,res) => {
//     const {title, date, entry, rating} = req.body.journal;
//     const {id} = req.user;
//     const journalEntry = {
//         title,
//         date,
//         entry,
//         rating,
//         owner: id
//     }
//     try {
//         const newJournal = await JournalModel.create(journalEntry);
//         res.status(200).json(newJournal);
//     }catch (err){
//         res.status(500).json({ error: err });
//     }
//     // JournalModel.create(journalEntry)
// });

// router.get ('/', validateJWT, async (req, res) => {
//     try{
//         const entries = await JournalModel.findAll();
//         res.status(200).json(entries);
//     } catch (err) {
//         res.status(500).json ({ error: err });
//     }
// });

// router.get('/mine', validateJWT, async (req, res) => {
//     let {id} = req.user;
//     try {
//         const userJournals = await JournalModel.findAll({
//             where: {
//                 owner: id
//             }
//         });
//         res.status(200).json(userJournals);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// });

// router.get('/:title', async (req, res) => {
//     const {title} = req.params;
//     try {
//         const results = await JournalModel.findAll({
//             where: {title: title}
//         });
//         res.status(200).json(results);
//     } catch (err) {
//         res.status(500).json({ error: err })
//     }
// });

// router.put('/update/:entryId', validateJWT, async (req, res) =>{
//   const {title, date, entry, rating} = req.body.journal;
//   const journalId = req.params.entryId;
//   const userId = req.user.id;

//   const query = {
//       where: {
//           id: journalId,
//           owner: UserId
//       }
//   };

//   const updatedJournal = {
//       title: title,
//       date: date,
//       entry: entry,
//       rating: rating
//   };
//   try {
//       const update = await JournalModel.update(updatedJournal, query)
//       res.status(200).json(update);
//   } catch (err) {
//       res.status(500).json({ error: err });
//   }
// });

// router.delete(':id',validateJWT,async (req, res) =>{
//     const ownerId=req.user.id;
//     const journalId = req.params.id;

//     try {
//         const query ={
//             where:{
//                 id: journalId,
//                 owner: ownerId
//             }
//         };
//         await JournalModel.destroy(query);
//         res.status(200).json({message: 'Journal Entry Removed' })
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// })

// module.exports = router;