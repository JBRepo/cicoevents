import React from 'react';

export default class Event extends React.Component {
    constructor (props){
        super(props);
        this.state={id:'',eventType:'', dipendant:'', osservazione:'', descrizioneEvento:'', soln:''};
    }

    postEvent () {
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
        var propId = this.props.event.id;
        console.log('id-->',propId);
        
        this.props.propagate({id:propId,
            eventType:eventType,
            dipendant:dipendant,
            osservazione:chosenObservation,
            descrizioneEvento:descrizioneEvento,
            soln:selectedSoln
            });
    }

    handleChange(e){
        //this.state.event.dipendant = e.target.value
        //this.setState({dipendant : e.target.value});
    }

    componentWillMount(){
        //var e = this.props.event;
        //console.log('render in Event:',e);
        //if (this.props.type == 'modify') {
          //  this.setState({id:e.id,eventType:e.eventType, dipendant:e.dipendant, osservazione:e.osservazione, descrizioneEvento:e.descrizioneEvento, soln:e.soln});
        //}
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
      <table width="75%">
      <tbody>
      <tr>
    <td> Type of Event </td>
    <td> <select id="eventType" defaultValue={tipoEvento}> 
    <option value="-1" >----Seleziona----</option>
    <option value="1"> Anomalia </option>
    <option value="2" >Perdita Operativa </option>
    <option value="3" >Reclamo </option>
    <option value="21">Segnalazione Compliance </option>
    </select></td>
    </tr>
      <tr>
    <td> Dipendente Segnalante </td>
    <td> <input  id="dipendant" name="dipendant" defaultValue={user} onChange={this.handleChange.bind(this)}/> </td>
    </tr>
    <tr><td> Under observation
     </td>
     <td> <input type="radio" name="osservazione" id="osservazione" value="Si" defaultChecked={osservazione === 'Si' ? true : false} /> Yes 
     <input type="radio" name="osservazione" id="osservazione" value="No" defaultChecked={osservazione === 'No' ? true : false}/> No
     </td>
     </tr>
     <tr><td> Description</td>
     <td><textarea name="descrizioneEvento" id="descrizioneEvento" rows="5" cols="80" defaultValue={descrizioneEvento} ></textarea></td>
     </tr>
     <tr>
         <td>Solution</td>
         <td>
         <input type="checkbox" name="soln" value="workaround" defaultChecked={solution.indexOf('workaround') >= 0 ? true : false}/>Workaround<br></br>
        <input type="checkbox" name="soln" value="caution" defaultChecked={solution.indexOf('caution') >= 0 ? true : false}/>Precaution <br></br>
        <input type="checkbox" name="soln" value="permanent" defaultChecked={solution.indexOf('permanent') >= 0 ?true : false}/>Permanent Solution 
        </td>
     </tr>
     </tbody>
      </table>
      <button value="Add" onClick={this.postEvent.bind(this)}>
      Add Event</button>
      </div>
    }
}