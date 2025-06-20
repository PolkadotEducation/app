import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Core/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "destructive", "ghost", "link", "outline"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "icon", "sm", "lg"],
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

//color
export const Default: Story = {
  args: {
    variant: "default",
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Button",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Button",
  },
};
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Button",
  },
};

//size

export const SizeDefault: Story = {
  args: {
    size: "default",
    children: "Button",
  },
};
export const SizeIcon: Story = {
  args: {
    size: "icon",
    children: "icon",
  },
};
export const SizeLarge: Story = {
  args: {
    size: "lg",
    children: "Button",
  },
};

export const SizeSmall: Story = {
  args: {
    size: "sm",
    children: "Button",
  },
};
