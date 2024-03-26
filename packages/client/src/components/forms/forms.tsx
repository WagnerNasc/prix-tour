import { Field, Formik, ErrorMessage } from 'formik'
import { formFields } from './data'
import styled from 'styled-components'
import { schema } from './schema'
import { z, ZodError } from 'zod'
import { PostAttraction } from '../../api/handlePost'
import SelectFilter from '../Select'
import { getAll } from '../../api/handleGetAll'

const FormSection = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`

const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  margin: 0;
`

const FieldDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Input = styled.input`
  height: 2rem;
  padding-left: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
`

const ErrorDiv = styled.div`
  color: red;
  font-size: 0.9rem;
  justify-content: start;
`

const Button = styled.button`
  border: none;
  padding: 1rem;
  background-color: #363636;
  color: white;
  border-radius: 5px;
  width: 5vw;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 0.82rem;

  &:hover {
    background-color: #3f414e;
  }
`

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
  const getOptions = async () => {
    const options = await getAll('/cities')
    return options
  }
  console.log(getOptions())
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
              <SelectFilter placeholder="Cidade" options={[]} />
              <Button type="submit">Criar</Button>
            </FormSection>
          </form>
        )}
      </Formik>
    </FormSection>
  )
}

export default Forms
