import { S3Client } from "@aws-sdk/client-s3";
import { NodeHttpHandler } from "@smithy/node-http-handler";

const s3 = new S3Client({
  endpoint: process.env.S3_URL, // RustFS endpoint
  region: "us-east-1", // can be filled arbitrarily
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "rustfskey",
    secretAccessKey: process.env.S3_SECRET_KEY || "rustfssecret",
  },
  forcePathStyle: true, // Must be enabled for RustFS compatibility
  requestHandler: new NodeHttpHandler({
    connectionTimeout: 3000,
    socketTimeout: 5000,
  }),
});

export default s3;
