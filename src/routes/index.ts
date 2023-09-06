import { RoutesInput } from '@/types/types'
import stagedUploadsCreate from './staged-uploads-create.route'
import upload from './upload.route'
import storage from './storage.route'

export default ({ app }: RoutesInput) => {
    app.use('/api/staged_uploads_create', stagedUploadsCreate);
    app.use('/api/upload', upload);
    app.use('/api/storage', storage);
};