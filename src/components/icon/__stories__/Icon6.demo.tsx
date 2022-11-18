import { IconItem, IconList } from '@/__stories-template__';

const i1 = ['file-folder'];
const i2 = [
  'file-location',
  'file-line',
  'file-polygon',
  'file-description',
  'file-location-to-location',
  'file-location-to-polygon',
  'file-loading',
];
const i3 = ['file-location-sql', 'file-line-sql', 'file-polygon-sql', 'file-description-sql'];
const i11 = ['map-mark', 'map-mark-2'];
const i12 = ['chart-two-dimensional-table-on', 'chart-two-dimensional-table-off'];
const i13 = ['chart-three-dimensional-table-on', 'chart-three-dimensional-table-off'];
const i14 = ['chart-list-table-on', 'chart-list-table-off'];
const i15 = ['chart-word-index-on', 'chart-word-index-off'];
const i16 = ['chart-gauge-on', 'chart-gauge-off'];
const i17 = ['chart-progress-circle-on', 'chart-progress-circle-off'];
const i18 = ['chart-multi-pie-on', 'chart-multi-pie-off'];
const i19 = ['chart-progress-bar-on', 'chart-progress-bar-off'];
const i20 = ['chart-bar-on', 'chart-bar-off'];
const i21 = ['chart-stacked-bar-on', 'chart-stacked-bar-off'];
const i22 = ['chart-percent-bar-on', 'chart-percent-bar-off'];
const i23 = ['chart-line-on', 'chart-line-off'];
const i24 = ['chart-contrast-bar-on', 'chart-contrast-bar-off'];
const i25 = ['chart-mixed-bar-on', 'chart-mixed-bar-off'];
const i26 = ['chart-scatter-diagram-on', 'chart-scatter-diagram-off'];
const i27 = ['chart-pie-on', 'chart-pie-off'];
const i28 = ['chart-doughnut-on', 'chart-doughnut-off'];
const i29 = ['chart-rose-pie-on', 'chart-rose-pie-off'];
const i30 = ['chart-sunburst-on', 'chart-sunburst-off'];
const i33 = ['chart-radar-on', 'chart-radar-off'];
const i34 = ['chart-word-cloud-on', 'chart-word-cloud-off'];
const i35 = ['chart-sankey-diagram-on', 'chart-sankey-diagram-off'];
const i36 = ['chart-marquee-on', 'chart-marquee-off'];
const i37 = ['chart-tree-map-on', 'chart-tree-map-off'];
const i50 = ['chart-map-on', 'chart-map-off'];
const i38 = ['project-screen-on', 'project-screen-off'];
const i39 = ['project-mobile-on', 'project-mobile-off'];
const i51 = ['project-chart-on', 'project-chart-off'];
const i40 = ['project-map-on', 'project-map-off'];
const i41 = ['project-resource-on', 'project-resource-off'];
const i42 = ['project-echarts-on', 'project-echarts-off'];
const i43 = ['project-lab-on', 'project-lab-off'];
const i44 = ['project-questionnaire-on', 'project-questionnaire-off'];
const i52 = ['project-recycle-bin-on', 'project-recycle-bin-off'];
const i53 = ['project-bot-on', 'project-bot-off'];
const i45 = [
  'new-upload-file',
  'new-upload-link',
  'new-upload-streaming',
  'new-sql',
  'mass-charts',
  'template',
];

const IconDemo = () => (
  <div>
    <h2>我的项目 myProject</h2>
    <IconList>
      {i38.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i39.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i51.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i40.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i41.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i42.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i43.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i44.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i52.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i53.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>

    <h2>数据文件 file</h2>
    <IconList>
      {i1.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i2.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i3.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>

    <h2>地图 map</h2>
    <IconList>
      {i11.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>

    <h2>图表类型 chartType</h2>
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
    <IconList>
      {i24.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i25.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i26.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i12.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i13.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i14.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
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
      {i27.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i28.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i29.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i30.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i33.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i34.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i35.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i36.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i37.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
    <IconList>
      {i50.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>

    <h2>New 新建</h2>
    <IconList>
      {i45.map((it) => (
        <IconItem key={it} dirName={it} />
      ))}
    </IconList>
  </div>
);
export default IconDemo;
