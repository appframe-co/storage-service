import express, { Request, Response, NextFunction } from 'express';

import UploadImageController from '@/controllers/upload-image.controller'

import Storage from '@/models/storage.model'

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { userId, projectId, structureId, subjectType, subjectId, subjectField, images } = req.body;

        const imgs = [];

        for (const name of Object.keys(images)) {
            const image = await UploadImageController(images[name].originalSource);

            const arUrl = images[name].originalSource.split('/');
            const srcFilename = arUrl[arUrl.length-1];
            const filename = srcFilename;

            const savedImage = await Storage.create({
                ...image,
                projectId, structureId, 
                subjectType, subjectId, subjectField,
                filename,
                mediaContentType: images[name].mediaContentType,
                createdBy: userId,
                updatedBy: userId
            });

            imgs.push({
                id: savedImage.id,
                filename: savedImage.filename,
                uuidName: savedImage.uuidName,
                width: savedImage.width,
                height: savedImage.height,
                size: savedImage.size,
                mimeType: savedImage.mimeType,
                mediaContentType: savedImage.mediaContentType,
                subjectField: savedImage.subjectField,
                src: process.env.AWS_S3_URL_WEBSITE + savedImage.awsS3Path
            });
        }

        res.json({images: imgs});
    } catch (e) {
        res.json({error: 'error'});
    }
});

export default router;