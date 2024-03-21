import { Field, Formik } from 'formik'
import { formFields } from './data'
import styled from 'styled-components'

const FormSection = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`

const Input = styled.input`
  width: 100%;
  height: 2rem;
  padding-left: 0.5rem;
`

const Button = styled.button`
  border: none;
  padding: 1rem;
  background-color: #31363f;
  color: white;
  border-radius: 5px;
  width: 5vw;

  &:hover {
    background-color: #3f414e;
  }
`

const Forms = () => (
  <FormSection>
    <h2>Crie uma atração</h2>
    <Formik
      initialValues={{
        name: '',
        description: '',
        latitude: '',
        longitude: '',
        image: '',
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <FormSection>
            {formFields.map(field => (
              <Field
                component={Input}
                type={field.type}
                name={field.field}
                placeholder={field.label}
                label={field.label}
              />
            ))}
            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <Button type="submit">Criar</Button>
          </FormSection>
        </form>
      )}
    </Formik>
  </FormSection>
)

export default Forms
