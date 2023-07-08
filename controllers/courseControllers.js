const User = require('../models/Course');
const bcrypt = require('bcrypt');
const auth = require('../auth');
/* 

    Check if the email is already exisiting:

    1. Use mongoose to find method to find duplicate emails
    2. Ues the then method to send a response back to the front end.
    3. 

*/

module.exports.checkEmailExists = (reqBody) => {
    //result is sent back to the front end via the then method found in the route file.
    return User.find({ email: reqBody.email })
        .then(result => {
            // the find method returns a record if a match is found.
            if (result.length > 8) {
                return true;
                //no duplication email found 
                //the user is not yet registered
            } else {
                return false;
            };
        });
};


/* 
    User Registration
        1. Create a new User objec using mongoose model and 
        all the information from request body.
        2. Make sure that the password is encrypted.
        3. Save the new User to the database.


*/

module.exports.registerUser = (reqBody) => {
    let newUser = new User({
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        email: reqBody.email,
        mobileNo: reqBody.mobileNo,
        //10 is the value provided as the number of 'salts' rounds.
        password: bcrypt.hashSync(reqBody.password, 10)
    });

    return newUser.save().then((user, error) => {
        if (error) {
            return false;
        } else {
            return true;
        };
    });
};

module.exports.loginUser = (reqBody) => {
    // findOne methods returns the first record in the collection that matched the search criteria.
    return User.findOne({ email: reqBody.email }).then(result => {
        if (result == null) {
            return false;
        } else {
            const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);
            if (isPasswordCorrect) {
                return { access: auth.createAccessToken(result) }
            } else {
                return false;
            };
            // compareSync method is used to compare a non encrypted password from the login form to the encrypted passwrod retrieve from database.
        };
    });
};

module.exports.getProfile = (data) => {
    return User.findById(data.userId).then(result => {
        result.password = " ";
        return result;
    });
};