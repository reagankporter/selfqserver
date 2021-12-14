const router = require('express').Router();
const { UserModel } = require('../Models'); 
const { UniqueConstraintError } = require('sequelize/lib/errors');
let validateJWT = require("../middleware/validate-jwt")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AccessControl = require("accesscontrol");
const validateAdmin = require("../middleware/validate-admin");



router.post('/register', async (req, res) => {

    let {username, email, password} = req.body.user;
    try{

       const User = await UserModel.create({
        
            username,
            email,
            password: bcrypt.hashSync(password, 13),
            //! admin: boolean,
        });


        let token = jwt.sign({id: User.id, email: User.email}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
            
        res.status(201).json({
            message: "User successfully registered",
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use! Try again!",
            });
        } else {
            res.status(500).json({
                message: "Failed to register user ;(",
            });
        }
    }
});

router.post('/login', async (req, res) => {
    let { username, password } = req.body.user;

    try {
        let loginUser = await UserModel.findOne({
            where: {
                username: username,
            },
        });

        if (loginUser) {

            let passwordComparison = await bcrypt.compare(password, loginUser.password);
    
          if (passwordComparison) {

    let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

            res.status(200).json({
              user: loginUser,
              message: "User successfully logged in!",
                sessionToken: token
            });
        } else {
                res.status(401).json({
                message: 'Incorrect Username or Password'
              })
        }
            } else {
                   res.status(401).json({
                   message: 'Incorrect username or password'
                });
            }
    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
});

//! ADMIN

// router.get('/admin/allusers', validateAdmin, async (req, res) => {
//     try {
//         const allUsers = await UserModel.findAll();
//         res.status(200).json(allUsers);
//     } catch (err) {
//         res.status(500).json({ error: err});
//     }
// })

// router.delete('/admin/delete/:id', validateAdmin, async(req, res) => {
//     const userId = req.params.id;

//     try {
//         const query = await UserModel.destroy({
//             where: {id: userId}
//         });
//         res.status(200).json({
//             mssage: "User Deleted"
//         });
//     } catch (err) {
//         res.status(500).json({
//             message: "Failed to delete user."
//         });
//     };
// });


module.exports = router;