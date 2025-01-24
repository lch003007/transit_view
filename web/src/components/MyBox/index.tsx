import Box, { BoxProps } from '@mui/material/Box';

// 定義 MyBoxProps，包含 Box 的所有 props
export interface MyBoxProps extends BoxProps {
  customProp?: string; // 可加入自定義屬性
}

// 定義 MyBox 組件
const MyBox: React.FC<MyBoxProps> = ({ customProp, children,sx, ...props }) => {
  return (
    <Box sx={{
        borderRadius: "10px", 
        boxShadow: '3px 4px 6px rgba(0, 0, 0, 0.3)',
        ...sx
        }} {...props}>
      {customProp && <div>{customProp}</div>}
      {children}
    </Box>
  );
};

export default MyBox;