# Copilot Instructions for Power Apps Code Apps

## Project Context
This repository contains examples of Power Apps Code Apps, demonstrated at M365 Community Days DC 2026. It showcases how to build modern, code-first applications using Power Apps with TypeScript/JavaScript.

## Key Areas to Understand

### Power Apps Code Apps Architecture
- **Model**: Code Apps use a TypeScript/JavaScript-first development experience
- **Runtime**: Runs on Power Platform with server-side logic and client-side UI components
- **Project Structure**: Typically includes:
  - Source code in `src/` or similar (components, services, types)
  - Configuration files (`tsconfig.json`, build configs)
  - Package dependencies in `package.json`

### Development Workflow
- **Build Process**: Compilation from TypeScript to target format for Power Apps
- **Testing**: Unit tests typically run via npm/yarn test scripts
- **Deployment**: Publishing to Power Platform environments via CLI or VS Code extensions

### Common Patterns
- **Component-based UI**: Similar to React/Vue patterns but using Power Apps components
- **Type Safety**: Strict TypeScript with interfaces for Power Apps APIs
- **State Management**: Use Power Apps data model or application-level state as needed

## When Adding Features or Debugging
1. Check package.json for available scripts and dependencies
2. Understand the component hierarchy and data flow from entry point
3. Refer to official Power Apps Code Apps documentation when using platform-specific APIs
4. Maintain TypeScript strict mode and type definitions
5. Follow existing naming conventions and folder structure patterns

## External Resources
- [Power Apps Code Apps Documentation](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/code-apps)
- [Power Platform Developer Tools](https://learn.microsoft.com/en-us/power-platform/developer/tools)
