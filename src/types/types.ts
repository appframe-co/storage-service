import { Application } from "express";

export type RoutesInput = {
  app: Application,
}

export type TErrorResponse = {
  error: string|null;
  description?: string;
  property?: string;
}

export type TStorageModel = {
  id: string;
  userId: string;
  projectId: string;
  subjectId: string;
  subjectType: string;
  subjectField: string;
  filename: string;
  alt: string;
  uuidName: string;
  ext: string;
  width: number;
  height: number;
  size: number;
  mimeType: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export type TStagedTarget = {
  parameters: {name: string, value: string}[], 
  resourceUrl: string,
  url: string
}
export type TUploadImage = {
  uuidName: string;
  ext: string;
  mimeType: string;
  width: number;
  height: number;
  size: number;
}

export type TStorageDB = {
  id: string;
  subjectField: string;
  filename: string;
  uuidName: string;
  width: number;
  height: number;
  size: number;
  mimeType: string;
  mediaContentType: string;
  src: string;
  awsS3Key: string;
}

export type TStorage = Omit<TStorageDB, 'awsS3Key'>