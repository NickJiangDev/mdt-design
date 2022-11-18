import * as React from 'react';
import { MaterialIconItem, IconList, Label, MaterialIcon } from '@/__stories-template__';
import { useDarkMode } from 'storybook-dark-mode';
import toastApi from '@/components/toast';

const previewData = [
  ['more-horizontal', 'more', 'done-check', 'close', 'add', 'remove'],
  [
    'arrow-left',
    'arrow-right',
    'arrow-down',
    'arrow-up',
    'chevron-left',
    'chevron-right',
    'chevron-down',
    'chevron-up',
    'left-back',
    'right-forward',
    'downward',
    'upward',
  ],
  [
    ['play', 'play-outlined'],
    ['edit', 'edit-outlined'],
    ['folder', 'folder-outlined'],
    'unfold-less',
    'unfold-more',
  ],
  [
    ['location', 'location-outlined'],
    ['layer', 'layer-outlined'],
    'line',
    ['description', 'description-outlined'],
  ],
  ['num', 'text', 'geo-global', ['time', 'time-outlined'], ['image', 'image-outlined']],
  [
    'bike',
    'walker',
    ['car', 'car-outlined'],
    'ruler',
    'screen-shot',
    ['map', 'map-outlined'],
    ['navigation', 'navigation-outlined'],
  ],
  [
    'format-align-center',
    'format-align-justify',
    'format-align-left',
    'format-align-right',
    'undo',
    'redo',
    'format-color-text',
    'format-bold',
    'format-italic',
    'format-strikethrough',
    'format-underlined',
  ],
  [
    'vertical-align-top',
    'vertical-align-center',
    'vertical-align-bottom',
    'list-numbered',
    'list-bulleted',
    'indent-decrease',
    'indent-increase',
    'code',
    ['save', 'save-outlined'],
  ],
  [
    'link',
    'link-off',
    'format-clear',
    ['emoji', 'emoji-outlined'],
    ['format-quote', 'format-quote-outlined'],
    'superscript',
    'subscript',
  ],
  [
    'refresh',
    'renew',
    're-cached',
    'reset',
    'launch',
    ['help', 'help-outlined'],
    'drag-handle',
    'drag-handle-cornor',
    'minimize-3',
    'maximize-3',
    ['download-2', 'download-2-outlined'],
  ],
  [
    ['star-on', 'star-off'],
    ['color-picker', 'color-picker-outlined'],
    'sort',
    'swap-horiz',
    'menu',
    'time-clock',
    ['info-2', 'info-2-outlined'],
    'equal-sign',
    ['tag', 'tag-outlined'],
    ['file-2', 'file-2-outlined'],
    ['share', 'share-outlined'],
    ['movie', 'movie-outlined'],
    'radio',
    'fact-check',
    'num-2',
    'check-box',
    'combo-box',
    'slider',
    'form',
    'hand',
    'stop',
    'exit-2',
    ['team', 'team-outlined'],
  ],
];

const MapRender: React.FC<{ data: (string | string[])[][] }> = (props: {
  data: (string | string[])[][];
}) => {
  const themeStyle = { color: useDarkMode() ? '#bac1d7' : '#000', display: 'block' };
  const arrayStyles = {
    border: '1px dashed',
    borderRadius: '5px',
    borderColor: useDarkMode() ? '#bac1d7' : '#7B61FF',
  };
  const copyCallback = React.useCallback(() => {
    toastApi.success('成功复制到剪贴板');
  }, []);

  return (
    <React.Fragment>
      {props.data.map((it) => {
        return (
          <IconList>
            {it.map((v) => {
              if (typeof v === 'string') {
                return (
                  <MaterialIcon>
                    <Label style={themeStyle}>{v}</Label>
                    <MaterialIconItem key={v} dirName={v} copyCallback={copyCallback} />
                  </MaterialIcon>
                );
              }
              return (
                <MaterialIcon>
                  <Label style={themeStyle}>{v[0]}</Label>
                  <div style={arrayStyles}>
                    {v.map((vi) => (
                      <MaterialIconItem key={vi} dirName={vi} copyCallback={copyCallback} />
                    ))}
                  </div>
                </MaterialIcon>
              );
            })}
          </IconList>
        );
      })}
    </React.Fragment>
  );
};

const IconDemo = () => (
  <>
    <h1>Material Icon</h1>
    <MapRender data={previewData} />
  </>
);
export default IconDemo;
