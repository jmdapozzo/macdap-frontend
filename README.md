https://www.docker.com/blog/how-to-dockerize-react-app/

npm run build
docker build -t jmdapozzo/macdap-frontend . 
docker run -p 3600:3600 jmdapozzo/macdap-frontend
docker push jmdapozzo/macdap-frontend:latest

npm run build
docker buildx build -t jmdapozzo/macdap-frontend . --platform linux/amd64,linux/arm64 && docker push jmdapozzo/macdap-frontend
