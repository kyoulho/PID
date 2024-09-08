import { Meta, StoryObj } from "@storybook/react";
import DarkModeToggle from "@/components/molecules/DarkModeToggle";

const meta: Meta<typeof DarkModeToggle> = {
  title: "Molecules/DarkModeToggle",
  component: DarkModeToggle,
};

export default meta;

type Story = StoryObj<typeof DarkModeToggle>;

// 기본 스토리
export const Default: Story = {
  render: () => <DarkModeToggle />,
};
