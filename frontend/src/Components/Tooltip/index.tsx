import React from "react";
import { Container } from "./styles";

interface TooltipPoops {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipPoops> = ({
  title,
  className = "",
  children,
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
