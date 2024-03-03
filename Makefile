help:
	@cat $(MAKEFILE_LIST) | docker run --rm -i rowin1125/enrise-make-helper

# ===========================
# Snippets
# ===========================

set-ids = USERID=$$(id -u) GROUPID=$$(id -g)
docker-compose-run = docker-compose run --rm -u $$(id -u):$$(id -g)
docker-compose-exec = docker-compose exec -u $$(id -u):$$(id -g)
docker-compose-up = ${set-ids} docker-compose up -d --remove-orphans
docker-run-alpine = docker run --rm -u $$(id -u):$$(id -g) -v `pwd`:/app -w /app alpine:3.13

##
## Project commands
##

# Reset database
do-db-reset:
	@docker-compose down -v
	@docker-compose up -d
	@yarn rw prisma migrate deploy
	@yarn rw prisma db seed

do-db-reset-and-create-migration:
	@docker-compose down -v
	@docker-compose up -d
	@yarn rw prisma migrate dev
	@yarn rw prisma migrate deploy

do-seed:
	@yarn rw prisma db seed

# Create a new migration
do-migrate-create:
	@yarn rw prisma migrate dev
	@yarn rw prisma migrate deploy
