import express, { Request, Response, NextFunction } from 'express';

import DeleteMediaS3Controller from '@/controllers/aws-s3/delete-image-s3.controller'

import Storage from '@/models/storage.model'

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { projectId, mediaS3Urls } = req.body;

        const {AWS_S3_URL: s3Url} = process.env;

        const deletedMediaUrls = [];
        for (const url of mediaS3Urls) {
            const key = url.split(s3Url + '/')[1];

            const arKey = key.split('/');
            arKey.splice(1, 1, projectId);

            if (arKey.join('/') !== key) {
                throw new Error('URL not valid')
            }

            await DeleteMediaS3Controller(key);
            deletedMediaUrls.push(url);
        }

        res.json({deletedMediaUrls});
    } catch (e) {
        res.json({error: 'error'});
    }
});

export default router;