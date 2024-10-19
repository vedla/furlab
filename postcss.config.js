/**
 * Configuration for PostCSS plugins.
 * @module postcss.config
 */

module.exports = {
  /**
   * List of PostCSS plugins to be used.
   * @type {Object}
   */
  plugins: {
    /**
     * Plugin for integrating Tailwind CSS with PostCSS.
     * @type {Object}
     */
    tailwindcss: {},

    /**
     * Plugin for adding vendor prefixes to CSS rules.
     * @type {Object}
     */
    autoprefixer: {},
  },
};
