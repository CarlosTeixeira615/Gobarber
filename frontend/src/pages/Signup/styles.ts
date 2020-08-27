import styled, { keyframes } from "styled-components";
import { shade } from "polished";
import SignUPBackgroundImg from "../../assets/Sing-up-background.png";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;
export const Content = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
  }
  img {
    margin-bottom: 35px;
  }
  svg {
    margin-left: 5px;
  }
  h1 {
    margin-bottom: 24px;
  }
  svg {
    margin-right: 16px;
  }

  a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, "#f4ede8")};
    }
    & + a {
      color: #ff9000;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      align-items: center;

      &:hover {
        color: ${shade(0.2, "#ff9000")};
      }
    }
  }
`;
export const Background = styled.div`
  flex: 1;
  background: url(${SignUPBackgroundImg}) no-repeat center;
  background-size: cover;
`;
const appearFromLeft = keyframes`
from {
  opacity:0;
  transform: translatex(50px);
}
to{
  opacity:1;
  transform: translate(0px);
}
`;

export const AnimationContainer = styled.div`
  animation: ${appearFromLeft} 1s;
`;
