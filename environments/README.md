# Environment Management

This directory contains environment configuration files for the Polkadot Education monorepo.

## File Structure

### Environment Files
- `.api` - API service environment variables
- `.app` - App service environment variables

## Usage

### Development
```bash
# Start all services with Docker
bun run dev

# Or directly with Docker Compose
docker compose up
```

The environment files are automatically loaded by Docker Compose.

### Database Operations
```bash
# All database operations use the API environment
bun run db:seed:all
bun run db:reset
bun run db:drop:all
```

## Environment Variables

### API Variables
- `NODE_ENV` - Environment (local, production)
- `MONGODB_URI` - MongoDB connection string
- `SERVER_HOST` - API server host
- `SERVER_PORT` - API server port
- `JWT_SECRET` - JWT signing secret
- `AUTH_CODE` - Authentication code
- `CRYPTO_SALT` - Crypto salt for encryption
- `AWS_SES_*` - AWS SES configuration
- `SIGNER_*` - Polkadot signer configuration
- `APP_URL` - Frontend app URL

### App Variables
- `NEXT_PUBLIC_BASE_URL` - App base URL
- `NEXT_PUBLIC_API_DOMAIN` - API domain
- `NEXT_PUBLIC_AUTH_TOKEN` - Auth token
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `POLKADOT_WSS_API` - Polkadot WebSocket API

## Security Notes

- Never commit production secrets to version control
- Use environment variables for sensitive data
- Keep `.env` files in `.gitignore`
- Use different secrets for different environments
