import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './cardview.css';
import newone from './3.jpg';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {

    const {item} = props;
    console.log(item);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="warning">CARDVIEW</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         
          <div className="cardcontent">
          <Typography className="cardname" id="modal-modal-title" variant="h5" component="h2">{item.uname}</Typography>
          <Typography id="modal-modal-title" style={{color: 'blue'}}>Batch: {item.batch}</Typography>
          <Typography id="modal-modal-title" style={{color: 'blue'}}>Course: {item.course}</Typography>
          <Typography id="modal-modal-title" style={{color: 'blue'}}>Day: {item.day}</Typography>
          <Typography id="modal-modal-title" style={{color: 'blue'}}>Start time: {item.starttime}</Typography>
          <Typography id="modal-modal-title" style={{color: 'blue'}}>End time: {item.endtime}</Typography>
          <Typography id="modal-modal-title" style={{color: 'blue'}}>Startdate: {item.startdate}</Typography>
          <Typography id="modal-modal-title" style={{color: 'blue'}}>Enddate: {item.enddate}</Typography>
          
          <Typography id="modal-modal-title">Schedulelink: {item.schedule}</Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
