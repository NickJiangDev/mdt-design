import styled from '@emotion/styled';

export const DraggableContainer = styled.div`
  width: 300px;
  height: 550px;
  background: #282d40;
  border: 1px solid #4a5472;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
`;

export const ScrollWrapper = styled.div`
  height: 200px;
  width: 200px;
`;

export const FlexVerCenter = styled.div`
  display: flex;
  align-items: center;

  > [class^='dmc-'] {
    margin-right: 15px;
  }
`;

export const FlexVerStart = styled.div`
  display: flex;
  align-items: flex-start;

  > [class^='dmc-'] {
    margin-right: 15px;
  }
`;

export const Split = styled.div`
  height: 1px;
  margin: 5px 0;
  background: #e9e9e9;
`;

export const FlexColumnVerCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  > [class^='dmc-'] {
    margin-bottom: 10px;
  }
`;

export const FlexHorAround = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const LabelButton = styled.div`
  margin-bottom: 10px;
`;
export const SmallLabelButton = styled.div`
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
`;
