import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";

import { Configs } from "../configs/configs";
import { FolderS3Enum } from "../enums/folder.s3.enum";

class S3Service {
  constructor(
    private readonly s3Client = new S3Client({
      region: Configs.AWS_BUCKET_REGION,
      credentials: {
        accessKeyId: Configs.AWS_ACCESS,
        secretAccessKey: Configs.AWS_SECRET_KEY,
      },
      forcePathStyle: true,
    }),
  ) {}
  public async uploadFile(
    folder: FolderS3Enum,
    itemId: string,
    avatar: UploadedFile,
  ): Promise<string> {
    const path = `${folder}/${itemId}/${avatar.name}`;
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: Configs.AWS_BUCKET_NAME,
        Key: path,
        Body: avatar.data,
        ACL: Configs.S3_ACL,
        ContentType: avatar.mimetype,
      }),
    );
    return path;
  }
  public async deleteAvatar(path: string): Promise<void> {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: Configs.AWS_BUCKET_NAME,
        Key: path,
      }),
    );
  }
}
export const s3Service = new S3Service();
