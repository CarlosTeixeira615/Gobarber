import React, { useRef, useCallback } from "react";
import { FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom";
import getValidationErros from "../../utis/GetvalidationErros";
import Input from "../../Components/input";
import Button from "../../Components/Buton";
import logoimg from "../../assets/logo.svg";

import { useToast } from "../../hooks/Toast";

import { Container, Content, AnimationContainer, Background } from "./styles";
import api from "../../services/api";

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const location = useLocation();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required("Senha obrigatória"),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref("password"), String(null)],
            "confirmaçao incorreta",
          ),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace("?token=", "");

        if (!token) {
          throw new Error();
        }

        await api.post("/password/reset", {
          password,
          password_confirmation,
          token,
        });

        history.push("/");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
        }
        addToast({
          type: "error",
          title: "Erro ao resetar a senha",
          description: "Ocorreu um erro ao resetar sua senha, tente novamente.",
        });
      }
    },
    [history, addToast, location],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <img src={logoimg} alt="Gobarber" />
            <h1>Resetar senha</h1>
            <Input
              name="password"
              icon={FiLock}
              placeholder="Nova senha"
              type="password"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              placeholder="Confirmação de senha"
              type="password"
            />
            <Button type="submit">Alterar minha senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};
export default ResetPassword;
