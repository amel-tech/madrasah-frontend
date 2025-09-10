import packageJson from '../../package.json'

export default function Version() {
  return (
    <span className="top-2 right-2 text-xs text-gray-500 opacity-50 hover:opacity-80 transition-opacity duration-300">
      v
      {packageJson.version}
    </span>
  )
}
