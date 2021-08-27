import React, {Component}  from 'react';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import Navbar from '../components/Navigation/Navigation';
import Loader from './loader';
import './styles.css';

class App extends Component{

    constructor(){
        super()
        this.state={
            robots: [],
            searchfeild: '',
            isButtonClicked: false
        }
    }

    //function when the button is clicked, it fetches the api
    
    onButtonSubmit = () => {
        this.setState({isButtonClicked: !this.isButtonClicked})
        const timer = setTimeout(() => {
            //fetches the api 
            fetch('https://reqres.in/api/users?page=1').then(response=> {
            return response.json();
            })
            .then(users=>{
                this.setState({robots: users.data})
            });
        }, 3000);
        return () =>clearTimeout(timer);
    }

    //function used to change the searchfield
    onSearchChange = (event) => {
        this.setState({searchfeild: event.target.value})
    }

    render(){

        const filteredRobots = this.state.robots.filter(robots=>{
            return robots.first_name.toLowerCase().includes(this.state.searchfeild.toLowerCase());
        })
        
        if(this.state.robots.length === 0 && this.state.isButtonClicked === false){
            return (
                <>
                <Navbar onButtonSubmit={this.onButtonSubmit}/>
                <div class="tap">
                <h1 className='tc'>Please click on 'Get clients' to get all details</h1>
                </div>
                </>
            );
        }

        //when the button is clicked and the api is being called
        else if(this.state.robots.length === 0){
            return (
                <>
                    <Navbar onButtonSubmit={this.onButtonSubmit}/>
                    <h1 className='tc'>Loading...</h1>
                    <Loader className='loader'></Loader>
                </>
                );
        }

        //when the button is clicked and the api has fetched data
        else{
            return(
                <>
                    <Navbar onButtonSubmit={this.onButtonSubmit}/>
                    <div className='tc'>
                        <h1>Client Info</h1>
                        <SearchBox searchChange={this.onSearchChange}/>
                        <Scroll>
                            <CardList robots={filteredRobots}/>
                        </Scroll>
                    </div>
                </>
                );
            }
        }
    }

export default App;