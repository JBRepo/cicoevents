import React from 'react';

export class EventList extends React.Component {
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
        this.props.modify(selectedRow);
    }

    renderEvents(arr){
        console.log(arr.length);
        return arr.map((elem)=><tr key={elem.id}><td>{elem.eventType}</td><td>{elem.descrizioneEvento}</td><td>{elem.dipendant}</td><td>{elem.osservazione}</td><td>{elem.soln}</td><td><input type='radio' name="rowSelector" value={elem.id} ></input></td></tr>);
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