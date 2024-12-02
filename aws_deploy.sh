touch .env
echo "NODE_ENV=${NODE_ENV}" >> .env
echo "NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}" >> .env
echo "NEXT_PUBLIC_API_DOMAIN=${NEXT_PUBLIC_API_DOMAIN}" >> .env
echo "NEXT_PUBLIC_AUTH_TOKEN=${NEXT_PUBLIC_AUTH_TOKEN}" >> .env
echo "GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}" >> .env
echo "GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}" >> .env

# curl -fsSL https://bun.sh/install

# export BUN_INSTALL="$HOME/.bun"
# export PATH="$BUN_INSTALL/bin:$PATH"
bun install
bun run build
