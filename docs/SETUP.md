# SETUP

## Index

- [Prerequisites](#1-prerequisites)
- [Project Install](#2-project-install)
- [Environment Preparation](#3-environment-preparation)
- [Running Servers](#4-running-servers)
- [Startup Sequence](#5-startup-sequence)
- [Health Checks](#6-health-checks)

## 1. Prerequisites

- Node.js LTS
- npm
- MongoDB (local or remote)

## 2. Project Install

From repo root:

- Install root dependencies
- Install client dependencies
- Install server dependencies

## 3. Environment Preparation

Create and configure:
- `server/.env`
- `server/.env.development`
- `server/.env.production`
- `server/.env.example`

Refer to `ENV.md` for required keys and loading rules.

## 4. Startup Validation Goals (Phase 0)

- Frontend starts and serves shell UI
- Backend starts without env errors
- DB connection string resolves from explicit env path
- Health route returns standardized payload

## 5. Important Scope Rule

Current setup phase is **documentation and structure only**. Feature code generation begins only in subsequent phases.
