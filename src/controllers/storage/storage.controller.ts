import Storage from '@/models/storage.model';
import {TErrorResponse, TStorage, TStorageDB} from '@/types/types';

export default async function StorageController(
    {projectId, subjectId, subjectType}: {projectId: string, subjectId: string, subjectType: string}): 
    Promise<TErrorResponse | {storage: TStorage[]}>
    {
    try {
        const filter: {projectId: string, subjectId: string, subjectType: string} = {projectId, subjectId, subjectType};

        const storage: TStorageDB[] = await Storage.find(filter);
        if (!storage) {
            throw new Error('invalid storage');
        }

        const output = storage.map(s  => ({
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