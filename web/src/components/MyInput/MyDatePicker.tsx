'use client'
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

export default function MyDatePicker({date,setDate,autoMins=15,ltDate,gtDate,label}:any){
    
    return <Box sx={{display:'flex',alignItems:'center',marginX:'5px'}}>
        {label?<>{label}</>:<></>}
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        
    <DateTimePicker
      value={date}
      onChange={(newValue) => {
        let resultValue = newValue
        if(ltDate)
        {
            if(ltDate=='now')
            {
                if(newValue.isAfter(dayjs()))
                    resultValue = dayjs()
            }
            else if(newValue.isAfter(ltDate))
                resultValue = ltDate.subtract(autoMins,'minutes')
        }
        
        if(gtDate){
            if(newValue.isBefore(gtDate))
                resultValue = gtDate.add(autoMins,'minutes')
        }

        setDate(resultValue)
      }}
      format="YYYY/MM/DD HH:mm"
      slotProps={{
        textField:{
            InputProps:{
                style:{
                    background:'white',
                    borderRadius:'5px',
                    boxShadow: '3px 4px 6px rgba(0, 0, 0, 0.3)',
                }
            }
        }
      }}
    />
  </LocalizationProvider>
  </Box>
}
