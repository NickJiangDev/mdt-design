import Badges from '@/components/badges';
import styled from '@emotion/styled';
import Icon from '@/components/icon';
import { useDarkMode } from 'storybook-dark-mode';
import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';

const StyledDiv = styled.div`
  width: 50px;
  height: 50px;
`;

const BadgesDemo = (props: PriviewProps) => {
  const commonStyle = { marginRight: '20px', background: useDarkMode() ? '#32384E' : '#F0F1F3' };
  return (
    <DocPreview {...props}>
      <h4>基本用法</h4>
      <div>
        <Badges style={commonStyle} count={10}>
          <StyledDiv />
        </Badges>
        <Badges style={commonStyle} count={10} dot>
          <StyledDiv />
        </Badges>
        {/* count为0时不显示 */}
        <Badges style={commonStyle} count={0}>
          <StyledDiv />
        </Badges>
        <Badges style={commonStyle} count={0} dot>
          <StyledDiv />
        </Badges>
        {/* 设置showZero可显示0值 */}
        <Badges style={commonStyle} count={0} showZero>
          <StyledDiv />
        </Badges>
        <Badges style={commonStyle} count={0} showZero dot>
          <StyledDiv />
        </Badges>
        <Badges
          style={commonStyle}
          count={10}
          badgeStyle={{
            color: '#000',
            width: '20px',
            height: '20px',
            lineHeight: '20px',
            borderRadius: '10px',
          }}
        >
          <StyledDiv />
        </Badges>
      </div>
      <h4>最大值</h4>
      <Badges style={commonStyle} count={1000} overflowCount={99}>
        <StyledDiv />
      </Badges>
      <h4>type</h4>
      <div>
        <Badges style={commonStyle} count={10}>
          <StyledDiv />
        </Badges>
        <Badges style={commonStyle} count={10} type="processing">
          <StyledDiv />
        </Badges>
        <Badges style={commonStyle} count={10} type="success">
          <StyledDiv />
        </Badges>
        <Badges style={commonStyle} count={10} type="warning">
          <StyledDiv />
        </Badges>
      </div>
      <h4>偏移</h4>
      <div>
        <Badges style={commonStyle} count={100} offsetFromTopRight={[10, -10]} type="success">
          <StyledDiv />
        </Badges>
      </div>
      <h4>count不为数字</h4>
      <div>
        <Badges style={commonStyle} count={<Icon icon="close" size={16} />} overflowCount={100}>
          <StyledDiv />
        </Badges>
        <Badges style={commonStyle} count="完成" overflowCount={100}>
          <StyledDiv />
        </Badges>
      </div>
    </DocPreview>
  );
};

export default BadgesDemo;
