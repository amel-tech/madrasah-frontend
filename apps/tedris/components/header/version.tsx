import { useTranslations } from 'next-intl'
import packageJson from '../../package.json'

export default function Version() {
  const t = useTranslations('tedris')
  return (
    <span className="top-2 right-2 text-xs text-gray-500 opacity-50 hover:opacity-80 transition-opacity duration-300">
      {t('Version.appVersion')}
      {' '}
      {packageJson.version}
    </span>
  )
}
