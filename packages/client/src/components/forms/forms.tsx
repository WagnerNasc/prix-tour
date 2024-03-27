import { Field, Formik, ErrorMessage } from 'formik'
import { formFields } from './data'
import { schema } from './schema'
import { z, ZodError } from 'zod'
import { PostAttraction } from '../../api/handlePost'
import SelectFilter from '../Select'
import { getAll } from '../../api/handleGetAll'
import { useEffect, useState } from 'react'
import { Button, ErrorDiv, FieldDiv, FormSection, Input, Title } from './styles'

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
  const [cities, setCities] = useState([])
  const [page, setPage] = useState(1)

  const getOptions = async (page: number) => {
    try {
      const options = await getAll(`/cities?page=${page}`)
      setCities(options)
      return options
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getOptions(page)
  }, [page])

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event?.target as HTMLDivElement
    console.log(target, 'target')
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setPage(prevPage => prevPage + 1)
    }
  }

  return (
    <FormSection>
      <Title>Crie uma atração</Title>
      <Formik
        initialValues={{
          name: '',
          description: '',
          latitude: '',
          longitude: '',
          image: '',
          cityId: '015f6fe0-f3e7-42a3-bc1e-c46f65ee9f50',
        }}
        onSubmit={values => {
          PostAttraction(values)
        }}
        validate={validateForm}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <FormSection>
              {formFields.map(field => (
                <FieldDiv key={field.id}>
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
              <SelectFilter
                placeholder="Cidade"
                options={cities}
                onScroll={handleScroll}
              />
              <Button type="submit">Criar</Button>
            </FormSection>
          </form>
        )}
      </Formik>
    </FormSection>
  )
}

export default Forms
