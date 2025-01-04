export function useSize(parentHeight:number, parentWidth:number) {
    const tableCoef = 0.87;
    const titleCoef = 1 - tableCoef;
    const height = {
      table: `${Math.round(tableCoef * 100)}%`,
      title: `${Math.round(titleCoef * 100)}%`,
    };
    const width = {
      table: "100%",
      title: "100%",
    };
    const labelFontSize = () => {
      const scale =
        parentHeight < parentWidth
          ? parentHeight * tableCoef
          : parentWidth * tableCoef;
      let fontSize = 0;
  
      for (let i = 0; i < scale; i++) {
        if (i < 300) if (i % 4 === 0) fontSize++;
        if (i < 1000)
          if (i % 5 === 0) fontSize++;
          else if (i % 7 === 0) fontSize++;
      }
      return fontSize + "%";
    };
    const dataFontSize = () => {
      const scale =
        parentHeight < parentWidth
          ? parentHeight * tableCoef
          : parentWidth * tableCoef;
      let fontSize = 0;
      for (let i = 0; i < scale; i++) {
        if (i < 90)
          if (i % 2 === 0) fontSize++;
          else{}
        else if (i % 3 === 0) fontSize++;
      }
      return fontSize + "%";
    };
    const titleFontSize = () => {
      const scale = parentWidth;
      const sizeMax = Math.round(parentHeight * titleCoef) * 4;
      let fontSize = 100;
      if (scale > 300) {
        for (let i = 300; i < scale; i++) {
          if (i < 1000)
            if (i % 5 === 0) fontSize++;
            else if (i % 7 === 0) fontSize++;
        }
      }
      if (fontSize > sizeMax) fontSize = sizeMax;
      return fontSize + "%";
    };
    const nameFontSize = () => {
      return Math.round(Number(titleFontSize().split("%")[0]) * 0.6) + "%";
    };
    const VDIDFontSize = () => {
      return Math.round(Number(titleFontSize().split("%")[0]) * 0.5) + "%";
    };
    return {
      labelFontSize,
      dataFontSize,
      titleFontSize,
      nameFontSize,
      VDIDFontSize,
      height,
      width,
    };
  }
  