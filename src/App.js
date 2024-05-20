import Grid from '@mui/material/Grid';
import './App.css'
import Box from '@mui/material/Box';
import PostCard from './Components/PostCard';
import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState} from 'react';

function App() {

  const [postsData, setpostData] = useState([])

  const datafetch = async () => {
    await fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => setpostData(data))
      .catch((error) => {
        console.log(error)
      })
  }

  const ondelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "Delete"
    })
      .then((res) => {
        if (res.status !== 200) {
          return
        } else {
          setpostData(postsData.filter((post) => {
            return post.id !== id
          }))
        }
      })
      .catch((error) => {
        return console.log(error)
      })
  }

  const onADD = async (title, body) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1
      })
    })
      .then((res) => {
        if (res.status !== 200) {
          return
        }
        else {
          return res.json()
        }
      })
      .then((data) => setpostData((postsData) => [...postsData, data]))
      .catch((error) => {
        return console.log(error)
      })
  }


  const handleOnsubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const body = event.target.body.value;
    onADD(title, body);
    event.target.title.value = '';
    event.target.body.value = '';
  }

  useEffect(() => {
    datafetch()
  }, [])

  return (
    <>
      <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 12, sm: 8, md: 12 }}>
        <Grid item xs={12} sm={4} md={3} >
          <Box sx={{ border: '1px solid #EEEEEE', padding: 3, borderRadius: 5, boxShadow: 2, gap:6 }} flexDirection='columns' >
            <Input name='title' placeholder='Enter title here'/>
            <Input name='body' placeholder='Enter content here'/>
            <Button onSubmit={handleOnsubmit}>Add post</Button>
          </Box>
        </Grid>
        {
          postsData.reverse().map((post) => (
            <PostCard key={post.id} id={post.id} title={post.title} body={post.body} ondelete={ondelete} />
          ))
        }
      </Grid>
    </>
  );
}

export default App;
