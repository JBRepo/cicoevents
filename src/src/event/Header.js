
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactEventMain } from './Event';


const HeaderComp = (props)=> { return (<div>
    <header>
    <div>
    <nav>
      <ul>
        <li><Link to='/addEvent'  onClick={()=>props.getListOfEvents()}>Event</Link></li>
        <li><Link to='/eventList' onClick={()=>props.getListOfEvents()}>EventList</Link></li>
      </ul>
    </nav>
    <ReactEventMain></ReactEventMain>
    </div>
  </header>
</div>);}

export const Header = HeaderComp ;

