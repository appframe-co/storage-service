import { RoutesInput } from '@/types/types'
import stagedUploadsCreate from './staged-uploads-create.route'
import upload from './upload.route'
import deleteMedia from './delete-media.route'
import deleteMediaS3 from './delete-media-s3.route'
import storage from './storage.route'

export default ({ app }: RoutesInput) => {
    app.use('/api/staged_uploads_create', stagedUploadsCreate);
    app.use('/api/upload', upload);
    app.use('/api/delete_media', deleteMedia);
    app.use('/api/delete_media_s3', deleteMediaS3);
    app.use('/api/storage', storage);
    
};