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
        res.json({error: 'error'});
    }
});

export default router;