import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { allEvents, modificaView } from '../actiontypes/actions';
import axios from 'axios';


class EventList extends React.Component {
    constructor (props){
        super(props);
        this.getAllEvents({eventType:''});
    }

    getAllEvents (evState) {
        axios.get('http://10.21.137.94:8090/WebserviceRest/Rest/Event/List')
        .then(function(response){console.log(response);
            console.log(this.props);
                this.props.getListOfEvents(response.data);
        }.bind(this)
        )
    }

    modifyEvent () {
        var items = document.getElementsByName('rowSelector');
        var selectedRow = '';
        for (var i = 0; i < items.length; i++) {
            if (items[i].checked) {
                selectedRow = items[i].value;
            }
        }
        console.log('selectedRow->',selectedRow);
        if (selectedRow === '') {
            alert('Please select an event to modify');
            return;
        }
        var modificaArr = this.props.list.filter((e)=>e.eventId === Number(selectedRow))
        console.log('element to modify : ',modificaArr[0]);
        this.props.modificaView(modificaArr[0]);
        this.props.history.push('/addEvent');
    }

    renderEvents(arr){
        console.log(arr.length);
        return arr.map((elem)=><tr key={elem.eventId}><td>{elem.eventType}</td><td>{elem.descrizioneEvento}</td><td>{elem.dipendant}</td><td>{elem.osservazione}</td><td>{elem.soln}</td><td><input type='radio' name="rowSelector" value={elem.eventId} ></input></td></tr>);
    }

    render () {
        console.log('props-add: ',this.props.event);
        console.log('# in events: ',this.props.list);
        return <div>
            <h2 align="center" >List of Events</h2>
            <table>
                <thead>
                <tr>
                <th>Event Type</th>
                <th>Description</th>
                <th>Creator</th>
                <th>Observation flag</th>
                <th>Solution Type</th>
                <th>Select row</th>
                </tr>
                </thead>
          <tbody>{this.renderEvents(this.props.list)}</tbody>

            </table> <br></br>
            <button onClick={()=>this.modifyEvent()}>Modify</button>
            </div>
    }
}

const mapStateToProps = (state) => {
    console.log('inside mapStateToProps', state);
    return {
        list : state.events,
        type : state.eventType,
        event : state.event
    }
}

const mapDispatchToProps = (dispatch)=> {
    console.log('dummy mapDispatchToProps');
    return {
        getListOfEvents : ev => {
            dispatch(allEvents(ev))
        },
        modificaView : ev => {
            dispatch(modificaView(ev));
            
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(EventList));