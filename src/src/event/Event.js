import React from 'react';
import Event from './EventForm';
import EventList from './EventList';
import { Switch, Route } from 'react-router-dom';
import '../index.css';


class EventMain extends React.Component {

    render () {
        console.log('EventMain...');
        return ( <div>
            <Switch>
            <Route exact path="/eventList" render={({history})=> <EventList/>}/>
                <Route exact path="/addEvent" component={()=> <div><Event/></div>}/>
            </Switch>
                </div> );
    }
}


export const ReactEventMain = EventMain;


