import React from 'react';
import Event   from './EventForm';
import {EventList  } from './EventList';
import { Switch, Route } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';
import './index.css';

export const Header = ()=> { return (<div>
    <header>
    <div>
    <nav>
      <ul>
        <li><Link to='/addEvent'>Event</Link></li>
        <li><Link to='/eventList'>EventList</Link></li>
      </ul>
    </nav>
    <Switch>
      <Route path="/addEvent" component={EventMain}/>
      <Route path="/eventList" component={EventMain}/>
      </Switch>
    </div>
  </header>
</div>);}

export class EventMain extends React.Component {
    constructor (props){
        super(props);
        this.state={events:[], eventType:'', counter:0, event:{}};
    }

    propagateEvent (ev) {
        console.log(ev); 
        var eventCount;
        if (this.state.eventType === 'modify') {
            eventCount = ev.id;
        }else{
            eventCount = ++this.state.counter;
        }
        var countedEvent = {id:eventCount,
            eventType:ev.eventType,
            dipendant:ev.dipendant,
            osservazione:ev.osservazione,
            descrizioneEvento:ev.descrizioneEvento,
            soln:ev.soln};
        //this.props.event={};    
        var arrEvents = this.state.events;
        if (this.state.eventType === 'modify') {
            var ind = arrEvents.findIndex((elem)=>{console.log('find inde->', elem.id, ev.id); return elem.id === ev.id});
            console.log('array index->',ind);
            arrEvents.splice(ind,1,countedEvent);
            this.setState({event:countedEvent, eventType:'', counter:eventCount});
        }else{
            arrEvents.push(countedEvent);
            this.setState({event:{}, eventType:'add', counter:eventCount});
        }
        
    }

    modifyEvent (evid) {
        console.log('selected modify-->',evid); 
        var modificaArr = this.state.events.filter((e)=>e.id === Number(evid))
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


