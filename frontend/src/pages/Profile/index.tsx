import React, { ChangeEvent, FormEvent, useCallback, useRef } from "react";
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";
import { useToast } from "../../hooks/Toast";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Form } from "@unform/web";

import getValidationErros from "../../utis/GetvalidationErros";

import { Container, Content, AvatarInput } from "./styles";

import Input from "../../Components/input";
import Button from "../../Components/Buton";
import { useAuth } from "../../hooks/Auth";

interface Profileformdata {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: Profileformdata) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .required("Digite um e-mail válido")
            .email("Digite um e-mail válido"),
          old_password: Yup.string(),
          password: Yup.string().when("old_password", {
            is: vall => !!vall.length,
            then: Yup.string().required("Campo obrigatorio"),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when("old_password", {
              is: vall => !!vall.length,
              then: Yup.string().required("Campo obrigatorio"),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref("password"), String(null)],
              "confirmaçao incorreta",
            ),
        });

        await schema.validate(data, {
          abortEarly: true,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = Object.assign(
          {
            name,
            email,
          },
          data.old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {},
        );

        const response = await api.put("/profile", formData);
        updateUser(response.data);

        history.push("/dashboard");

        addToast({
          type: "success",
          title: "Perfil atualizado!",
          description:
            "Suas informações do perfil foram atualizadas com sucesso!",
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: "error",
          title: "Erro na atualização",
          description: "Ocorreu um erro ao atualizar perfil, tente novamente.",
        });
      }
    },
    [history, addToast],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append("avatar", e.target.files[0]);
        api.patch("/users/avatar", data).then(response => {
          updateUser(response.data);
          addToast({
            type: "success",
            title: "Avatar atualizado",
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>
          <h1>Meu perfil</h1>
          <Input name="name" icon={FiUser} placeholder="Name" />
          <Input name="email" icon={FiMail} placeholder="Email" />
          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={FiLock}
            placeholder="Senha atual"
            type="password"
          />
          <Input
            name="password"
            icon={FiLock}
            placeholder="Nova senha"
            type="password"
          />
          <Input
            name="password_confirmation"
            icon={FiLock}
            placeholder="Confirmar senha"
            type="password"
          />
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};
export default Profile;
