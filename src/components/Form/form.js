import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import { Transition } from 'react-transition-group';
// import useFormService from '../../services/FormServise';
import './form.scss'


  const MyTextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label className={props.name}>
          {label}
          <input {...field} {...props} />
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

  const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
      <>
        <label className="checkbox">
            <input type="checkbox" {...field} {...props} />
            {props.text}
            {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

const CustomForm = ()=> {
  // const {setData} = useFormService();
  const [myButton, setMyButton] = useState(true);
  const [myModal, setMyModal] = useState(false);

  const showModal = () => {
    setMyModal(true);
    setMyButton(false)
  } 

  const duration = 300;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  }

  const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
  };
 

  const closeModal =() => {
      setMyButton(true)
      setMyModal(false)
  }

  const onChangeModal =() => {
    setTimeout(()=> {
      setMyButton(true)
      setMyModal(false)
    },3000)
  }

  const button = myButton ? <CustomButton showModal={showModal}/> : null;
  const content = myModal ? <View closeModal={closeModal} onChangeModal={onChangeModal}/> : null
  return (
        
         <>
         <Transition in={myModal} timeout={duration}>
          {state => (
            <div style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}>
              {content}
            </div>
          )}
         </Transition>
         {button}
         </>   
       
  )
}

const View = (props) => {
  const onSubmitValues = async (values) => {
    // setData(values)
    const answer = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
            })
            // .then(response => response.json())
            // .then(json => console.log(json))
            myResponse(answer);


  }

  const myResponse = (answer)=> {
      if(answer.ok) {
        const myForm = document.querySelector('.form');
        const text = document.createElement('div');
        text.classList.add('massege');
        text.textContent = 'Ваше сообщение отправлено';
        myForm.appendChild(text)
      } else {
        const myForm = document.querySelector('.form');
        const text = document.createElement('div');
        text.classList.add('massege');
        text.textContent = 'Что-то пошло не так. Попробуйте еще раз';
        myForm.appendChild(text)
      }
      document.querySelectorAll('input').forEach((item)=> {
        item.value = ""
      })
      document.querySelectorAll('select').forEach((item)=> {
        item.value = ""
      })
    }

  
  return (
    <div className='container'>
    <p className='close' onClick={()=> props.closeModal()}>Close</p>
    <Formik
                initialValues = {{
                    name:'',
                    email:'',
                    password:'',
                    checkbox: false,
                    text:'',
                    select:''
                }}
                validationSchema = {Yup.object({
                    name: Yup.string()
                            .min(2, "Минимум 2 символа"),
                    email: Yup.string()
                            .email("Не верный формат"),
                    password: Yup.string(5, "Минимум 5 символов")
                                .required("Обязательное поле"),
                    checkbox: Yup.boolean()
                                .oneOf([true], 'Необходимо согласие'),
                    select: Yup.string().required("Выбирите идин из вариантов")
                    
                })}
                onSubmit = {(values) => {(console.log(values, null, 2)); onSubmitValues(values); props.onChangeModal()}}>
                
                <Form className='form'>

                    <MyTextField label ='Your name' name="name" type="text" id="name"/>
                    <br/>
                    <MyTextField label ='Your email' name="email" type="email" id="email"/>
                    <br/>
                    <MyTextField label ='Password' name="password" type="password" id="password"/>
                    <br/>
                    <MyCheckbox label ='checkbox' text="Необходимо Ваше согласие" name="checkbox" type="checkbox" id="checkbox"/>
                    <br/>
                    <MyTextField label ='Поле для ввода Вашего сообщения' name="text" type="text" id="text"/>
                    <br/>
                    <Field
                        name="select"
                        as="select">
                            <option value="">Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                    </Field>
                    <ErrorMessage name="select" component="div"/>
                    <br/>

                    <button variant="primary" type="submit">
                        Отправить данные
                    </button>
                </Form>
            </Formik>
    </div>
  )
}

const CustomButton =(props) => {
  return (
    <div>
      <button type="button" className="simple" onClick={()=>props.showModal(true)}>Click me!</button>
    </div>
  )
}

export default CustomForm;
