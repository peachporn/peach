import { Meta, StoryObj } from "@storybook/react";
import { colors as themeColors } from "../../../../tailwind.config";

const ColorStory = ({ scales }: { scales: [string, [string, string][]][] }) => (
  <div className='flex gap-2'>
    {scales.map(([name, colors]) => (
      <div className='flex flex-col' key={name}>
        {colors.map(([color, shade]) => (
          <div key={color} className='h-16 w-32 text-xs' style={{ backgroundColor: shade }} />
        ))}
      </div>
    ))}
  </div>
);

export default {
  title: "Atoms/Color",
  component: ColorStory,
} as Meta;

export const Primary: StoryObj<typeof ColorStory> = {
  args: {
    scales: Object.entries(themeColors).map(([name, colors]) => [name, Object.entries(colors)]),
  },
};
