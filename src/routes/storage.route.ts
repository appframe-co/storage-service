import express, { Request, Response, NextFunction } from 'express';

import StorageController from '@/controllers/storage/storage.controller'

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectId, subjectId, subjectType } = req.query as {projectId: string, subjectId: string, subjectType: string};

        const data = await StorageController({
            projectId,
            subjectId, 
            subjectType
        });

        res.json(data);
    } catch (e) {
        let message = String(e);

        if (e instanceof Error) {
            message = e.message; 
        }

        res.json({error: 'server_error', description: message});
    }
});

export default router;