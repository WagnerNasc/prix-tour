export function decrypt(encrypted: string) {
  let base64String = ''

  for (let index = 0; index < encrypted.length; index += 2) {
    base64String += encrypted[index]
  }

  const decrypted = Buffer.from(base64String, 'base64').toString('utf8')
  return decrypted
}
