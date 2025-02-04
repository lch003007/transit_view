interface LocationItem {
    location: string;
  }
  
  // 自定義 Hook
  export const useSort = () => {
    const sortRoad = (items: LocationItem[]) => {
      const invalidLocations: string[] = [];
  
      // 提取排序用的數值和字母
      const parseLocation = (location: string) => {
        if(location){
          const match = location.match(/^(台|國道)?(\d+)([甲乙丙丁戊己庚辛]?)(線|號)?.*?(\d+)[kK]\+(\d+)/);
          if (match) {
            const [, prefix, number, letter, , kValue, meter] = match;
            return {
              prefix: prefix || '',
              number: parseInt(number, 10),
              letter: letter || '',
              kValue: parseInt(kValue, 10),
              meter: parseInt(meter, 10),
            };
          }
        }

        // 不符合格式時，記錄下來
        invalidLocations.push(location);
        return {
          prefix: '',
          number: Infinity, // 如果格式不符，放到最後
          letter: '',
          kValue: Infinity,
          meter: Infinity,
        };
      };
  
      // 排序邏輯
      const sortedItems = items.sort((a, b) => {
        const locA = parseLocation(a.location);
        const locB = parseLocation(b.location);
  
        // 國道必須在台線後面
        if (locA.prefix === '台' && locB.prefix === '國道') return -1;
        if (locA.prefix === '國道' && locB.prefix === '台') return 1;
  
        // 比較數字部分
        if (locA.number !== locB.number) return locA.number - locB.number;
  
        // 比較字母部分（無字母優先，並依甲乙丙丁戊己庚辛順序排序）
        if (locA.letter !== locB.letter) {
          const order = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'];
          if (!locA.letter) return -1; // 無字母優先
          if (!locB.letter) return 1;  // 無字母優先
          return order.indexOf(locA.letter) - order.indexOf(locB.letter);
        }
  
        // 比較 K 值
        if (locA.kValue !== locB.kValue) return locA.kValue - locB.kValue;
  
        // 比較公尺值
        if (locA.meter !== locB.meter) return locA.meter - locB.meter;
  
        // 如果完全相同，保持順序
        return 0;
      });
  
      // 將不符合格式的印出來
      console.log('Invalid locations:', invalidLocations);
  
      return sortedItems;
    };
  
    return { sortRoad };
  };