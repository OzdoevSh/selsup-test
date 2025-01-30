import React from 'react';

interface Param {
  id: number;
  name: string;
  type?: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: any[];
}

interface Props {
  params: Param[];
  model: Model;
}

const ParamEditor = ({ params, model }: Props) => {
  const handleSetParamValue = (param: Param, value: string) => {
    let newParamValues = [...model.paramValues];
    const index = newParamValues.findIndex(x => x.paramId === param.id);
    if (index !== -1) {
      newParamValues[index].value = value;
    } else {
      newParamValues.push({ paramId: param.id, value });
    }
    console.log('newParams', newParamValues);
  };

  const getParamValue = (param: Param): string | undefined => {
    const foundParam = model.paramValues.find(x => x.paramId === param.id);
    return foundParam ? foundParam.value : '';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px'}}>
      {params.map(param => (
        <label key={param.id}>
          {param.name}: 
          <input type="text" defaultValue={getParamValue(param)} onChange={event => handleSetParamValue(param, event.target.value)} />
        </label>
      ))}
    </div>
  );
};

const App = () => {
  const initialParams = [
    { id: 0, name: 'Назначение' },
    { id: 1, name: 'Длина' }
  ];
  const initialModel = {
    paramValues: [],
    colors: []
  };

  return (
    <ParamEditor params={initialParams} model={initialModel} />
  );
};

export default App;