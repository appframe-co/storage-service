import mongoose, { Schema, Document } from "mongoose";
import {TStorageModel} from '@/types/types'

const ObjectId = Schema.ObjectId;

const StorageSchema: Schema = new Schema({
  userId: {
    type: ObjectId,
    require: true
  },
  projectId: {
    type: ObjectId,
    require: true
  },
  subjectType: {
    type: String,
    required: true
  },
  subjectId: {
    type: ObjectId,
    required: true
  },
  subjectField: String,
  filename: String,
  alt: String,
  uuidName: {
    type: String,
    required: true
  },
  ext: String,
  width: Number,
  height: Number,
  size: {
    type: Number,
    default: 0
  },
  mediaContentType: String,
  mimeType: String,
  position: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  createdBy: {
    type: ObjectId,
    required: true
  },
  updatedBy: {
    type: ObjectId,
    required: true
  }
});

StorageSchema.set('toObject', { virtuals: true });
StorageSchema.set('toJSON', { virtuals: true });

StorageSchema.virtual('uuidFilename').get(function() {
  return this.uuidName + '.' + this.ext;
});
StorageSchema.virtual('awsS3Key').get(function() {
  return `projects/${this.projectId}/${this.mediaContentType}/${this.uuidName}/${this.filename}`;
});

export default mongoose.models.Storage || mongoose.model < TStorageModel & Document > ("Storage", StorageSchema);