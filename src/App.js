import React from 'react'
import './App.css';
import api from './api';
import PostView from './Components/PostView';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/cardContent';
import Typography from '@material-ui/core/Typography';


class App extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      title: '',
      content: '',
      results: [],
    }
  }

  componentDidMount() {
    this.getPosts()
  }
  async getPosts() {
    const _results = await api.getAllPosts()
    console.log(_results)
    this.setState({results: _results.data})
  }



  handlingChange = (event) => {
    this.setState({[event.target.name]: event.target.vale})
  }
  handlingSumbit = async (event) => {
    event.preventDefault()
    let result = await api.createPost({title:this.state.title, content:this.state.content})
    console.log("완료됨!", result)
    this.setState({title:'', content:''})
    this.getPosts()
  }
  handlingDelete = async (event) => {
    await api.deletePost(event.target.value)
    this.getPosts()
  }




  render() {
  return (
    <div className="App">
      <Container maxWidth="lg">
      <div className="PostingSection">
        <Paper className="PostingPaper">
          <h2 className="tt">방명록</h2>
          <form className="PostingForm" onSubmit={this.handlingSumbit}>
            <TextField
            id="outlined-name"
            label="title"
            name="title"
            value={this.state.title}
            onChange={this.handlingChange}
            margin="normal"
            varient="outlined"/>

            <TextField
            id="outlined-name"
            label="content"
            name="content"
            multiline
            rose="4"
            value={this.state.content}
            onChange={this.handlingChange}
            margin="normal"
            varient="outlined"/>

            <Button type="submit" variant="outlined" color="blue">제출하기</Button>
          </form>
        </Paper>
      </div>


      <div className="Viewsection">
        {this.state.results.map((post) => 
          <Card className={'card'}>
          <CardContent>
            <Typography>
              <PostView key={post.id} id={post.id} title ={post.title} comtent={post.content}/>
            </Typography>
          </CardContent>
          <CardActions>

            <Button size="small" value={post.id} onClick={this.handlingDelete}>삭제하기</Button>
          </CardActions>
          </Card>
          )
        }
      </div>
      </Container>
    </div>
  );
  }
}
export default App;