import Storage from '@/models/storage.model';
import {TErrorResponse} from '@/types/types';

export default async function StorageController(
    {projectId, subjectId, subjectType}: {projectId: string, subjectId: string, subjectType: string}): 
    Promise<TErrorResponse | {storage: any}>
    {
    try {
        const filter: {projectId: string, subjectId: string, subjectType: string} = {projectId, subjectId, subjectType};

        const storage = await Storage.find(filter);
        if (!storage) {
            return {error: 'invalid_storage'};
        }

        const output = storage.map((s: any)  => ({
            id: s.id,
            filename: s.filename,
            uuidName: s.uuidName,
            width: s.width,
            height: s.height,
            size: s.size,
            mimeType: s.mimeType,
            mediaContentType: s.mediaContentType,
            subjectField: s.subjectField,
            src: process.env.AWS_S3_URL_WEBSITE + '/' + s.awsS3Key
        }));

        return {storage: output};
    } catch (error) {
        throw error;
    }
}