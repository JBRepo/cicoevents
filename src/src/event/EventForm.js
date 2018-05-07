import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { allEvents, cancelAction } from '../actiontypes/actions';
import axios from 'axios';

const OptionType = ()=>{ 
    var options = [{id:1, event:'Anomalia'},{id:2, event:'Perdita Operativa'},{id:3, event:'Reclamo'},{id:4, event:'Segnalazione Compliance'}];
    return options.map((elem)=><option key={elem.id} value={elem.id} >{elem.event}</option>);
}

const CheckBoxType = (props) => {
    var checks = [{id:1, name:'soln', value:'workaround'},{id:2,name:'soln', value:'caution'},{id:3, name:'soln', value:'permanent'}];
    return checks.map((elem)=> <div key={elem.id}><input type="checkbox" name={elem.name} value={elem.value} defaultChecked={props.solution.indexOf(elem.value) >= 0 ? true : false}/>{elem.value}</div>);
}


export class Event extends React.Component {
    
    propagateEvent () {
        var eventType = document.getElementById("eventType").value;
        var dipendant = document.getElementById("dipendant").value;
        var osservazione = document.getElementsByName("osservazione");
        var chosenObservation = "";
        for (let i = 0; i < osservazione.length; i++) {
            if (osservazione[i].checked) {
                chosenObservation = osservazione[i].value;
            }
        }
        var descrizioneEvento = document.getElementById('descrizioneEvento').value;
        var soln = document.getElementsByName("soln");
        var selectedSoln = "";
        for (let i = 0; i < soln.length; i++) {
            if (soln[i].checked) {
                selectedSoln = selectedSoln+soln[i].value+',';
            }
        }
        console.log('eventType->', eventType);
        console.log('dipendant->',dipendant);
        console.log('osservazione->',osservazione);
        console.log('chosenObservationtxt->',chosenObservation);
        console.log('descrizioneEvento->',descrizioneEvento);
        console.log('selectedSoln->',soln);
        console.log('selectedSoln->',selectedSoln);
        var eventCount;
        if (this.props.type === 'modify') {
            eventCount = this.props.event.eventId;
        }else{
            eventCount = -1;
        }
        var countedEvent = {eventId:eventCount,
            eventType:eventType,
            dipendant:dipendant,
            osservazione:chosenObservation,
            descrizioneEvento:descrizioneEvento,
            soln:selectedSoln};
        
        if (this.props.type === 'modify') {//modify
            console.log('modifiy event-->',countedEvent); 
            axios.get('http://10.21.137.94:8090/WebserviceRest/Rest/Event/Update/'
            ,{
                params: {
                  event: countedEvent
                }
              }
            )
            .then(function(response){
                console.log('in modify call -then ',response);
                this.getAllEvents({eventType:''});
                this.props.history.push('/eventList');
            }.bind(this))
            .catch(()=>console.log('server error while modifying'));
        }else{//add
            axios.get('http://10.21.137.94:8090/WebserviceRest/Rest/Event/Add/'
            ,{
                params: {
                  event: countedEvent
                }
              }
            )
            .then(function(response){console.log(response);
            this.getAllEvents({eventType:'add'});
            this.props.history.push('/eventList');
        }.bind(this))
            .catch(()=>console.log('server error while adding'))
        }
    }

    getAllEvents (evState) {
        axios.get('http://10.21.137.94:8090/WebserviceRest/Rest/Event/List')
        .then(function(response){console.log(response);
            console.log(this.props);
            this.props.getListOfEvents(response.data);
        }.bind(this)
        )
    }

    cancelAction (e){
            console.log('inside cancel event-->'); 
            this.props.cancelAction();
            this.props.history.push('/eventList');
    }


    render(){
        var e = {};
        console.log('render in Event:',e);
        var solution ='';
        var tipoEvento = 0;
        var user = '';
        var osservazione = '';
        var descrizioneEvento = '';
        if (this.props.type === 'modify') {
            e = this.props.event;
            solution = e.soln;
            tipoEvento = e.eventType;
            user = e.dipendant;
            osservazione = e.osservazione;
            descrizioneEvento = e.descrizioneEvento;
        }
        
        if ( e.soln !== undefined ){
            solution = e.soln;
        }
        console.log('solution-->',solution);
        return <div>
        <h2 align="center" >Event</h2>     
        <table width="75%">
        <tbody>
            <tr>
            <td> Type of Event </td>
            <td> <select id="eventType" defaultValue={tipoEvento}> 
                    <OptionType></OptionType>
                    </select></td>
            </tr>
            <tr>
                <td> Dipendente Segnalante </td>
                <td> <input  id="dipendant" name="dipendant" defaultValue={user} /> </td>
            </tr>
            <tr><td> Under observation </td>
                <td> <input type="radio" name="osservazione" id="osservazione" value="Si" defaultChecked={osservazione === 'Si' ? true : false} /> Yes 
                     <input type="radio" name="osservazione" id="osservazione" value="No" defaultChecked={osservazione === 'No' ? true : false}/> No
                </td>
            </tr>
            <tr>
                <td> Description</td>
                <td><textarea name="descrizioneEvento" id="descrizioneEvento" rows="5" cols="80" defaultValue={descrizioneEvento} ></textarea></td>
            </tr>
            <tr>
                <td>Solution</td>
                <td><CheckBoxType  solution={solution}></CheckBoxType></td>
            </tr>
        </tbody>
        </table>
            <button align='left' value={this.props.type === 'modify' ? 'Modify' : 'Add '} onClick={this.propagateEvent.bind(this)}>
                    {this.props.type === 'modify' ? 'Modify' : 'Add'}</button>
            <button value='Cancel' onClick={this.cancelAction.bind(this)}>Cancel</button>
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
        cancelAction : () => {
            dispatch(cancelAction());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Event));