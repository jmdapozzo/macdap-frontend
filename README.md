npm run build
docker buildx build --no-cache --platform linux/amd64,linux/arm64 -t jmdapozzo/macdap-frontend . --push

