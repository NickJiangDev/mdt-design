import { DocPreview, FlexHorAround } from '@/__stories-template__';
import { Dropmenu, MenuItemProps } from '@/components/dropdown';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const menus1: MenuItemProps[] = [
  { title: '按名称', key: '1' },
  { title: '按创建时间', key: '2' },
  { title: '按最后编辑时间', key: '3', divider: true },
  { title: '文件夹置顶', key: '4' },
];
const menus2: MenuItemProps[] = [
  {
    title: '按类型',
    key: '1',
    type: 'group',
    children: [
      { title: '全部工作台', key: '1-1' },
      { title: '标准工作台', key: '1-2' },
      { title: '自定义工作台', key: '1-3' },
      { title: '报表工作台', key: '1-4' },
    ],
    divider: true,
  },
  {
    title: '按权限',
    key: '2',
    type: 'group',
    children: [
      { title: '所有', key: '2-1' },
      { title: '可编辑', key: '2-2' },
      { title: '不可编辑', key: '2-3' },
    ],
  },
];
const menus3: MenuItemProps[] = [
  { title: '大卡片', key: '1' },
  { title: '小卡片', key: '2' },
  { title: '列表', key: '3' },
];

const menus4: MenuItemProps[] = [
  { title: '删除', key: '1', icon: 'delete-2' },
  { title: '编辑', key: '2', icon: 'edit' },
];
const DropdownDemo = (props: PriviewProps) => {
  return (
    <DocPreview {...props}>
      <h2>默认</h2>
      <Dropmenu
        menus={menus1}
        values={['1', '4']}
        onClickMenuItem={(params) => {
          console.log('=====', params);
        }}
      >
        全部工作台
      </Dropmenu>
      <h2>Disabled</h2>
      <Dropmenu menus={menus1} values={['1', '4']} disabled>
        全部工作台
      </Dropmenu>
      <h2>divider children</h2>
      <Dropmenu menus={menus2} values={['1-1', '2-1']}>
        自定义排序
      </Dropmenu>
      <h2>no-border</h2>
      <Dropmenu menus={menus2} values={['1-1', '2-1']} dropNoBorder>
        自定义排序
      </Dropmenu>
      <h2>icon</h2>
      <FlexHorAround>
        <Dropmenu menus={menus3} values={['1']} icon={'more'} />
        <Dropmenu menus={menus3} values={['1']} icon={'more'} iconType="only-icon" />
        <Dropmenu menus={menus3} values={['1']} icon={'app-grid'} iconType={'border'} />
      </FlexHorAround>
      <h2>only text</h2>
      <FlexHorAround>
        <Dropmenu menus={menus3} values={['1']} onlyText>
          私有数据
        </Dropmenu>
        <Dropmenu menus={menus3} values={['1']} onlyText dropIcon="more">
          私有数据
        </Dropmenu>
      </FlexHorAround>
      <h2>有图标的菜单</h2>
      <FlexHorAround>
        <Dropmenu menus={menus4} icon={'more'} />
      </FlexHorAround>
    </DocPreview>
  );
};

export default DropdownDemo;
