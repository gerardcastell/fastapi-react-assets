# Cypress E2E Testing Guide

This directory contains end-to-end (E2E) tests for the Assets Manager application using Cypress.

## 📁 Structure

```
cypress/
├── e2e/                      # Test specifications
│   ├── home-page.cy.ts       # Tests for the home page
│   ├── create-assets.cy.ts   # Tests for asset creation
│   ├── interest-rate-display.cy.ts  # Tests for interest rate display
│   └── full-user-flow.cy.ts  # Complete end-to-end user flows
├── fixtures/                 # Test data
│   └── example.json          # Sample asset data
├── support/                  # Support files
│   ├── commands.ts           # Custom Cypress commands
│   └── e2e.ts                # E2E support file
└── tsconfig.json             # TypeScript configuration for Cypress

```

## 🚀 Getting Started

### Prerequisites

1. Make sure you have Node.js installed (v18 or higher)
2. Install dependencies:

   ```bash
   npm install
   ```

3. Install the `start-server-and-test` package (if not already installed):
   ```bash
   npm install --save-dev start-server-and-test wait-on
   ```

### Running Tests

#### Interactive Mode (Cypress UI)

Open Cypress Test Runner for development and debugging:

```bash
npm run cypress:open
```

Or with the dev server automatically started:

```bash
npm run test:e2e:open
```

#### Headless Mode (CI/CD)

Run all tests in headless mode:

```bash
npm run cypress:run
```

With the dev server automatically started:

```bash
npm run test:e2e
```

Run tests in a specific browser:

```bash
npm run cypress:run:chrome
npm run cypress:run:firefox
```

## 📝 Test Coverage

### Home Page Tests (`home-page.cy.ts`)

- ✅ Display home page with correct content
- ✅ Display "Create Assets" button
- ✅ Navigate to asset creation page
- ✅ Display average interest rate section
- ✅ Display instructions text

### Create Assets Tests (`create-assets.cy.ts`)

- ✅ Display create assets form
- ✅ Display one asset form by default
- ✅ Add new asset forms dynamically
- ✅ Delete asset forms
- ✅ Fill in asset form fields
- ✅ Submit valid assets
- ✅ Create multiple assets
- ✅ Validate empty fields
- ✅ Handle API errors
- ✅ Complex workflows (add, fill, remove)

### Interest Rate Display Tests (`interest-rate-display.cy.ts`)

- ✅ Display average interest rate component
- ✅ Display "--" when no data available
- ✅ Display interest rate when available
- ✅ Format with 2 decimal places
- ✅ Display loading state
- ✅ Display error messages
- ✅ Handle edge cases (zero, negative, large values)

### Full User Flow Tests (`full-user-flow.cy.ts`)

- ✅ Complete workflow from home to creating assets
- ✅ Navigation between pages
- ✅ Multiple asset creation sessions

## 🛠️ Custom Commands

We've created custom Cypress commands to make tests more readable and maintainable:

### `cy.fillAssetForm(index, id, interestRate)`

Fills in an asset form at the specified index.

```typescript
cy.fillAssetForm(0, "ASSET-001", 5.5);
```

### `cy.interceptGetAverageInterestRate(rate?, statusCode?)`

Intercepts the GET average interest rate API call.

```typescript
// Success case
cy.interceptGetAverageInterestRate(5.75);

// Error case
cy.interceptGetAverageInterestRate(undefined, 404);
```

### `cy.interceptPostAssets(statusCode?)`

Intercepts the POST assets API call.

```typescript
// Success case
cy.interceptPostAssets(201);

// Error case
cy.interceptPostAssets(500);
```

## 🎯 Best Practices

### 1. Use Custom Commands

Instead of:

```typescript
cy.get('input[name="assets.0.id"]').clear().type("ASSET-001");
cy.get('input[name="assets.0.interestRate"]').clear().type("5.5");
```

Use:

```typescript
cy.fillAssetForm(0, "ASSET-001", 5.5);
```

### 2. Intercept API Calls

Always intercept API calls in tests to:

- Control test data
- Test error scenarios
- Make tests faster and more reliable
- Avoid dependency on backend state

```typescript
cy.interceptPostAssets(201);
cy.contains("button", "Create Assets").click();
cy.wait("@postAssets");
```

### 3. Use Descriptive Test Names

```typescript
it("should successfully create multiple assets and display them", () => {
  // Test code
});
```

### 4. Clean State Between Tests

Each test should be independent:

```typescript
beforeEach(() => {
  cy.visit("/");
});
```

## 🔧 Configuration

### Base URL

The base URL is configured in `cypress.config.ts`:

```typescript
baseUrl: "http://localhost:5173";
```

### Viewport

Default viewport size: 1280x720

### Screenshots and Videos

- Screenshots: Captured on test failure
- Videos: Disabled by default (can be enabled in config)

## 🐛 Debugging

### Interactive Mode

Use `cy.debug()` or `cy.pause()` in your tests:

```typescript
cy.fillAssetForm(0, "ASSET-001", 5.5);
cy.pause(); // Pause test execution
cy.contains("button", "Create Assets").click();
```

### Chrome DevTools

In Cypress UI, you can:

1. Click on any command to see the DOM snapshot
2. Open Chrome DevTools (F12) for advanced debugging
3. Use the selector playground to find elements

### Console Logs

View Cypress commands in the console:

```typescript
cy.log("Starting asset creation test");
```

## 📊 CI/CD Integration

The tests are configured to run in GitHub Actions. See `.github/workflows/cypress-tests.yml` for the configuration.

The workflow:

1. Runs on push to main/develop branches
2. Runs on pull requests
3. Tests in both Chrome and Firefox
4. Uploads screenshots on failure
5. Uploads videos for all test runs

## 🔗 Useful Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [TypeScript with Cypress](https://docs.cypress.io/guides/tooling/typescript-support)

## 📋 Checklist for New Tests

When adding new tests:

- [ ] Test is independent and can run alone
- [ ] API calls are intercepted
- [ ] Test has clear, descriptive name
- [ ] Follows existing patterns and conventions
- [ ] Includes both success and error scenarios
- [ ] Uses custom commands where appropriate
- [ ] Cleans up after itself

## 🤝 Contributing

When contributing new tests:

1. Follow the existing test structure
2. Add tests in the appropriate file
3. Create new custom commands if needed
4. Update this README if adding new features
5. Ensure all tests pass before submitting PR
