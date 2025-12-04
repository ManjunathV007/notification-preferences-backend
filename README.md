# Notification Preferences Backend

This project implements a backend service for managing user notification preferences similar to Linkedin / Facebook / Twitter.

It implements:
- Organizations and users (Admin and Customer roles)
- Groups and topics belonging to an org
- Group-level preferences per user
- Topic/channel-level preferences per user
- Decision logic endpoint that answers whether a notification should be sent for a given org, user, topic and channel


## Tech stack
- Node.js, TypeScript
- NestJS style module structure
- TypeORM
- PostgreSQL

## Run locally

1. Start Postgres
```bash
docker-compose up -d
```

2. Install dependencies
```bash
npm install
```

3. Start server
```bash
npm run start
```

By default server runs on port 3000.

## Endpoints

- POST /orgs
  - body: { name }
- GET /orgs/:orgId/customers
- POST /orgs/:orgId/users
  - body: { email, role } role is ADMIN or CUSTOMER
- GET /orgs/:orgId/users
- POST /orgs/:orgId/groups
  - body: { name, description }
- GET /orgs/:orgId/groups
- POST /orgs/:orgId/groups/:groupId/topics
  - body: { name, description }
- PUT /users/:userId/groups/:groupId/preference
  - body: { enabled: true|false }
- PUT /users/:userId/topics/:topicId/preference
  - body: { channels: { email: true, sms: false, ... } }
- GET /users/:userId/preferences
  - returns grouped structure: groups -> topics -> channel prefs
- POST /decision
  - body: { orgId, userId, topicId, channel }
  - returns { allowed: true|false }

## Decision logic summary
1. If group preference exists and enabled is false -> allowed false
2. Else if topic preference exists and channels[channel] === true -> allowed true
3. Else -> allowed false

Note: The assignment requires default blocked for topic/channel when not set. We follow that behavior.
