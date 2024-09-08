import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/atoms/Button";

// Button 컴포넌트의 메타 데이터를 설정합니다.
const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"], // Storybook 8에서 도큐먼트 자동 생성을 위한 태그
  argTypes: {
    onClick: { action: "clicked" },
    className: {
      control: "text",
      description: "Button의 추가적인 CSS 클래스",
      defaultValue: "btn-primary",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 기본 Button 스토리
export const Default: Story = {
  args: {
    children: "기본 버튼",
    className: "btn-primary", // DaisyUI의 기본 버튼 스타일
  },
};

// secondary 스타일의 Button 스토리
export const Secondary: Story = {
  args: {
    children: "Secondary 버튼",
    className: "btn-secondary", // DaisyUI의 Secondary 버튼 스타일
  },
};

// 비활성화된 버튼
export const Disabled: Story = {
  args: {
    children: "비활성화된 버튼",
    disabled: true,
    className: "btn-primary",
  },
};
