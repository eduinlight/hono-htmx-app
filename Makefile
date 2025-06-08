SHELL=/bin/bash

JS_IMAGE_NAME=oven/bun:1.2.15-alpine
CONTAINER_WORKING_DIR=/user/bun/app
UID := $(shell id -u)
GID := $(shell id -g)

all: install

reset: uninstall install

install: compose-build bun-install compose-up wait-for-front

uninstall: compose-down-removing-volumes

restart: stop start

start: compose-up

stop: compose-down

format:
	@docker run --rm -u $(GID):$(UID) -v .:$(CONTAINER_WORKING_DIR) -w $(CONTAINER_WORKING_DIR) $(JS_IMAGE_NAME) bunx biome format --write

lint:
	@docker run --rm -u $(GID):$(UID) -v .:$(CONTAINER_WORKING_DIR) -w $(CONTAINER_WORKING_DIR) $(JS_IMAGE_NAME) bunx biome lint --write

check:
	@docker run --rm -u $(GID):$(UID) -v .:$(CONTAINER_WORKING_DIR) -w $(CONTAINER_WORKING_DIR) $(JS_IMAGE_NAME) bunx biome check --write

test:
	@echo "No tests to run"

enter: 
	@docker compose exec -it front bash

# UTILS
bun-install:
	@docker run --rm -u $(UID):$(GID) -v .:$(CONTAINER_WORKING_DIR) -w $(CONTAINER_WORKING_DIR) $(JS_IMAGE_NAME) bun install

compose-build:
	@docker compose build

compose-up:
	@docker compose up -d

compose-down:
	@docker compose down
	@echo "Docker containers down"

compose-restart:
	@docker compose up -d --force-recreate

compose-down-removing-volumes: 
	@docker compose down -v

wait-for-http:
	@echo "Waiting for $(URL) to be ready..."
	@until curl --silent --fail --output /dev/null $(URL); do \
		echo "⏳ Service at $(URL) not ready yet. Retrying..."; \
		sleep 2; \
	done
	@echo "✅ Service at $(URL) is ready!"

wait-for-front:
	@make wait-for-http URL=http://localhost:3000

