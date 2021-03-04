import React, { useCallback, useRef } from 'react'
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import getValidationErros from '../../utils/getValidationErros'

import LogoImg from '../../assets/logo.svg'

import Input from '../../components/Input/index'
import Button from '../../components/Button/index'

import { Container, Content, Background } from './styles'

const SignUp: React.FC = () => {

    const formRef = useRef<FormHandles>(null)

    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({})

            const schema = Yup.object().shape({
                name: Yup.string()
                        .required('Nome é obrigatório'),
                email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'Mínimo de 6 digitos')
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
            <Background />
            <Content>
                <img src={LogoImg} alt="GoBarber" />
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu Cadastro</h1>

                    <Input name="name" icon={FiUser} placeholder="Nome"/>
                    <Input name="email" icon={FiMail} placeholder="E-mail"/>
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

                    <Button type="submit">Cadastrar</Button>

                </Form>
                <a href="login">
                    <FiArrowLeft />
                    Voltar para Logon
                </a>
            </Content>
        </Container>
    )
}

export default SignUp;