.PHONY: local-start

APP_ENV_FILE ?= app.env
export $(shell sed 's/=.*//' $(APP_ENV_FILE))

local-start:
	air

assets/watch:
	cd assets && npm run dev
