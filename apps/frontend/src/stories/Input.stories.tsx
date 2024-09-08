import { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/atoms/Input";

// Storybook 메타 데이터 설정
const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "number"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

// 기본 스토리
export const Default: Story = {
  args: {
    placeholder: "Type something...",
  },
};

// 비활성화된 Input 필드 스토리
export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

// 다양한 타입의 Input 필드 스토리
export const PasswordInput: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password",
  },
};
