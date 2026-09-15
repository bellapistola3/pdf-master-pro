# Storage swap (local disk → S3)

Referenced from the root README, Section 3/9. `apps/api/src/services/storage.ts`
exposes: `saveBuffer`, `readFileBuffer`, `removeFile`, `listExpired`,
`assertInsideStorage`. To move to S3-compatible storage:

1. `npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner`
2. Reimplement each function against `PutObjectCommand` /
   `GetObjectCommand` / `DeleteObjectCommand`, using `config.s3.bucket`.
3. For downloads, generate a presigned URL (`getSignedUrl`) instead of
   streaming through `routes/jobs.ts::download` directly — update that
   route to redirect to the presigned URL when `S3_ENABLED=true`.
4. Keep `assertInsideStorage`'s spirit even for S3: validate that the
   requested key belongs to the job's recorded `outputFiles` before
   generating any URL, so a job ID never grants access to another job's key.
