import { Field, Formik, ErrorMessage, FieldProps } from 'formik'
import { formFields } from './data'
import { schema } from './schema'
import { z, ZodError } from 'zod'
import { PostAttraction } from '../../api/handlePost'
import { useState } from 'react'
import { Button, ErrorDiv, FieldDiv, FormSection, Input, Title } from './styles'

import { OptionType, loadOptions } from './loadOptions'
import { AsyncPaginate } from 'react-select-async-paginate'

export type FormValues = z.infer<typeof schema>

const validateForm = (values: FormValues) => {
  try {
    schema.parse(values)
  } catch (error) {
    if (error instanceof ZodError) {
      return error.formErrors.fieldErrors
    }
  }
}

const Forms = () => {
  const [value, onChange] = useState<OptionType | null>(null)

  type AdditionalType = {
    page: number
  }

  const defaultAdditional: AdditionalType = {
    page: 1,
  }

  const loadPageOptions = async (
    q: string,
    _: unknown,
    { page }: AdditionalType
  ) => {
    const { options, hasMore } = await loadOptions(q, page)

    return {
      options,
      hasMore,

      additional: {
        page: page + 1,
      },
    }
  }

  return (
    <div
      style={{
        width: '30vw',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Title>Crie uma atração</Title>
      <Formik
        initialValues={{
          name: '',
          description: '',
          latitude: '',
          longitude: '',
          imageLink: '',
          cityId: '',
        }}
        onSubmit={values => {
          try {
            PostAttraction(values)
          } catch (error) {
            console.log(error)
          }
        }}
        validate={validateForm}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <FormSection>
              {formFields.map(field => (
                <FieldDiv key={field.id}>
                  <label htmlFor={field.field}>{field.label}:</label>
                  <Field
                    as={Input}
                    type={field.type}
                    name={field.field}
                    placeholder={field.label}
                    label={field.label}
                  />
                  <ErrorMessage name={field.field} component={ErrorDiv} />
                </FieldDiv>
              ))}
              <Field name="cityId">
                {({ field, form }: FieldProps) => (
                  <FieldDiv>
                    <label htmlFor="cityId">Cidade:</label>
                    <AsyncPaginate
                      {...field}
                      additional={defaultAdditional}
                      value={value}
                      loadOptions={loadPageOptions}
                      styles={{
                        control: baseStyles => ({
                          ...baseStyles,
                          fontSize: '1rem',
                          fontFamily: 'Roboto',
                          height: 35,
                        }),
                        menuList: baseStyles => ({
                          ...baseStyles,
                          height: '200px',
                        }),
                      }}
                      loadingMessage={() => 'Carregando...'}
                      onChange={(selectedOption: OptionType | null) => {
                        onChange(selectedOption)
                        form.setFieldValue(
                          field.name,
                          selectedOption ? selectedOption.value : ''
                        )
                      }}
                      placeholder="Selecione uma cidade"
                    />
                    <ErrorMessage name={'cityId'} component={ErrorDiv} />
                  </FieldDiv>
                )}
              </Field>
              <Button type="submit">Criar</Button>
            </FormSection>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default Forms
