import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

const router = Router();

// REGISTER
router.post('/register', async (req: Request, res: Response) => {
      console.log('1. Register started')
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
    }

    console.log('2. Checking existing user')
    const existing = await prisma.user.findUnique({ where: { email } });
    console.log('3. Existing check done', existing)
    if (existing) {
        res.status(409).json({ error: 'Email already in use' });
        return;
    }

    console.log('4. Hashing password')
    const passwordHash = await bcrypt.hash(password, 10);
    console.log('5. Password hashed')
    // 10 = salt rounds — higher is more secure but slower; 10 is the standard

    console.log('6. Creating user')
    const user = await prisma.user.create({
        data: { email, passwordHash },
    });
    console.log('7. User created', user.id)

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
    );
    console.log('8. Token signed, sending response')
});

// LOGIN
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
    );

    res.json({ token, user: { id: user.id, email: user.email } });
});

export default router;
