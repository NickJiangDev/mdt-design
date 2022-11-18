import { IconItem, IconList } from '@/__stories-template__';

const i1 = ['info', 'alert', 'help', 'success'];
const i1Outlined = ['info-outlined', 'alert-outlined', 'help-outlined', 'success-outlined'];
const i2 = ['model', 'new-output', 'cover-output'];
const i3 = ['drill', 'row-limit', 'chart', 'sharp', 'sql'];
const i4 = ['axis-right', 'axis-left', 'text-note'];
const i5 = ['chart-bar-off', 'chart-percent-bar-off', 'chart-stacked-bar-off', 'chart-line-off'];
const i24 = ['axis-right', 'axis-left', 'circle'];
const i7 = ['draw-polygon', 'draw-circle', 'isochrone', 'buffer'];
const i8 = ['polygon-pointer', 'street-view', 'select', 'print-image'];
const i9 = ['pack-up', 'location-2', 'polygon', 'location-to-location', 'location-to-polygon'];
const i10 = ['location-size', 'line-size', 'geo-flow', 'geo-flow-2'];
const i11 = ['add-column', 'add-row', 'map-add', 'chart-pie-add', 'collabrate'];
const i12 = ['preview', 'move-to'];
const i13 = ['task-center', 'add-square', 'comment', 'card'];
const i14 = ['tab', 'card', 'setting'];
const i15 = ['bring-to-top', 'send-to-bottom', 'bring-forward', 'send-backward'];
const i16 = [
  'group',
  'un-group',
  'format-align-left-2',
  'format-align-center-2',
  'format-align-right-2',
  'format-align-justify-2',
];
const i17 = [
  'align-top',
  'align-ver-center',
  'align-bottom',
  'align-left',
  'align-hor-center',
  'align-right',
];
const i18 = [
  'distribute-hor-spacing',
  'distribute-ver-spacing',
  'format-align-top',
  'format-align-bottom',
  'format-align-ver-center',
];
const i19 = ['group-2', 'ai-lab', 'echarts', 'javascript'];
const i20 = ['add-folder', 'add-page'];
const i21 = ['stack', 'frame'];
const i22 = ['checkbox-on', 'checkbox-intermediate', 'checkbox-off'];
const i23 = ['radio-on', 'radio-off'];
const i25 = ['tabs', 'overlay'];
const i26 = ['checked', 'unchecked'];
const i27 = ['institution', 'supplier'];

const IconDemo = () => (
  <>
    <h1>自定义图标</h1>
    <h2>提示 notification</h2>
    <IconList>
      {i1.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i1Outlined.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>

    <h2>Lab</h2>
    <IconList>
      {i2.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>

    <h2>Chart</h2>
    <IconList>
      {i3.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i4.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i5.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <h2>地图 map</h2>
    <h4>工具栏</h4>
    <IconList>
      {i7.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>

    <h4>筛选器 & Zoombar</h4>
    <IconList>
      {i8.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>

    <h4>图例&图层</h4>
    <IconList>
      {i9.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i10.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>

    <h2>表格工具栏 table</h2>
    <IconList>
      {i11.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>

    <h2>我的项目 project</h2>
    <IconList>
      {i12.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>

    <h2>导航栏 nav</h2>
    <IconList>
      {i13.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>

    <h4>样式配置项</h4>
    <IconList>
      {i24.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>

    <IconList>
      {i14.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>

    <h2>大屏编辑器 designer</h2>
    <IconList>
      {i15.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i16.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i17.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i18.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i19.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i20.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i21.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>

    <h2>CheckBox & Radio</h2>
    <IconList>
      {i22.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i23.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>

    <h2>Tab</h2>
    <IconList>
      {i25.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <h2>Toggle</h2>
    <IconList>
      {i26.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <h2>DataMarket</h2>
    <IconList>
      {i27.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
  </>
);
export default IconDemo;
