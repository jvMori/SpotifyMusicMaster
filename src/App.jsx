import React, {Component} from 'react';
import './App.css';
import {FormGroup, FormControl, Glyphicon, InputGroup } from 'react-bootstrap';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            query: ''
        }
    }
    search(){
        console.log(this.state.query);
    }
    render(){
        return (
            <div className="App">
                <div className="Title">Music Master</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl 
                            type="text"
                            placeholder="Search an Artist"
                            value={this.state.query} 
                            onChange={event => this.setState({query: event.target.value})}
                            onKeyPress={event => {
                                if (event.key === 'Enter'){
                                    this.search();
                                }
                            }}
                        />
                        <InputGroup.Addon onClick={()=> this.search()}>
                            <Glyphicon glyph="search" />
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <div className="Profile">
                    <div>Artist Picture</div>
                    <div>Artist Name</div>
                </div>
                <div className="Gallery">
                    Gallery
                </div>
            </div> 
        )
    }
}

export default App;