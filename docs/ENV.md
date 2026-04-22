# ENV

## Index

- [Environment Files](#1-environment-files)
- [Required Keys](#2-required-keys-initial)
- [Loading Rule](#3-loading-rule-mandatory)
- [Startup Validation Rule](#4-startup-validation-rule)
- [Security Rules](#5-security-rules)

## 1. Environment Files

Required files under `server/`:
- `.env`
- `.env.development`
- `.env.production`
- `.env.example`

## 2. Required Keys (Initial)

- `NODE_ENV`
- `PORT`
- `MONGO_URI`
- `CLIENT_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CALLBACK_URL`

## 3. Loading Rule (Mandatory)

Always load env using explicit path resolution.

Required strategy:
- `path.resolve("server/.env")` (or matching explicit file for environment mode)

Do not rely on default `dotenv.config()` discovery behavior.

## 4. Startup Validation Rule

- Validate required env variables at startup.
- Fail fast with clear error output if any required variable is missing.

## 5. Security Rules

- Never commit secrets to source control.
- Keep `.env.example` as placeholder-only template.
- Use separate values for development and production.
