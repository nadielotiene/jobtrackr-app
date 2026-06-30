import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes below require a valid JWT
router.use(authenticate);

// GET all applications for logged-in user
router.get('/', async (req: Request, res: Response) => {
	const applications = await prisma.application.findMany({
		where: { userId: req.userId },
		orderBy: { appliedDate: 'desc' }, // newest first
	});
	res.json(applications);
});

// GET single application
router.get('/:id', async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const application = await prisma.application.findUnique({
		where: { id },
	});

	if (!application || application.userId !== req.userId) {
		res.status(404).json({ error: 'Application not found' });
		return;
	}

	res.json(application);
});

// POST create new application
router.post('/', async (req: Request, res: Response) => {
	const { company, role, status, jobUrl, appliedDate, notes, contactName, followUpDate } = req.body;

	if (!company || !role || !appliedDate) {
		res.status(400).json({ error: 'company, role, and appliedDate are required' });
		return;
	}

	const application = await prisma.application.create({
		data: {
			userId: req.userId!,
			company,
			role,
			status: status ?? 'applied', // ?? means "use right side if left is null/undefined"
			jobUrl,
			appliedDate: new Date(appliedDate),
			notes,
			contactName,
			followUpDate: followUpDate ? new Date(followUpDate) : null,
		},
	})

	res.status(201).json(application);
})

// PUT update application
router.put('/:id', async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const existing = await prisma.application.findUnique({
		where: { id },
	});

	if (!existing || existing.userId !== req.userId) {
		res.status(404).json({ error: 'Application not found' });
		return;
	}

	const { company, role, status, jobUrl, appliedDate, notes, contactName, followUpDate } = req.body

	const updated = await prisma.application.update({
		where: { id },
		data: {
			company,
			role,
			status,
			jobUrl,
			appliedDate: appliedDate ? new Date(appliedDate) : undefined,
			// undefined = don't update this field; null = set it to null
			notes,
			contactName,
			followUpDate: followUpDate ? new Date(followUpDate) : null,
		},
	});

	res.json(updated);
});

// DELETE application
router.delete('/:id', async (req: Request, res: Response) => {
	const id = req.params.id as string;
	const existing = await prisma.application.findUnique({
		where: { id },
	});

	if (!existing || existing.userId !== req.userId) {
		res.status(404).json({ error: 'Application not found' });
		return;
	}

	await prisma.application.delete({
		where: { id } 
	});
	res.json({ message: 'Application deleted' });
});

export default router;
