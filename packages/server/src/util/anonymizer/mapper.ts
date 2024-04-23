import {
  generateBirthDate,
  generateCpf,
  generateFullName,
  generatePhone,
} from './faker'

interface Table {
  name: string
  fields: string[]
  fieldFunctions?: { [key: string]: (field: string, seed: number) => any }
}

interface Schema {
  name: string
  tables: Table[]
}

interface MapperAnonymizationData {
  schemas: Schema[]
}

const fieldFunctions = {
  // cpf
  cpf: (cpf: string) => generateCpf(cpf),
  ds_cpf: (cpf: string) => generateCpf(cpf),
  cpf_ciente: (cpf: string) => generateCpf(cpf),
  cpf_atendente: (cpf: string) => generateCpf(cpf),
  ali_cpf: (cpf: string) => generateCpf(cpf),
  con_cpf: (cpf: string) => generateCpf(cpf),
  tx_cpf: (cpf: string) => generateCpf(cpf),
  tx_cpf_resp: (cpf: string) => generateCpf(cpf),

  // name
  name: (name: string, seed: number) => generateFullName(name, seed),
  nome: (name: string, seed: number) => generateFullName(name, seed),
  atendente_nome: (name: string, seed: number) => generateFullName(name, seed),
  respondente_nome: (name: string, seed: number) =>
    generateFullName(name, seed),
  con_nome: (name: string, seed: number) => generateFullName(name, seed),
  tx_nome: (name: string, seed: number) => generateFullName(name, seed),

  // phone
  telefone: (phone: string, seed: number) => generatePhone(phone, seed),
  phone_number: (phone: string, seed: number) => generatePhone(phone, seed),

  // birth date
  birth_date: (birthDate: string, seed: number) =>
    generateBirthDate(birthDate, seed),
  data_nascimento: (birthDate: string, seed: number) =>
    generateBirthDate(birthDate, seed),
}

export interface MapperAnonymizationDataResponse {
  schema: string
  table: Table
}

export function MapperAnonymizationData(schema: string, table: string) {
  const data: MapperAnonymizationData = {
    schemas: [
      {
        name: 'ead',
        tables: [
          {
            name: 'aluno',
            fields: ['cpf', 'nome', 'telefone', 'data_nascimento'],
            fieldFunctions,
          },
          {
            name: 'aluno_empresa',
            fields: ['cpf'],
            fieldFunctions,
          },
          {
            name: 'matricula',
            fields: ['cpf'],
            fieldFunctions,
          },
        ],
      },
      {
        name: 'public',
        tables: [
          {
            name: 'individual',
            fields: ['cpf', 'name', 'phone_number', 'birth_date'],
            fieldFunctions,
          },
          {
            name: 'attendant',
            fields: ['cpf', 'name'],
            fieldFunctions,
          },
          {
            name: 'legal_entity_attendance',
            fields: ['agent_cpf'],
            fieldFunctions,
          },
          {
            name: 'itinerary',
            fields: ['agent_cpf'],
            fieldFunctions,
          },
        ],
      },
      {
        name: 'appsebrae',
        tables: [
          {
            name: 'atendimento',
            fields: [
              'atendente_cpf',
              'atendente_nome',
              'respondente_cpf',
              'respondente_nome',
              'respondente_email',
            ],
            fieldFunctions,
          },
        ],
      },
      {
        name: 'sse',
        tables: [
          { name: 'atendimento', fields: ['cpf_atendente', 'cpf_ciente'] },
        ],
      },
      {
        name: 'brasilmais',
        tables: [
          { name: 'tb_dados_ali', fields: ['ali_cpf', 'con_cpf', 'con_nome'] },
        ],
      },
      {
        name: 'radar-ali',
        tables: [
          { name: 'tb_usuario', fields: ['tx_cpf', 'tx_nome', 'tx_email'] },
          { name: 'tb_empresa', fields: ['tx_cpf_resp'] },
          { name: 'tb_executivo', fields: ['tx_cpf'] },
          { name: 'tb_sas_registro', fields: ['ds_cpf'] },
          { name: 'tb_sas_registro_problema_vinculo', fields: ['ds_cpf'] },
          { name: 'tb_sas_sp_registro_erro', fields: ['ds_cpf'] },
          { name: 'tb_sas_sp_registro_erro2', fields: ['ds_cpf'] },
        ],
      },
    ],
  }

  for (const schemaObj of data.schemas) {
    if (schemaObj.name === schema) {
      for (const tableObj of schemaObj.tables) {
        if (tableObj.name === table) {
          return {
            schema: schemaObj.name,
            table: tableObj,
          }
        }
      }
    }
  }

  return null
}
