import React from 'react';
import { DocPreview, FlexHorAround } from '@/__stories-template__';
import { SwitchTag } from '@/components/tag';
import { PriviewProps } from '@/__stories-template__/DocPreview';

export default (props: PriviewProps) => {
  const [actived, setActived] = React.useState(false);
  const back = () => {
    setActived(!actived);
  };

  return (
    <DocPreview {...props}>
      <FlexHorAround>
        <SwitchTag tag={'行政边界'} onClickTag={back} actieved={actived} />
        <SwitchTag tag={'行政边界'} actieved />
      </FlexHorAround>
    </DocPreview>
  );
};
