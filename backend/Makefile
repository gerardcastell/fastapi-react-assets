.PHONY: help dev

# Colors for output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
BLUE := \033[0;34m
NC := \033[0m # No Color


help:
	@echo "$(BLUE)Commands available:$(NC)"
	@echo "$(YELLOW)dev$(NC) - Run the development server"

dev:
	uv run fastapi dev main.py

