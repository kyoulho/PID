// pages/admin/strategy-editor.tsx
import { FC, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import yaml from "js-yaml";
import { GetServerSideProps } from "next";

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

interface StrategyEditorProps {
  initialStrategy?: string;
}

const StrategyEditor: FC<StrategyEditorProps> = ({ initialStrategy }) => {
  const [code, setCode] = useState(initialStrategy || "");
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEditorChange = (newValue: string) => {
    setCode(newValue);
  };

  const saveStrategy = async () => {
    try {
      const parsed = yaml.load(code);
      await axios.post("/api/strategies/save", { algorithm: code });
      alert("Strategy saved successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save strategy. Please check the YAML syntax.");
    }
  };

  const runStrategy = async () => {
    try {
      // 실제 저장된 전략의 ID로 대체해야 합니다.
      const strategyId = "strategy-id";
      const response = await axios.get(`/api/strategies/${strategyId}/exec`);
      setOutput(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to execute strategy.");
    }
  };

  return (
    <div>
      <h1>Strategy Editor</h1>
      <MonacoEditor
        width="800"
        height="600"
        language="yaml"
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
      />
      <button onClick={saveStrategy}>Save Strategy</button>
      <button onClick={runStrategy}>Run Strategy</button>
      {output && <div>Execution Result: {output}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let initialStrategy = "";
  if (id && typeof id === "string") {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/strategies/${id}`,
      );
      initialStrategy = response.data.algorithm;
    } catch (error) {
      console.error("Failed to fetch strategy:", error);
    }
  }
  return { props: { initialStrategy } };
};

export default StrategyEditor;
