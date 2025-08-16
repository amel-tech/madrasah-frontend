// Import the Tailwind configuration as a dynamic import
// This is necessary since the tailwind.config.js uses CommonJS module.exports format
// We need to use an async import to handle this properly

/**
 * Gets the Tailwind configuration from the build directory
 * @returns {Promise<object>} The Tailwind configuration object
 */
export async function getTailwindConfig() {
  // Using dynamic import to load the CommonJS module
  const config = await import('./build/web/tailwind.config.js');
  return config.default || config;
}

// Export a direct reference to the config file path for tools that need to require it directly
export const tailwindConfigPath = './build/web/tailwind.config.js';

// Export a CommonJS-compatible version for backwards compatibility
const defaultExport = {
  path: tailwindConfigPath,
  getTailwindConfig,
};

export default defaultExport;
