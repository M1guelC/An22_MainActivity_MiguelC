/* 
    this file stores the methods for creating jsonwebtoken
*/

const jwt = require('jsonwebtoken');
const secret = 'bscsAN22';

module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };
    //Generates a jsonwebtoken using the jwt's sign method
    return jwt.sign(data, secret, {})
}

/* 
    json web token (JWT) are a way to securely transmit 
    information between two parties/application, commonly used
    in web applications and APIs - digital passport that contains 
    important about a user or a request.

        - Three parts
            - the header consist of two part
                - JWT
                - signing algorithm used to create a signature
            
                
            - payload
                - actual information stored. It contains claims or statements
                about user or request.
            
            - signature 
                - is a cryptographic hash of the header, payload, and 
                secret key.
                    - secret is known only by the server that issues 
                    token -- digital fingerprint of the token.
*/