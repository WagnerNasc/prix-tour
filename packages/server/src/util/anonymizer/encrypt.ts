export function encrypt(value: string, secret: string) {
  const base64String = Buffer.from(value, 'utf8').toString('base64')
  let encrypted = ''

  for (let index = 0; index < base64String.length; index++) {
    encrypted += base64String[index] + secret[index]
  }

  return encrypted
}
