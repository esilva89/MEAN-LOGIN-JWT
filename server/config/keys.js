// Define the keys that will be used by the different server modules.
module.exports = {

    db: {
        regex: {
            // Valid email.
            matchEmail: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            // Password with a minimum 8 characters, at least one uppercase, one lowercase, one number and one special character.
            matchPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
        },
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/MEAN-Login-JWT'
    },
    routes: {
        post: {
            signUp: '/user/signup',
            signIn: '/user/signin',
            profile: '/user'
        },
        put: {
            editProfile: '/user/profile',
            editPassword: '/user/password'
        },
        delete: {
            removeUser: '/user'
        }
    },
    server: {
        port: 5000
    },
    services: {
        user: {
            token: process.env.SECRET_TOKEN || 'miclavetoken'
        }
    }
    
};