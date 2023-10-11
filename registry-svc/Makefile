dev:
	go run cmd/main.go
build:
	GOOS=linux go build -ldflags '-extldflags -static' -a -o registry-svc cmd/main.go
deploy: build
	scp -i ~/.ssh/test-linux-key.pem registry-svc .env ubuntu@ip-172-31-54-52.ec2.internal:~/.

