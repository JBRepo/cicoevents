import React from 'react';

export class EventList extends React.Component {
    modifyEvent () {
        //console.log('elem from modifica-->',elem);
        //console.log('this.props.type-->',this.props.type);
        var items = document.getElementsByName('rowSelector');
        var selectedRow = '';
        for (var i = 0; i < items.length; i++) {
            if (items[i].checked) {
                selectedRow = items[i].value;
            }
        }
        console.log('selectedRow->',selectedRow);
        //var elem={};
        //elem = this.state.events.filter((e)=>e.id == selectedRow)
        //console.log('selectedRow->',elem);
        this.props.modify(selectedRow);
    }

    renderEvents(arr){
        console.log(arr.length);
        return arr.map((elem)=><tr key={elem.id}><td>{elem.eventType}</td><td>{elem.descrizioneEvento}</td><td>{elem.dipendant}</td><td>{elem.osservazione}</td><td>{elem.soln}</td><td><input type='radio' name="rowSelector" value={elem.id} ></input></td></tr>);
    }

    render () {
        console.log('props-add: ',this.props.event);
        console.log('# in events: ',this.props.list);
        //if (this.props.type == 'add') {
          //  this.state.events.push(this.props.event);
        //}
        return <div>
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

            </table>
            <button onClick={()=>this.modifyEvent()}>Modify</button>
            </div>
    }
}