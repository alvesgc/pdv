import prisma from '../../../prisma/client.js';
import {comparePassword} from '../../utils/hash.js';
import generateToken from 'jsonwebtoken';

export const login = async (req, res) => {
    const {email, password} = req.body;

    constuser = await prisma.user.findUnique({where: {email}});
    if (!user) return res.status(404).json({message: 'User not found'});

    const valid = await comparePassword(password, user.password);
    if (!valid) return res.status(401).json({message: 'Invalid password'});

    const token = generateToken({
        userId: user.id,
        clientId: user.clientId,
        email: user.email,
    });
    return res.json({token})
};
