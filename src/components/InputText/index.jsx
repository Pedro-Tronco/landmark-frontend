import React, { useState } from "react";
import "./input_text.css";
import { Input } from "../Input";
import { Button } from "../Button";

export const InputText = ({
  initialValue = "",
  onConfirm,
  onCancel,
}) => {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="input-text-overlay">
      <h2 className="input-text-title">Nome do ponto</h2>
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Digite o nome do ponto..."
        width="100%"
      />
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <Button onClick={() => onConfirm(value)} width="100%">
          Confirmar
        </Button>
        <Button onClick={onCancel} width="100%" style={{ background: '#eee', color: '#333' }}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};
