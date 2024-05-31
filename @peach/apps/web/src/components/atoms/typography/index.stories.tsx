import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Atoms/Typography",
  component: () => (
    <>
      <h1 className='display text-7xl'>Peach</h1>
      <h2 className='display text-6xl'>Peach</h2>
      <h3 className='display text-5xl'>Peach</h3>
      <h4 className='display text-4xl'>Peach</h4>
      <h5 className='display text-3xl'>Peach</h5>
      <h6 className='display text-2xl'>Peach</h6>
      <p className='text-xl'>Sphinx of black quartz, judge my vow.</p>
      <p className='text-lg'>Sphinx of black quartz, judge my vow.</p>
      <p className='text-base'>Sphinx of black quartz, judge my vow.</p>
      <p className='text-sm'>Sphinx of black quartz, judge my vow.</p>
      <p className='text-xs'>Sphinx of black quartz, judge my vow.</p>
    </>
  ),
} as Meta;

export const Default: StoryObj = {};
