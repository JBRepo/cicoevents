import React from 'react';
import Event from './EventForm';
import { EventList  } from './EventList';
import { Switch, Route } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

export const Header = ()=> { return (<div>
    <header>
    <div>
    <nav>
      <ul>
        <li><Link to='/addEvent'>Event</Link></li>
        <li><Link to='/eventList'>EventList</Link></li>
      </ul>
    </nav>
    <EventMain></EventMain>
    </div>
  </header>
</div>);}

export class EventMain extends React.Component {
    constructor (props){
        super(props);
        this.state={events:[], eventType:'', event:{}};
    }

    componentWillMount () {
        this.getListOfEvents({eventType:''});
    }

    getListOfEvents (evState) {
        axios.get('http://10.21.137.94:8090/WebserviceRest/Rest/Event/List')
        .then(function(response){console.log(response);
            this.setState({events:response.data, eventType:evState.eventType})}.bind(this))
    }

    /*static getDerivedStateFromProps(nextProps, prevState) {
        console.log(getDerivedStateFromProps);
        axios.get('http://10.21.137.94:8090/WebserviceRest/Rest/Event/List')
        .then(function(response){console.log(response);
            this.setState({events:response.data})}.bind(this))
    }*/
    /*getEventList () {
        axios.get('http://10.21.137.94:8090/WebserviceRest/Rest/Event/List')
        .then(function(response){console.log(response);
            this.setState({events:response.data})}.bind(this))
    }*/

    /*componentWillUpdate () {
        axios.get('http://10.21.137.94:8090/WebserviceRest/Rest/Event/List')
        .then(function(response){console.log(response);
            this.setState({events:response.data})}.bind(this))
    }*/

    propagateEvent (ev) {
        var eventCount;
        if (this.state.eventType === 'modify') {
            eventCount = ev.eventId;
        }else{
            eventCount = -1;
        }
        var countedEvent = {eventId:eventCount,
            eventType:ev.eventType,
            dipendant:ev.dipendant,
            osservazione:ev.osservazione,
            descrizioneEvento:ev.descrizioneEvento,
            soln:ev.soln};
        
        if (this.state.eventType === 'modify') {//modify
            console.log('modifiy event-->',countedEvent); 
            axios.get('http://10.21.137.94:8090/WebserviceRest/Rest/Event/Update/'
            ,{
                params: {
                  event: countedEvent
                }
              }
            )
            .then(function(response){console.log(response);
                this.getListOfEvents({eventType:''});
            }.bind(this))
            .catch(console.log('server error while modifying'));
        }else{//add
            axios.get('http://10.21.137.94:8090/WebserviceRest/Rest/Event/Add/'
            ,{
                params: {
                  event: countedEvent
                }
              }
            )
            .then(function(response){console.log(response);
            this.getListOfEvents({eventType:'add'});
            }.bind(this))
            .catch(console.log('server error while adding'))
        }
    }

    modifyEvent (evid) {
        var modificaArr = this.state.events.filter((e)=>e.eventId === Number(evid))
        console.log('element to modify : ',modificaArr[0]);
        this.setState({event:modificaArr[0], eventType:'modify'});
    }

    cancelAction() {
        console.log('inside cancel event-->'); 
        this.setState({event:{}, eventType:''});
    }

    render () {
        return <div>
            <Switch>
            <Route path="/addEvent" component={()=><Event propagate={(ev)=>this.propagateEvent(ev)} cancel={()=>this.cancelAction()} event={this.state.event} type={this.state.eventType}/>}/>
            <Route path="/eventList" render={()=>this.state.eventType === 'modify' ? <Redirect to="/addEvent"/>: <EventList list={this.state.events} event={this.state.event} type={this.state.eventType} modify={(ev)=>this.modifyEvent(ev)}/>}/>
            </Switch>
            </div>
    }
}


