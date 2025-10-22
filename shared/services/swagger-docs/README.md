# Swagger Documentation

This directory contains OpenAPI/Swagger specifications for different backend services.

## Structure

- `tedrisat.json` - Tedrisat service API specification
- Add more service specifications as needed (e.g., `teskilat.json`, `muhasebe.json`)

## Usage

### Generate API Clients

Generate all API clients:
```bash
npm run generate
```

Generate specific service:
```bash
npm run generate:tedrisat
```

### Adding New Services

1. Add the swagger specification file (e.g., `newservice.json`)
2. Add generation script to `package.json`:
   ```json
   "generate:newservice": "npx @openapitools/openapi-generator-cli generate -i swagger-docs/newservice.json -g typescript-fetch -o src/newservice/generated --additional-properties=typescriptThreePlus=true,supportsES6=true,npmName=@madrasah/newserviceapi"
   ```
3. Update the `generate:all` script to include the new service
4. Add export in main package exports

## Generated Files

Generated API clients are placed in `src/{service}/generated/` and are automatically regenerated during build.

**Note:** Do not manually edit generated files as they will be overwritten.
