import express, { Request, Response, NextFunction } from 'express';

import DeleteImageController from '@/controllers/aws-s3/delete-image.controller'

import Storage from '@/models/storage.model'

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { projectId, subjectType, subjectId, mediaIds } = req.body;

        const deletedMediaIds = [];
        for (const mediaId of mediaIds) {
            const removedMedia = await Storage.findOneAndRemove({projectId, subjectType, subjectId, _id: mediaId});

            await DeleteImageController(removedMedia.awsS3Key);
            deletedMediaIds.push(removedMedia.id);
        }

        res.json({deletedMediaIds});
    } catch (e) {
        let message = String(e);

        if (e instanceof Error) {
            message = e.message; 
        }

        res.json({error: 'server_error', description: message});
    }
});

export default router;