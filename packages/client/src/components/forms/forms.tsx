import { Field, Formik, ErrorMessage, FieldProps, FormikProps } from 'formik'
import { formFields } from './data'
import { schema } from './schema'
import { z, ZodError } from 'zod'
import { PostAttraction } from '../../api/handlePost'
import { useEffect, useRef, useState } from 'react'
import {
  Button,
  ErrorDiv,
  FieldDiv,
  FormContainer,
  FormSection,
  Input,
  Spinner,
  Title,
} from './styles'

import { OptionType, loadOptions } from './loadOptions'
import { AsyncPaginate } from 'react-select-async-paginate'
import { points } from '../map/Marker'
import { controlStyles, menuListStyles } from '../selects/styles'

export type FormValues = z.infer<typeof schema>
interface FormsProps {
  newPoint?: points
  isModalOpen?: (isOpen: boolean) => void
}

type AdditionalType = {
  page: number
}

const validateForm = (values: FormValues) => {
  try {
    schema.parse(values)
  } catch (error) {
    if (error instanceof ZodError) {
      return error.formErrors.fieldErrors
    }
  }
}

const Forms = ({ newPoint, isModalOpen }: FormsProps) => {
  const [value, onChange] = useState<OptionType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const formikRef = useRef<FormikProps<FormValues>>(null)
  const setNewPoint = (newPoint: points) => {
    if (newPoint.key === '') return
    formikRef.current?.setFieldValue('latitude', String(newPoint.lat))
    formikRef.current?.setFieldValue('longitude', String(newPoint.lng))
  }

  useEffect(() => {
    if (newPoint) {
      setNewPoint(newPoint)
    }
  }, [newPoint])

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
    <FormContainer>
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
            setIsLoading(true)
            PostAttraction('/tourist-attractions', values)
            setTimeout(() => {
              setIsLoading(false)
            }, 1000)
            isModalOpen?.(false)
          } catch (error) {
            console.log(error)
          }
        }}
        validate={validateForm}
        innerRef={formikRef}
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
                    disabled={
                      newPoint?.key &&
                      (field.field === 'latitude' ||
                        field.field === 'longitude')
                    }
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
                        control: base => controlStyles(base, '36px', '100%'),
                        menuList: menuListStyles,
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
              <Button type="submit" isLoading={isLoading}>
                {isLoading ? <Spinner /> : 'Cadastrar'}
              </Button>
            </FormSection>
          </form>
        )}
      </Formik>
    </FormContainer>
  )
}

export default Forms
