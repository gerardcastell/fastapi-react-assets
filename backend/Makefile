.PHONY: help dev install-dev lint format precommit

# Colors for output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
BLUE := \033[0;34m
NC := \033[0m # No Color


help:
	@echo "$(BLUE)Commands available:$(NC)"
	@echo "$(YELLOW)dev$(NC) - Run the development server"
	@echo "$(YELLOW)install-dev$(NC) - Install development dependencies"
	@echo "$(YELLOW)lint$(NC) - Run linting and type checking"
	@echo "$(YELLOW)format$(NC) - Format code"
	@echo "$(YELLOW)precommit$(NC) - Run pre-commit hooks"

dev:
	uv run fastapi dev main.py

install-dev:
	uv sync --group dev
	uv run pre-commit install

lint:
	uv run ruff check .
	uv run mypy .

format:
	uv run ruff format .
	uv run ruff check --fix .

precommit:
	uv run pre-commit run --all-files
