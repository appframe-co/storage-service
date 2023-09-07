import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

import Jimp from 'jimp';

const client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string
    }
});

export default async function UploadImage(url: string): Promise<any> {
    try {
        if (!url) {
            throw new Error('URL is empty');
        }

        const {AWS_S3_BUCKET: s3Bucket, AWS_S3_URL: s3Url} = process.env;

        const key = url.split(s3Url + '/')[1];
        const command = new GetObjectCommand({Bucket: s3Bucket, Key: key});
        const response = await client.send(command);

        const fileBuf = await response.Body?.transformToByteArray();
        const fileLength = response.ContentLength;

        if (!fileBuf || !fileLength) {
            throw new Error('Error S3 response');
        }

        const filesizeMB = fileLength / 1e+6;
        const sizeLimit = 5;

        if (filesizeMB > sizeLimit) {
            throw new Error(`File size max ${filesizeMB}MB`);
        }

        const { fileTypeFromBuffer } = await (eval('import("file-type")') as Promise<typeof import('file-type')>);
        const mimeInfo = await fileTypeFromBuffer(fileBuf);
        if (!mimeInfo) {
            throw new Error(`File format`);
        }

        const parts = key.split('/');
        const uuidName = parts[parts.length-2];

        let file;

        const filetypes = /jpeg|jpg|png|gif/;
        const isMediaTypeImage = filetypes.test(mimeInfo.mime);
        if (isMediaTypeImage) {
            const image = await Jimp.read(Buffer.from(fileBuf));

            let width = image.getWidth();
            let height = image.getHeight();
      
            if (height > 5760 || width > 5760) {
                image.scaleToFit(5760, 5760);
      
                width = image.getWidth();
                height = image.getHeight();
            }

            // image.quality(80).write(path+filename);

            const size = {width, height};
            const buffer = await image.getBufferAsync(image.getMIME());
            const filesizeMB = buffer.length / 1e+6;
      
            file = {size, filesizeMB};
        }

        if (!file) {
            throw new Error('Upload error');
        }

        return {
            uuidName,
            ext: mimeInfo.ext,
            mimeType: mimeInfo.mime,
            width: file.size.width,
            height: file.size.height,
            size: file.filesizeMB
        };
    } catch (error) {
        console.log(error)

        throw error;
    }
}