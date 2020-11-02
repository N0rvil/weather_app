import React from 'react';
import ReactDOM from 'react-dom';
import './base.css';
import Content from './Content';

class App extends React.Component {
    state = { lat: null, lng: null, errorMessage: '', city: '', temperature: '', weatherDescription: '', currentTime: null, currentDay: '', weatherIcon: ''};

    constructor() {
        super()
        let today = new Date();
        this.day = today.getDay();
        this.time = today.getHours() + ":" + today.getMinutes();
        
          
    }

    componentDidMount() { 


//SELECTING A DAY     
    if (this.day === 0) {
        this.setState({ currentDay: 'Sunday'});
    };

    if (this.day === 1) {
        this.setState({ currentDay: 'Monday'});
    };

    if (this.day === 2) {
        this.setState({ currentDay: 'Tuesday'});
    };

    if (this.day === 3) {
        this.setState({ currentDay: 'Wednesday'});
    };

    if (this.day === 4) {
        this.setState({ currentDay: 'Thursday'});
    };

    if (this.day === 5) {
        this.setState({ currentDay: 'Friday'});
    };

    if (this.day === 6) {
        this.setState({ currentDay: 'Saturday'});
    };

    setInterval(() => {
        this.setState({ currentTime: this.time+' hod'});
    }, 1);   



//FETCH COORDS

        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err  => this.setState({ errorMessage: err.message })
        );


        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lng: position.coords.longitude }),
            err  => this.setState({ errorMessage: err.message })
        );
       
//FETCH PLACE WITH COORDS


            setTimeout(() => {
                fetch("https://api.opencagedata.com/geocode/v1/json?q="+this.state.lat+"+"+this.state.lng+"&key=e40cc3c3f3d142db8598bea5face8e7b")
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ city: data.results[0].components.town});
            })
            .catch(err => {
                console.log(err);
            });
            }, 600)


//REMOVING DIACRITICS FROM CITY NAME  (NOT MY CODE!!!)  

function RemoveAccents(strAccents) {
    var strAccents = strAccents.split('');
    var strAccentsOut = new Array();
    var strAccentsLen = strAccents.length;
    var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
    for (var y = 0; y < strAccentsLen; y++) {
        if (accents.indexOf(strAccents[y]) != -1) {
            strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
        } else
            strAccentsOut[y] = strAccents[y];
    }
    strAccentsOut = strAccentsOut.join('');
    return strAccentsOut;
}



//FETCH THE  WEATHER


    if (!this.state.city){  
         return (
            this.setState({ temperature: 'Loading'}),
            this.setState({ weatherDescription: 'Loading'}),
            this.setState({ weatherIcon: 'Loading'}),
            this.setState({ city: 'Loading'}),

            setTimeout(() => {
                fetch("http://api.weatherstack.com/current?access_key=66e651106c3c4308d4aad46478b6ec95&query="+RemoveAccents(this.state.city)+"&units=m")
    .then(response => {
       return response.json() 
    })
    .then(data => {
        this.setState({ temperature: data.current.temperature})
        this.setState({ weatherDescription: data.current.weather_descriptions[0]})
        this.setState({ weatherIcon: data.current.weather_icons})
        console.log(data);
    })
    .catch(err => {
	    console.log(err)
    });
            }, 1200)
         )
    } else {
        alert('sorry something is wrong');
    };         
};

    render() {
        return (
            <div className="app">
                 <div className="date">
                    <div className="date__day">{this.state.currentDay}</div>
                    <div className="date__time">{this.state.currentTime}</div>
                </div>
                <Content city={this.state.city} temperature={this.state.temperature + ' °C'} weatherDescription={this.state.weatherDescription} weatherIcon={this.state.weatherIcon}/>
            </div>
            );    
        }   
    }

ReactDOM.render (<App />, document.querySelector('#root'));