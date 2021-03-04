import React, { useRef, useCallback } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { FormHandles }  from '@unform/core'
import { Form }  from '@unform/web'
import * as Yup from 'yup'

import getValidationErros from '../../utils/getValidationErros'
import LogoImg from '../../assets/logo.svg'

import Input from '../../components/Input/index'
import Button from '../../components/Button/index'

import { Container, Content, Background } from './styles'

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null)

    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({})

            const schema = Yup.object().shape({
                email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um e-mail válido'),
                password: Yup.string().required('Senha é obrigatório')
            })
            await schema.validate(data, {
                abortEarly: false
            })
            
            formRef.current?.setErrors

        }
        catch (err) {
            console.log(err)
            const errors = getValidationErros(err)

            formRef.current?.setErrors(errors)
        }
    }, [])
    return (
    <Container>
        <Content>
            <img src={LogoImg} alt="GoBarber" />
            <Form ref={formRef} onSubmit={handleSubmit}> 
                <h1>Faça seu logon</h1>

                <Input name="email" icon={FiMail} placeholder="E-mail"/>
                <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

                <Button type="submit">Entrar</Button>

                <a href="forgot">Esqueci minha senha</a>
            </Form>
            <a href="login">
                <FiLogIn />
                Criar Conta
            </a>
        </Content>
        <Background />
    </Container>

    )}
export default SignIn;