help:
	@cat $(MAKEFILE_LIST) | docker run --rm -i rowin1125/enrise-make-helper

# ===========================
# Default: help section
# ===========================

info: intro

project-name := $(shell basename $(CURDIR) | sed 's/./\U&/' | sed 's/^\(.\)/\U\1/')
cache_file := $(CURDIR)/dev/intro_cache.txt

intro:
	@if [ -f $(cache_file) ]; then \
			cat $(cache_file); \
	else \
			curl -s "https://figlet-api.onrender.com/ascii?text=$(project-name)&font=doom" | \
			jq -r '.ascii' | \
			awk '{gsub("\\n","\n"); print}' | \
			awk '{print "    "$$0}' > $(cache_file); \
			cat $(cache_file); \
	fi


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

# Initialize the project
init: intro
	@docker-compose up -d
	@yarn rw prisma migrate deploy
	@yarn rw prisma db seed
	@pm2 start ecosystem.config.js

# Reset the database
do-db-reset:
	@docker-compose down -v
	@docker-compose up -d
	@yarn rw prisma migrate deploy
	@yarn rw prisma db seed
	@pm2 restart ecosystem.config.js

# Reset the database and create a new migration
do-db-reset-and-create-migration:
	@docker-compose down -v
	@docker-compose up -d
	@yarn rw prisma migrate dev
	@yarn rw prisma migrate deploy
	@yarn rw prisma db seed
	@pm2 restart ecosystem.config.js

# Seed the database
do-seed:
	@yarn rw prisma db seed

# Create a new migration
do-migrate-create:
	@yarn rw prisma migrate dev
	@yarn rw prisma migrate deploy

do-deploy-resize-function:
	@yarn workspace images-resize-function gcp-build
	@echo "🚀 Build images-resize-function"
	@cd functions/images-resize-function && gcloud functions deploy resizeImages-dev --runtime nodejs20 --gen2 --region europe-west4 --allow-unauthenticated --memory 256Mi --trigger-bucket=bruiloft_buddy_dev --entry-point=resizeImages --env-vars-file .env.yaml && cd ../..
	@cd functions/images-resize-function && gcloud functions deploy resizeImages-prod --runtime nodejs20 --gen2 --region europe-west4 --allow-unauthenticated --memory 256Mi --trigger-bucket=bruiloft_buddy_prod --entry-point=resizeImages --env-vars-file .env.yaml && cd ../..

do-deploy-resize-all-function:
	@yarn workspace all-images-resize-function gcp-build
	@echo "🚀 Build all-images-resize-function"
	@cd functions/all-images-resize-function && gcloud functions deploy resizeImages --runtime nodejs20 --gen2 --timeout=3000 --region europe-west4 --allow-unauthenticated --memory 256Mi --trigger-http --entry-point=resizeImages --env-vars-file .env.yaml && cd ../..
