import DropdownInput from '@/components/Input/DropdownInput';
import { type Meta, type StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/Input',
  component: DropdownInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: '카테고리',
    required: true,
    list: [
      {
        label: '운동',
        value: '운동',
        imgUrl: '/images/category/exercise.png',
      },
      {
        label: '공부',
        value: '공부',
        imgUrl: '/images/category/study.png',
      },
      {
        label: '글 읽기',
        value: '글 읽기',
        imgUrl: '/images/category/reading.png',
      },
      {
        label: '글 쓰기',
        value: '글 쓰기',
        imgUrl: '/images/category/writing.png',
      },
      {
        label: '프로젝트 / 작업',
        value: '프로젝트 / 작업',
        imgUrl: '/images/category/laptop.png',
      },
      {
        label: '영상 보기 / 팟캐스트 듣기',
        value: '영상 보기 / 팟캐스트 듣기',
        imgUrl: '/images/category/play-button.png',
      },
      {
        label: '기타',
        value: '기타',
        imgUrl: '/images/category/exercise.png',
      },
    ],
    selected: {
      label: '운동',
      value: '운동',
      imgUrl: '/images/category/exercise.png',
    },
    onSelect: (item) => alert(item.label),
    placeholder: '카테고리를 선택해주세요.',
  },
};
