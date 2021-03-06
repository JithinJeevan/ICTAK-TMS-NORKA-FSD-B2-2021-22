import React, {useEffect, useState } from 'react'
import '../Scheduled/scheduled.css'
import { Table, TableHead, TableRow, TableCell, TableBody,Button} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import BasicModal from '../card/Cardview';
import axios from 'axios';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router';

const Scheduled = () => {

    const [scheduledtrainers,setScheduledtrainers] = useState([]);
    const [search,setSearch]=useState("");

    const [accessToken,setAccessToken]=useState(Cookies.get("access"));
   const [refreshToken,setRefreshToken]=useState(Cookies.get("refresh"));

   Cookies.set("access", accessToken);
   Cookies.set("refresh", refreshToken);
  console.log("access",accessToken);

    const refresh = async () => {
        try {
        const res = await axios.post("/api/refresh",{ token: Cookies.get("refresh") });
        
      
        
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken)
        console.log("access2",Cookies.get("refresh"));
          return res.data;
        } catch (err) {
          console.log(err);
        }
      };
     

      const axiosJWT = axios.create()
    
      axiosJWT.interceptors.request.use(
        async (config) => {
          let currentDate = new Date();
         
          const decodedToken = jwt_decode(accessToken);
          
          if (decodedToken.exp * 1000 < currentDate.getTime()) {
            const data = await refresh();
            console.log("refrsh",data.refreshToken)
            
            config.headers["authorization"] = "Bearer " + data.accessToken;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );


async function searching(){
    scheduledtrainers.map((i)=>{
    if(i.fname===search){
        console.log("find");
        setScheduledtrainers(scheduledtrainers.filter(el=>el.uname == search));  
    }
    else if(i.quali===search) {
        console.log("find");
        setScheduledtrainers(scheduledtrainers.filter(el=>el.qual == search));
    }
    else if(i.emp===search) {
        console.log("find");
        setScheduledtrainers(scheduledtrainers.filter(el=>el.emp == search));
    }
    }) 
    }

//getting all scheduledtrainers
async function scheduledtrainerslist(){
    const response = await axiosJWT.get(`/api/allocated`,{headers: { authorization: "Bearer " + accessToken }})
    // const result= await response.json();
    setScheduledtrainers(response.data);
}

useEffect(() => {
   scheduledtrainerslist();
}, [])
const navigate=useNavigate();

async function handleSignOUt(){
 var res= await axiosJWT.post('/api/logout',{
    headers: {authorization: "Bearer " + accessToken }
  });
  console.log(res);
  Cookies.set("logs",0);
  navigate("/",{replace:true});
   }

  
    async function deleteSchedule(e){
    const id = e.target.id;
     var res=await axiosJWT.post(`/api/Scheduled/delete/${id}`,{
       headers: {authorization: "Bearer " + accessToken }
     });
     console.log(res);
     
     setScheduledtrainers(scheduledtrainers.filter(i=>i._id !== id));
      }
    
    return (
        <div className="shfull">
        
            
            <FormControl variant="standard">
            <Input className="searchsh" value={search} style={{width: 300,backgroundColor: "white",paddingLeft: 10}} id="input-with-icon-adornment"
            endAdornment={<InputAdornment><SearchIcon onClick={searching} style={{cursor:'pointer'}}/></InputAdornment>}
            onChange={(event)=>setSearch(event.target.value)}/>
            </FormControl>

            <Table className="shtab" style={{width: 500,border:1,marginTop:250,marginLeft:250}}>
              <TableHead>
                  <TableRow style={{backgroundColor:'black'}}>
                       <TableCell style={{color:'white'}}>Name</TableCell>
                       <TableCell style={{color:'white'}}>Startdate</TableCell>
                       <TableCell style={{color:'white'}}>Enddate</TableCell>
                       <TableCell style={{color:'white'}}>Start time</TableCell>
                       <TableCell style={{color:'white'}}>End time</TableCell>
                       <TableCell style={{color:'white'}}>Day</TableCell>
                       <TableCell style={{color:'white'}}></TableCell>
                       <TableCell style={{color:'white'}}></TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {scheduledtrainers.map((i,key)=>(
              <TableRow key={key} style={{backgroundColor:'white'}}>
              <TableCell>{i.fname}</TableCell>
              <TableCell>{i.startdate.slice(0,10)}</TableCell>
              <TableCell>{i.enddate.slice(0,10)}</TableCell>
              <TableCell>{i.starttime}</TableCell>
              <TableCell>{i.endtime}</TableCell>
              <TableCell>{i.day}</TableCell>
              <TableCell><BasicModal item={i}></BasicModal></TableCell>
              <TableCell ><Button style={{maxHeight:'2.6em',minHeight:'2.6em'}} variant="contained" color="error" id={i._id} onClick={deleteSchedule}>Delete</Button></TableCell>
              </TableRow>
                  ))}
              </TableBody>
            </Table>
        </div>
    )
}

export default Scheduled
