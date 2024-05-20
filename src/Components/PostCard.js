import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';



export default function PostCard({ title, id,  body, ondelete }) {

  const  handleDelete =(id)=>{
     ondelete(id)
    }

    return (
        <Grid item xs={12} sm={4} md={3} >
            <Box sx={{ border: '1px solid #EEEEEE', padding: 3, borderRadius: 5, boxShadow: 2 }} >
                <Typography variant="h5" component="div" marginBottom={1}>
                    {title}
                </Typography>
                <Typography variant="body2">
                    {body}
                </Typography>
                <Button onClick={() => handleDelete(id)} >Delete</Button>
            </Box>
        </Grid>
    )
}
