.PHONY: help dev install-dev lint format precommit clean

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
	@echo "$(YELLOW)clean$(NC) - Clean the project"
dev:
	uv run fastapi dev main.py

install-dev:
	uv sync --group dev
	uv run pre-commit install

lint:
	uv run ruff check .
	uv run mypy --config-file=pyproject.toml .

format:
	uv run ruff format .
	uv run ruff check --fix .

precommit:
	uv run pre-commit run --all-files

clean:
	rm -rf `find . -name __pycache__`
	rm -f `find . -type f -name '*.py[co]' `
	rm -f `find . -type f -name '*~' `
	rm -f `find . -type f -name '.*~' `
	rm -rf dist *.egg-info
	rm -rf .cache
	rm -rf .pytest_cache
	rm -f coverage
	rm -f coverage.*
	rm -rf artifacts/*
