'use client'
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

function Panel(props: {parentHeight: number; parentWidth: number }) {
    const { parentHeight, parentWidth } = props;
    const width = parentWidth / 5;
    const height = parentHeight / 7;
    const [data,setData] = useState<Record<string,string>>({})

    const MyTable = styled('table')({
        width: '100%',
        borderCollapse: 'collapse',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '3px 4px 10px rgba(0, 0, 0, 0.5)',
    
    });
    
    const MyTr = styled('tr')(({ theme }) => ({
        height: height,
        '&:nth-of-type(even)': {
            backgroundColor: '#C4E1E1',
        },
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.common.white,
        },
        '&:hover': {
            backgroundColor: '#CDCD9A',
            color: theme.palette.primary.contrastText,
        },
    }));
    
    const MyTd = styled('td')(({ theme }) => ({
        textAlign: 'center',
        padding: '10px',
        fontSize: height/1.3,
        border: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
        '&:first-of-type': {
            fontWeight: 'bold',
        },
        width:width,
        paddingTop:0,
        paddingBottom:0
    }));
    
    const MyTh = styled('th')(({ theme }) => ({
        textAlign: 'center',
        padding: '12px',
        fontSize: height/1.3,
        fontWeight: 'bold',
        border: `1px solid ${theme.palette.divider}`,
        background: '#3D7878',
        color: theme.palette.primary.contrastText,
        width:width,
        paddingTop:0,
        paddingBottom:0
    }));
    

    return (
        <Box height={"100%"}>
            <Box sx={{display:'flex',justifyContent:'space-between'}}>
                <Box sx={{fontSize:height,color:'white'}}>{data.location??''}</Box>
                <Box>
                    <CircleIcon sx={{fontSize:height}} />
                    <img style={{height:height}} src="image/line_icon_gray.png"/>
                    <img style={{height:height}} src="image/alert_icon.png"/>
                    <CloseIcon  sx={{fontSize:height,color:'white'}}/>
                </Box>
            </Box>
            <MyTable>
                <thead>
                    <MyTr>
                        <MyTh rowSpan={2}>統計區間<br />(分鐘)</MyTh>
                        <MyTh colSpan={2}>流量(輛)</MyTh>
                        <MyTh colSpan={2}>平均速率(km/hr)</MyTh>
                    </MyTr>
                    <MyTr>
                        <MyTh>門檻值</MyTh>
                        <MyTh>實際值</MyTh>
                        <MyTh>門檻值</MyTh>
                        <MyTh>實際值</MyTh>
                    </MyTr>
                </thead>
                <tbody>
                    {Array.from({ length: 4 }, (_, index) => (
                        <MyTr key={index}>
                            {[
                                "intervalTime",
                                "flowGate",
                                "flowValue",
                                "rateGate",
                                "rateValue",
                            ].map((key) => {
                                const fieldKey = `${key}${index}`;
                                const fieldData = data[fieldKey]??'N/A';
                                return (
                                    <MyTd key={fieldKey}>
                                        {fieldData}
                                    </MyTd>
                                );
                            })}
                        </MyTr>
                    ))}
                </tbody>
            </MyTable>
        </Box>
    );
}

export default Panel;

Panel.propTypes = {
    data: PropTypes.object.isRequired,
    parentWidth: PropTypes.number.isRequired,
    parentHeight: PropTypes.number.isRequired,
};
