import { Meta, StoryObj } from "@storybook/react";
import InputFloatingLabel from "@/components/ui/inputFloatingLabel";

const meta = {
  title: "Core/Input",
  component: InputFloatingLabel,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InputFloatingLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Floating Label",
    id: "label",
    value: "",
    error: "",
  },
};

export const Disabled: Story = {
  args: {
    label: "Floating Label",
    id: "disabled-label",
    value: "",
    error: "",
    disabled: true,
  },
};
