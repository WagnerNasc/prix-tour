import { faker } from '@faker-js/faker/locale/pt_BR'
import { encrypt } from './encrypt'
import { env } from 'src/env'

// type genderType = 'female' | 'male' | undefined

export function generateFullName(_name: string, seed: number) {
  faker.seed(seed)

  return faker.person.fullName()
}

export function generateEmail(_email: string, seed: number) {
  faker.seed(seed)

  const fullName = faker.person.fullName().toLowerCase()
  const nameWithoutSpaces = fullName.replace(/\s/g, '').toLowerCase()

  const email = `${nameWithoutSpaces}@test.com`

  return email
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateCpf(cpf: string, _seed?: number) {
  const anonymizedCpf = cpf ? encrypt(cpf, env.ANONYMIZATION_SECRET) : cpf
  return anonymizedCpf
}

export function generateCnpj(_cnpj: string, seed: number) {
  faker.seed(seed)

  const maxNumber = 9
  const firstNumber = faker.number.int({ min: 1, max: maxNumber })
  const numbers = Array.from(Array(13).keys()).map(() =>
    faker.number.int(maxNumber),
  )

  const firstTwoNumbers = `${firstNumber}${numbers[0]}`
  const firstRowOfThreeNumbers = `${numbers[1]}${numbers[2]}${numbers[3]}`
  const secondRowOfThreeNumbers = `${numbers[4]}${numbers[5]}${numbers[6]}`
  const fourNumbersAfterSlash = `${numbers[7]}${numbers[8]}${numbers[9]}${numbers[10]}`
  const verificationDigits = `${numbers[11]}${numbers[12]}`

  const cnpj = `${firstTwoNumbers}.${firstRowOfThreeNumbers}.${secondRowOfThreeNumbers}/${fourNumbersAfterSlash}-${verificationDigits}`

  return cnpj
}

export function generateBirthDate(_birthDate: string, seed: number) {
  faker.seed(seed)
  return faker.date.past().toLocaleDateString('pt-BR') ?? ''
}

export function generatePhone(_phone: string, seed: number) {
  faker.seed(seed)
  const phone = faker.phone.number()
  const phoneWithoutDDI = phone[0] === '+' ? phone.slice(4) : phone

  return phoneWithoutDDI
}
