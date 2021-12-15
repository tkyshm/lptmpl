.PHONY: local-start

APP_ENV_FILE ?= app.env
include $(APP_ENV_FILE)
export $(shell sed 's/=.*//' $(APP_ENV_FILE))

local-start:
	air

assets/watch:
	cd assets && npm run dev
