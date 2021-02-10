import React, { useRef, useCallback, useState } from "react";
import { FiLogIn, FiMail } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import getValidationErros from "../../utis/GetvalidationErros";
import Input from "../../Components/input";
import Button from "../../Components/Buton";
import logoimg from "../../assets/logo.svg";

import { useToast } from "../../hooks/Toast";

import { Container, Content, AnimationContainer, Background } from "./styles";
import api from "../../services/api";

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("Digite um e-mail válido")
            .email("Digite um e-mail válido"),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("/password/forgot", {
          email: data.email,
        });

        addToast({
          type: "success",
          title: "E-mail de recuperação enviado",
          description:
            "Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada",
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }
        addToast({
          type: "error",
          title: "Erro na recuperaçao de senha",
          description:
            "Ocorreu um erro ao fazer tentar realizar a recuperaçao de senha tente novamente",
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <img src={logoimg} alt="Gobarber" />
            <h1>Recuperar senha</h1>
            <Input name="email" icon={FiMail} placeholder="Email" />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
            <Link to="/"></Link>
            <Link to="/">
              <FiLogIn />
              Voltar ao login
            </Link>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};
export default ForgotPassword;
