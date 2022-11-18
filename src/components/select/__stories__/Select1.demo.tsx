import * as React from 'react';
import Select from '@/components/select';
import { FlexHorAround } from '@/__stories-template__/AssistPreview';
import { OptionsType } from 'rc-select/lib/interface';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

export type OptionType = 'num' | 'text' | 'geo-global' | 'time' | 'image';

const options: OptionsType = [
  { key: 'test-a', label: 'a', value: 'test-a' },
  { key: 'test-aaa', label: 'aaa', value: 'test-aaa' },
];
for (let i = 0; i < 26; i++) {
  options.push({ key: i + '', label: i + '', value: i + '', disabled: !!(i % 2) });
}

const SelectDemo = (props: PriviewProps) => {
  const [loading, setLoading] = React.useState(true);
  const onFocus = React.useCallback(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const [value, setValue] = React.useState();
  const [multiValue, setMultiValue] = React.useState();

  return (
    <DocPreview {...props}>
      <div style={{ width: '100%', height: '100%' }}>
        <FlexHorAround>
          <div style={{ flex: 1 }}>
            <h4>标准</h4>
            <Select placeholder="请选择" options={options} allowClear />
          </div>
          <div style={{ flex: 1 }}>
            <h4>compact</h4>
            <Select placeholder="请选择" size="compact" options={options}></Select>
          </div>
          <div style={{ flex: 1 }}>
            <h4>mini</h4>
            <Select placeholder="请选择" size="mini" options={options}></Select>
          </div>
        </FlexHorAround>

        <FlexHorAround>
          <div style={{ flex: 1 }}>
            <h4>标准 search</h4>
            <Select
              placeholder="请选择"
              showSearch
              options={options}
              notFoundContent={<div className="dmc-select-item-option-empty">无选项</div>}
            ></Select>
          </div>
          <div style={{ flex: 1 }}>
            <h4>compact search</h4>
            <Select
              placeholder="请选择"
              size="compact"
              showSearch
              options={options}
              notFoundContent={<div className="dmc-select-item-option-empty">无选项</div>}
            ></Select>
          </div>
          <div style={{ flex: 1 }}>
            <h4>mini search</h4>
            <Select
              placeholder="请选择"
              size="mini"
              showSearch
              options={options}
              notFoundContent={<div className="dmc-select-item-option-empty">无选项</div>}
            ></Select>
          </div>
        </FlexHorAround>

        <FlexHorAround>
          <div style={{ flex: 1 }}>
            <h4>标准 create single</h4>
            <Select
              placeholder="请选择"
              showSearch
              options={options}
              createAble
              getNewOptionTemp={(value) => `新建“${value}”`}
            ></Select>
          </div>
          <div style={{ flex: 1 }}>
            <h4>compact create single</h4>
            <Select
              placeholder="请选择"
              size="compact"
              showSearch
              options={options}
              createAble
              getNewOptionTemp={(value) => `新建“${value}”`}
            ></Select>
          </div>
          <div style={{ flex: 1 }}>
            <h4>mini create single</h4>
            <Select
              placeholder="请选择"
              size="mini"
              showSearch
              options={options}
              createAble
              getNewOptionTemp={(value) => `新建“${value}”`}
            ></Select>
          </div>
        </FlexHorAround>

        <FlexHorAround>
          <div style={{ flex: 1 }}>
            <h4>标准 create single 可控</h4>
            <Select
              placeholder="请选择"
              showSearch
              options={options}
              createAble
              getNewOptionTemp={(value) => `新建“${value}”`}
              value={value}
              onChange={(value, options) => {
                console.log(value, options);
                setValue(value);
              }}
            ></Select>
          </div>
          <div style={{ flex: 1 }}>
            <h4>compact create single 可控</h4>
            <Select
              placeholder="请选择"
              size="compact"
              showSearch
              options={options}
              createAble
              getNewOptionTemp={(value) => `新建“${value}”`}
              value={value}
              onChange={(value) => {
                setValue(value);
              }}
            ></Select>
          </div>
          <div style={{ flex: 1 }}>
            <h4>mini create single 可控</h4>
            <Select
              placeholder="请选择"
              size="mini"
              showSearch
              options={options}
              createAble
              getNewOptionTemp={(value) => `新建“${value}”`}
              value={value}
              onChange={(value) => {
                setValue(value);
              }}
            ></Select>
          </div>
        </FlexHorAround>

        <FlexHorAround>
          <div style={{ flex: 1 }}>
            <h4>标准 create multi</h4>
            <Select
              placeholder="请选择"
              mode="multiple"
              showSearch
              options={options}
              createAble
              getNewOptionTemp={(value) => `新建“${value}”`}
            ></Select>
          </div>

          <div style={{ flex: 1 }}>
            <h4>compact create multi</h4>
            <Select
              placeholder="请选择"
              size="compact"
              showSearch
              mode="multiple"
              options={options}
              createAble
              getNewOptionTemp={(value) => `新建“${value}”`}
            ></Select>
          </div>
          <div style={{ flex: 1 }}>
            <h4>mini create multi</h4>
            <Select
              placeholder="请选择"
              mode="multiple"
              size="mini"
              showSearch
              options={options}
              createAble
              getNewOptionTemp={(value) => `新建“${value}”`}
            ></Select>
          </div>
        </FlexHorAround>

        <FlexHorAround>
          <div style={{ flex: 1 }}>
            <h4>标准 create multi 可控</h4>
            <Select
              placeholder="请选择"
              mode="multiple"
              showSearch
              options={options}
              createAble
              getNewOptionTemp={(value) => `新建“${value}”`}
              value={multiValue}
              onChange={(value, options) => {
                console.log(value, options);
                setMultiValue(value);
              }}
            ></Select>
          </div>

          <div style={{ flex: 1 }}>
            <h4>compact create multi 可控</h4>
            <Select
              placeholder="请选择"
              size="compact"
              showSearch
              mode="multiple"
              options={options}
              createAble
              getNewOptionTemp={(value) => `新建“${value}”`}
              value={multiValue}
              onChange={(value) => {
                setMultiValue(value);
              }}
            ></Select>
          </div>
          <div style={{ flex: 1 }}>
            <h4>mini create multi 可控</h4>
            <Select
              placeholder="请选择"
              mode="multiple"
              size="mini"
              showSearch
              options={options}
              createAble
              getNewOptionTemp={(value) => `新建“${value}”`}
              value={multiValue}
              onChange={(value) => {
                setMultiValue(value);
              }}
            ></Select>
          </div>
        </FlexHorAround>

        <FlexHorAround>
          <div style={{ flex: 1 }}>
            <h4>标准 disabled</h4>
            <Select placeholder="请选择" disabled options={options}></Select>
          </div>
          <div style={{ flex: 1 }}>
            <h4>compact disabled</h4>
            <Select placeholder="请选择" size="compact" disabled options={options}></Select>
          </div>
          <div style={{ flex: 1 }}>
            <h4>mini disabled</h4>
            <Select placeholder="请选择" size="mini" disabled options={options}></Select>
          </div>
        </FlexHorAround>

        <FlexHorAround>
          <div style={{ flex: 1 }}>
            <h4>标准 multi</h4>
            <Select
              placeholder="请选择"
              mode="multiple"
              options={options}
              notFoundContent={<div className="dmc-select-item-option-empty">无选项</div>}
            ></Select>
          </div>
          <div style={{ flex: 1 }}>
            <h4>compact multi</h4>
            <Select placeholder="请选择" size="compact" mode="multiple" options={options}></Select>
          </div>
          <div style={{ flex: 1 }}>
            <h4>mini multi</h4>
            <Select placeholder="请选择" size="mini" mode="multiple" options={options}></Select>
          </div>
        </FlexHorAround>

        <FlexHorAround>
          <div style={{ flex: 1 }}>
            <h4>标准 对齐</h4>
            <Select placeholder="请选择" dropdownMatchSelectWidth={400} options={options}></Select>
          </div>
          <div style={{ flex: 1 }}>
            <h4>compact 对齐</h4>
            <Select
              placeholder="请选择"
              size="compact"
              dropdownMatchSelectWidth={400}
              options={options}
            ></Select>
          </div>
          <div style={{ flex: 1 }}>
            <h4>mini 对齐</h4>
            <Select
              placeholder="请选择"
              size="mini"
              dropdownMatchSelectWidth={400}
              options={options}
            ></Select>
          </div>
        </FlexHorAround>

        <FlexHorAround>
          <div style={{ flex: 1 }}>
            <h4>标准 block</h4>
            <Select placeholder="请选择" block options={options}></Select>
          </div>
          <div style={{ flex: 1 }}>
            <h4>compact block</h4>
            <Select placeholder="请选择" size="compact" block options={options}></Select>
          </div>
          <div style={{ flex: 1 }}>
            <h4>mini block</h4>
            <Select placeholder="请选择" size="mini" block options={options}></Select>
          </div>
        </FlexHorAround>

        <FlexHorAround>
          <div style={{ flex: 1 }}>
            <h4>标准 loading</h4>
            <Select placeholder="请选择" options={options} loading={loading} onFocus={onFocus} />
          </div>
          <div style={{ flex: 1 }}>
            <h4>compact loading</h4>
            <Select
              placeholder="请选择"
              size="compact"
              options={options}
              loading={loading}
              onFocus={onFocus}
            />
          </div>
          <div style={{ flex: 1 }}>
            <h4>mini loading</h4>
            <Select
              placeholder="请选择"
              size="mini"
              options={options}
              loading={loading}
              onFocus={onFocus}
            />
          </div>
        </FlexHorAround>
      </div>
    </DocPreview>
  );
};

export default SelectDemo;
