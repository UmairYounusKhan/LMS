import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion sx={{width:'100%', padding:'10px'}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            
          </Typography>
          <Typography sx={{ color: 'text.secondary',color:'black', fontSize:'22px' }}>Class 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{display:'flex',justifyContent:'space-between', color:'green', fontSize:'22px'}}>
            <div>Monthly Fee</div>
            <div>Rs: 500</div>
          </Typography>  <br />
          <Typography sx={{display:'flex',justifyContent:'space-between', color:'black', fontSize:'22px'}}>
            <div>Annual Fee</div>
            <div>Rs: 6000</div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{width:'100%', padding:'10px'}} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {/* Class 1 */}
          </Typography>
          <Typography sx={{ color: 'text.secondary',color:'black', fontSize:'22px' }}>Class 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{display:'flex',justifyContent:'space-between', color:'green', fontSize:'22px'}}>
            <div>Monthly Fee</div>
            <div>Rs: 600</div>
          </Typography>  <br />
          <Typography sx={{display:'flex',justifyContent:'space-between', color:'black', fontSize:'22px'}}>
            <div>Annual Fee</div>
            <div>Rs: 7200</div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{width:'100%', padding:'10px'}} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {/* Class 1 */}
          </Typography>
          <Typography sx={{ color: 'text.secondary',color:'black', fontSize:'22px' }}>Class 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{display:'flex',justifyContent:'space-between', color:'green', fontSize:'22px'}}>
            <div>Monthly Fee</div>
            <div>Rs: 700</div>
          </Typography>  <br />
          <Typography sx={{display:'flex',justifyContent:'space-between', color:'black', fontSize:'22px'}}>
            <div>Annual Fee</div>
            <div>Rs: 8400</div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{width:'100%', padding:'10px'}} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {/* Class 1 */}
          </Typography>
          <Typography sx={{ color: 'text.secondary',color:'black', fontSize:'22px' }}>Class 4</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{display:'flex',justifyContent:'space-between', color:'green', fontSize:'22px'}}>
            <div>Monthly Fee</div>
            <div>Rs: 800</div>
          </Typography>  <br />
          <Typography sx={{display:'flex',justifyContent:'space-between', color:'black', fontSize:'22px'}}>
            <div>Annual Fee</div>
            <div>Rs: 9600</div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{width:'100%', padding:'10px'}} expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {/* Class 1 */}
          </Typography>
          <Typography sx={{ color: 'text.secondary',color:'black', fontSize:'22px' }}>Class 5</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{display:'flex',justifyContent:'space-between', color:'green', fontSize:'22px'}}>
            <div>Monthly Fee</div>
            <div>Rs: 900</div>
          </Typography>  <br />
          <Typography sx={{display:'flex',justifyContent:'space-between', color:'black', fontSize:'22px'}}>
            <div>Annual Fee</div>
            <div>Rs: 10800</div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{width:'100%', padding:'10px'}} expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {/* Class 1 */}
          </Typography>
          <Typography sx={{ color: 'text.secondary',color:'black', fontSize:'22px' }}>Class 6</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{display:'flex',justifyContent:'space-between', color:'green', fontSize:'22px'}}>
            <div>Monthly Fee</div>
            <div>Rs: 1000</div>
          </Typography>  <br />
          <Typography sx={{display:'flex',justifyContent:'space-between', color:'black', fontSize:'22px'}}>
            <div>Annual Fee</div>
            <div>Rs: 12000</div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{width:'100%', padding:'10px'}} expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7bh-content"
          id="panel7bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {/* Class 1 */}
          </Typography>
          <Typography sx={{ color: 'text.secondary',color:'black', fontSize:'22px' }}>Class 7</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{display:'flex',justifyContent:'space-between', color:'green', fontSize:'22px'}}>
            <div>Monthly Fee</div>
            <div>Rs: 1100</div>
          </Typography>  <br />
          <Typography sx={{display:'flex',justifyContent:'space-between', color:'black', fontSize:'22px'}}>
            <div>Annual Fee</div>
            <div>Rs: 13200</div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{width:'100%', padding:'10px'}} expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel8bh-content"
          id="panel8bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {/* Class 1 */}
          </Typography>
          <Typography sx={{ color: 'text.secondary',color:'black', fontSize:'22px' }}>Class 8</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{display:'flex',justifyContent:'space-between', color:'green', fontSize:'22px'}}>
            <div>Monthly Fee</div>
            <div>Rs: 1200</div>
          </Typography>  <br />
          <Typography sx={{display:'flex',justifyContent:'space-between', color:'black', fontSize:'22px'}}>
            <div>Annual Fee</div>
            <div>Rs: 14400</div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{width:'100%', padding:'10px'}} expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel9bh-content"
          id="panel9bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {/* Class 1 */}
          </Typography>
          <Typography sx={{ color: 'text.secondary',color:'black', fontSize:'22px' }}>Class 9</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{display:'flex',justifyContent:'space-between', color:'green', fontSize:'22px'}}>
            <div>Monthly Fee</div>
            <div>Rs: 1300</div>
          </Typography>  <br />
          <Typography sx={{display:'flex',justifyContent:'space-between', color:'black', fontSize:'22px'}}>
            <div>Annual Fee</div>
            <div>Rs: 15600</div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{width:'100%', padding:'10px'}} expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel10bh-content"
          id="panel10bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {/* Class 1 */}
          </Typography>
          <Typography sx={{ color: 'text.secondary',color:'black', fontSize:'22px' }}>Class 10</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{display:'flex',justifyContent:'space-between', color:'green', fontSize:'22px'}}>
            <div>Monthly Fee</div>
            <div>Rs: 1400</div>
          </Typography>  <br />
          <Typography sx={{display:'flex',justifyContent:'space-between', color:'black', fontSize:'22px'}}>
            <div>Annual Fee</div>
            <div>Rs: 16800</div>
          </Typography>
        </AccordionDetails>
      </Accordion>


     
    </div>
  );
}
