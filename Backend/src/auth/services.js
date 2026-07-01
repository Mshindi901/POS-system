import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
class authService {
    constructor(authRepo) {
        this.authRepo = authRepo;
    };

    async registerUser(userData) {
        try {
            const isUser = await this.authRepo.findUserByEmail(userData.email);
            if (isUser) {
                throw new Error('User already exists');
                return null;
            };

            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const newUser = await this.authRepo.createUser({ ...userData, password_hashed: hashedPassword });
            return newUser;
        } catch(error) {
            console.error('Error registering user:', error);
            return null;
        }
    };

    async login(email, password) {
        try {
            const isUser = await this.authRepo.findUserByEmail(email);
            if (!isUser) {
                throw new Error('User not found');
                return null;
            };
            
            const isPasswordValid = await bcrypt.compare(password, isUser.password_hashed);
            if(!isPasswordValid){
                throw new Error('Invalid password');
                return null;
            };
            const token_sign = jwt.sign({id: isUser.id, email: isUser.email}, process.env.JWT_SECRET, {expiresIn: '1d'});
            return { token: token_sign, user: isUser };
        } catch(error) {
            console.error('Error logging in:', error);
            return null;
        }
    };

    async getUserById(id) {
        try {
            const user = await this.authRepo.findUserById(id);
            if (!user) {
                throw new Error('User not found');
                return null;
            };
            return user;
        } catch(error) {
            console.error('Error fetching user by ID:', error);
            return null;
        }
    };

    async getUserByEmail(email) {
        try {
            const user = await this.authRepo.findUserByEmail(email);
            if (!user) {
                throw new Error('User not found');
                return null;
            };
            return user;
        } catch(error) {
            console.error('Error fetching user by email:', error);
            return null;
        }
    };

    async getUserByPhone(phone) {
        try {
            const user = await this.authRepo.findByPhone(phone);
            if (!user) {
                throw new Error('User not found');
                return null;
            };
            return user;
        } catch(error) {
            console.error('Error fetching user by phone:', error);
            return null;
        }
    };

    async updateUser(id, updatedData) {
        try {
            const isUser = await this.authRepo.findUserById(id);
            if (!isUser) {
                throw new Error('User not found');
                return null;
            };
            const updatedUser = await this.authRepo.updateUser(id, updatedData);
            return updatedUser;
        } catch(error) {
            console.error('Error updating user:', error);
            return null;
        }
    };

    async deleteUser(id) {
        try {
            const isUser = await this.authRepo.findUserById(id);
            if (!isUser) {
                throw new Error('User not found');
                return null;
            };
            const deletedUser = await this.authRepo.deleteUser(id);
            return deletedUser;
        } catch(error) {
            console.error('Error deleting user:', error);
            return null;
        }
    }
};

export default authService;