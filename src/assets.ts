// Пути к файлам из public. На GitHub Pages сайт живёт в подпапке,
// поэтому абсолютные пути нужно префиксовать base-путём сборки.
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
