/**
 * Source:
 * https://docs.tolgee.io/tolgee-cli/project-configuration
 **/
import dotenv from 'dotenv'
import process from 'process'

dotenv.config()

export default {
  projectId: process.env.TOLGEE_PROJECT_ID || '',
  apiKey: process.env.TOLGEE_API_KEY || '',
  format: 'JSON_TOLGEE',

  push: {
    filesTemplate: ['./src/locales/{languageTag}/{namespace}.json'],
    languages: ['en', 'tr', 'ar'],
    tagNewKeys: ['from_dev'],
    namespaces: ['tedris', 'nizam', 'nazir', 'common'],
  },

  pull: {
    path: './src/locales',
    fileStructureTemplate: '{languageTag}/{namespace}.{extension}',
    languages: ['en', 'tr', 'ar'],
    format: 'JSON_TOLGEE',
    states: ['TRANSLATED', 'REVIEWED'],
  },
}
