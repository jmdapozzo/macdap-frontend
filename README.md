npm run build
docker build -t jmdapozzo/macdap-frontend . 
docker run -p 3600:8080 jmdapozzo/macdap-frontend
docker buildx build -t jmdapozzo/macdap-frontend . --platform linux/amd64,linux/arm64 && docker push jmdapozzo/macdap-frontend
docker push jmdapozzo/macdap-frontend:latest
