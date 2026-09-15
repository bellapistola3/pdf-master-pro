# Database schema (target, for the Postgres/Prisma migration)

Referenced from the root README, Section 9. Suggested Prisma models,
matching the tables named in the original product spec:

- `User` (id, email, passwordHash, plan, createdAt)
- `File` (id, ownerId nullable, anonymousId nullable, path, sizeBytes, mimeType, expiresAt)
- `Job` (id, ownerId nullable, anonymousId nullable, toolType, status, inputFileIds[], outputFileIds[], errorMessage, createdAt, completedAt, expiresAt)
- `Subscription` (id, userId, stripeCustomerId, stripeSubscriptionId, plan, status, currentPeriodEnd)
- `UsageLimit` (id, userId nullable, anonymousId nullable, date, opsCount)
- `Payment` (id, userId, stripeInvoiceId, amount, currency, status, createdAt)
- `AuditLog` (id, actorId, action, targetType, targetId, metadata, createdAt)

`apps/api/src/services/jobStore.ts` documents the exact function contract
(`createJob`, `getJob`, `updateJob`, `listJobsForUser`, `listAllJobs`,
`deleteJob`) that a Prisma-backed repository needs to implement so no
caller code changes.
