import React from 'react';

const OptionType = ()=>{ 
    var options = [{id:1, event:'Anomalia'},{id:2, event:'Perdita Operativa'},{id:3, event:'Reclamo'},{id:4, event:'Segnalazione Compliance'}];
    return options.map((elem)=><option key={elem.id} value={elem.id} >{elem.event}</option>);
}

const CheckBoxType = (props) => {
    var checks = [{name:'soln', value:'workaround'},{name:'soln', value:'caution'},{name:'soln', value:'permanent'}];
    return checks.map((elem)=> <div><input type="checkbox" name={elem.name} value={elem.value} defaultChecked={props.solution.indexOf(elem.value) >= 0 ? true : false}/>{elem.value}</div>);
}


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
        var propId = this.props.event.eventId;
        console.log('id-->',propId);
        
        this.props.propagate({eventId:String(propId),
            eventType:eventType,
            dipendant:dipendant,
            osservazione:chosenObservation,
            descrizioneEvento:descrizioneEvento,
            soln:selectedSoln
            });
    }

    cancelAction (e){
        this.props.cancel();
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
         <CheckBoxType solution={solution}></CheckBoxType>
        </td>
     </tr>
     </tbody>
      </table>
      <button align='left' value={this.props.type === 'modify' ? 'Modify' : 'Add '} onClick={this.postEvent.bind(this)}>
      {this.props.type === 'modify' ? 'Modify' : 'Add'}</button>
      <button value='Cancel' onClick={this.cancelAction.bind(this)}>
      Cancel</button>
      </div>
    }
}