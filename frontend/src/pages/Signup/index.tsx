import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiMail, FiUser, FiLock } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";
import { useToast } from "../../hooks/Toast";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Form } from "@unform/web";

import getValidationErros from "../../utis/GetvalidationErros";

import { Container, Background, AnimationContainer, Content } from "./styles";

import Input from "../../Components/input";
import Button from "../../Components/Buton";

import logo from "../../assets/logo.svg";

interface SignUpformdata {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpformdata) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .required("Digite um e-mail válido")
            .email("Digite um e-mail válido"),
          password: Yup.string().min(6, "Senha muito curta"),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/users", data);
        history.push("/");
        addToast({
          type: "success",
          title: "Cadastro realizado!",
          description: "Você já pode fazer seu login",
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }
        addToast({
          type: "error",
          title: "Erro no Cadastro",
          description: "Ocorreu um erro ao fazer longin, cheque as credenciais",
        });
      }
    },
    [history, addToast],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <img src={logo} alt="Gobarber" />
            <h1>Faça seu Cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="Name" />
            <Input name="email" icon={FiMail} placeholder="Email" />
            <Input
              name="password"
              icon={FiLock}
              placeholder="Senha"
              type="password"
            />
            <Button type="submit">Cadastrar</Button>
            <Link to="/">
              <FiArrowLeft />
              Voltar para logon
            </Link>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default SignUp;
