import MapBaseChange, { GroupOption } from '@/components/map-base-change';
import React from 'react';

const groupOptions: GroupOption[] = [];
for (let i = 0; i < 5; i++) {
  groupOptions.push({
    id: '123' + Math.random().toFixed(10),
    img: 'https://www.metrodata.cn/static/img/home-s7-qrcode-2.png',
    name: 'ssss',
  });
}
groupOptions.push({
  id: 'divider',
});
for (let i = 0; i < 6; i++) {
  groupOptions.push({
    id: '123' + Math.random().toFixed(10),
    img: 'https://www.metrodata.cn/static/img/home-s7-qrcode-2.png',
    name: 'ssss',
  });
}
const MapBaseChangeDemo = () => {
  const [currentStyle, setCurrentStyle] = React.useState(groupOptions[0].id);
  const [checked, setChecked] = React.useState(true);
  const onClose = () => {
    alert('onClose');
  };
  const _changeCurrentStyle = (id: string) => {
    setCurrentStyle(id);
  };
  const changeHideBase = (checked: boolean) => {
    setChecked(checked);
  };
  return (
    <div>
      当前选中 id: {currentStyle}
      <br />
      <MapBaseChange
        headerTitle="显示底图"
        groupOptions={groupOptions}
        onClose={onClose}
        currentStyle={currentStyle}
        onChange={_changeCurrentStyle}
        hideBase={checked}
        changeHideBase={changeHideBase}
      />
      <div style={{ display: 'inline-block', width: 20 }}></div>
      <MapBaseChange
        headerTitle="显示底图"
        groupOptions={[]}
        onClose={onClose}
        currentStyle={currentStyle}
        onChange={_changeCurrentStyle}
        hideBase={checked}
        changeHideBase={changeHideBase}
      />
    </div>
  );
};
export default MapBaseChangeDemo;
