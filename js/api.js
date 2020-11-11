const apiToken = {
    headers : {
        "X-Auth-Token" : "94ffd37d2329474780e025513cf9c832"
    }
};

const base_url = 'https://api.football-data.org';
const standings = '/v2/competitions/2021/standings?standingType=TOTAL';
const matcheSchedule = '/v2/competitions/2021/matches?matchday=';
const teamDetail = '/v2/teams/';
let matchday = 9;


function status (response) {
    if (response.status !== 200) {
        console.log('Error : ' + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}
function json (response) {
    return response.json();
}
function error (error) {
    console.log('Error : ' + error);
}


function getMatches() {

    if ('caches' in window) {
        caches.match(base_url + matcheSchedule + matchday, apiToken)
        .then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    let matchesHTML = "";
                        data.matches.forEach(function(match) {
                            let wibDate = match.utcDate;
                            let localDate = new Date(wibDate);
                            let strDate = localDate.toString();
                            let fxDate = strDate.substring(0,21);
                            matchesHTML += `  
                            <div class="container">            
                                <div class="row center teal">
                                    <div class="col s12 m12 l12">
                                        <span class="white-text">${fxDate}</span>
                                    </div>
                                </div>
                                <div class="card activator row z-depth-2 waves-effect waves-block waves-red">
                                    <a href="./squad.html?id=${match.homeTeam.id}">
                                        <div class="col s5 m5 truncate teal darken-4">
                                            <span class="white-text">${match.homeTeam.name}</span>
                                        </div>
                                    </a>
                                        <div class="col s2 m2 center-align">
                                            <span>VS</span>
                                        </div>
                                    <a href="./squad.html?id=${match.awayTeam.id}">
                                        <div class="col s5 m5 truncate teal darken-4">
                                            <span class="white-text">${match.awayTeam.name}</span>
                                        </div>
                                    </a>    
                                </div>
                            </div>  
                                    `;
                    });
                    document.getElementById('matches').innerHTML = matchesHTML;
                            
                }).catch(error);
            }
        })
    }

    fetch(base_url + matcheSchedule + matchday, apiToken)
        .then(status)
        .then(json)
        .then(function(data) {
            let matchesHTML = "";
            console.log(data);
            data.matches.forEach(function(match) {
                let wibDate = match.utcDate;
                let localDate = new Date(wibDate);
                let strDate = localDate.toString();
                let fxDate = strDate.substring(0,21);
                matchesHTML += `  
                <div class="container">            
                    <div class="row center teal">
                        <div class="col s12 m12 l12">
                            <span class="white-text">${fxDate}</span>
                        </div>
                    </div>
                        <div class="card activator row z-depth-2 waves-effect waves-block waves-red">
                            <a href="./squad.html?id=${match.homeTeam.id}">
                                <div class="col s5 m5 truncate teal darken-4">
                                    <span class="white-text">${match.homeTeam.name}</span>
                                </div>
                            </a>
                                <div class="col s2 m2 center-align">
                                    <span>VS</span>
                                </div>
                            <a href="./squad.html?id=${match.awayTeam.id}">
                                <div class="col s5 m5 truncate teal darken-4">
                                    <span class="white-text">${match.awayTeam.name}</span>
                                </div>
                            </a>    
                        </div>
                </div>`;
            });
            document.getElementById('matches').innerHTML = matchesHTML;                
        }).catch(error);
}


function getStandings() {

    if ('caches' in window) {
        caches.match(base_url + standings, apiToken)
        .then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    data.standings.forEach(function(standTeam) {
                        let standingsHTML = "";
                        standTeam.table.forEach(function(standing) {
                            standingsHTML += `
                            <div class="card row activator teal z-depth-2">
                                <a href="./squad.html?id=${standing.team.id}">
                                    <div class="col s1">
                                        <span class="white-text">${standing.position}.</span>
                                    </div>
                                    <div class="col s5">
                                        <span class="truncate white-text">${standing.team.name}</span>
                                    </div>
                                    <div class="col s1">
                                        <span class="white-text">${standing.playedGames}</span>
                                    </div>
                                    <div class="col s1">
                                        <span class="white-text">${standing.won}</span>
                                    </div>
                                    <div class="col s1">
                                        <span class="white-text">${standing.draw}</span>
                                    </div>
                                    <div class="col s1">
                                        <span class="white-text">${standing.lost}</span>
                                    </div>
                                    <div class="col s1">
                                        <span class="white-text">${standing.goalDifference}</span>
                                    </div>
                                    <div class="col s1">
                                        <span class="white-text">${standing.points}</span>
                                    </div>
                                </a>
                            </div>`; 

                        });
                        
                        document.getElementById('standings').innerHTML = standingsHTML;
                    });
                            
                }).catch(error);
            }
        })
    }

    fetch(base_url + standings, apiToken)
        .then(status)
        .then(json)
        .then(function(data) {
            data.standings.forEach(function(standTeam) {
                let standingsHTML = "";
                standTeam.table.forEach(function(standing) {
                    standingsHTML += `
                        <div class="card row activator teal z-depth-2">
                            <a href="./squad.html?id=${standing.team.id}">
                                <div class="col s1">
                                    <span class="white-text">${standing.position}.</span>
                                </div>
                                <div class="col s5">
                                    <span class="truncate white-text">${standing.team.name}</span>
                                </div>
                                <div class="col s1">
                                    <span class="white-text">${standing.playedGames}</span>
                                </div>
                                <div class="col s1">
                                    <span class="white-text">${standing.won}</span>
                                </div>
                                <div class="col s1">
                                    <span class="white-text">${standing.draw}</span>
                                </div>
                                <div class="col s1">
                                    <span class="white-text">${standing.lost}</span>
                                </div>
                                <div class="col s1">
                                    <span class="white-text">${standing.goalDifference}</span>
                                </div>
                                <div class="col s1">
                                    <span class="white-text">${standing.points}</span>
                                </div>
                                </a>
                        </div>
                        `;
                });
                
                document.getElementById('standings').innerHTML = standingsHTML;
            });                

        }).catch(error);
}

function getTeamById() {
    return new Promise(function(resolve, reject) {

        
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");
        
        if ('caches' in window) {
            caches.match(base_url + teamDetail + idParam, apiToken)
            .then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        let teamDescHTML = "";
                        let squadHTML = "";
                            teamDescHTML += `
                            <div class="col s12">
                                <img src="${data.crestUrl}" alt="Team Image">
                                <h1 class="truncate">${data.name}</h1>
                            </div>    
                            `;
                            data.squad.forEach(function(player) {
                                squadHTML +=  `
                                <div class="row">
                                    <div class="col s4 m4 l4">
                                        <span>${player.name}</span>
                                    </div>
                                    <div class="col s4 m4 l4">
                                        <span>${player.position}</span>
                                    </div>
                                    <div class="col s4 m4 l4">
                                        <span>${player.nationality}</span>
                                    </div>
                                </div>
                                `;
                            });
                            document.getElementById('squad').innerHTML = squadHTML;
                        document.getElementById('teams').innerHTML = teamDescHTML;
                        resolve(data);
                    }).catch(error);
                }
            })
        }

        fetch(base_url + teamDetail + idParam, apiToken)
        .then(status)
        .then(json)
        .then(function(data) {
            let teamDescHTML = "";
            let squadHTML = "";
                teamDescHTML += `
                <div class="col s12">
                    <img src="${data.crestUrl}" alt="Team Image">
                    <h1 class="truncate">${data.name}</h1>
                </div>    
                    `;

                data.squad.forEach(function(player) {
                    squadHTML +=  `
                    <div class="row">
                        <div class="col s4 m4 l4">
                            <span>${player.name}</span>
                        </div>
                        <div class="col s4 m4 l4">
                            <span>${player.position}</span>
                        </div>
                        <div class="col s4 m4 l4">
                            <span>${player.nationality}</span>
                        </div>
                    </div>
                    `;
                });
                document.getElementById('squad').innerHTML = squadHTML;
            document.getElementById('teams').innerHTML = teamDescHTML;
            resolve(data);
        }).catch(error);
    });
}

function getFavoriteTeam() {
    getAll().then(function(team) {
        let teamdetailHTML = "";
        team.forEach(function(teams) {
            console.log(teams);
            teamdetailHTML += 
                `

                <div class="row">
                <div class="col s12 m7">
                    <div class="card z-dept-2">
                        <a href="./squad.html?id=${teams.id}&favorite-team=true">
                            <div class="card-image teal lighten-4 waves-effect waves-block waves-teal">
                                <img src="${teams.crestUrl}" alt="Team Image">
                                
                            </div>
                        </a>
                        <div class="card-content teal lighten-2 white-text">
                        <span class="card-title">${teams.name}</span>
                        <p>Venue : ${teams.venue}</p>
                        </div>
                        <div class="card-action teal darken-2">
                        <a href="${teams.website}">Official Website</a>
                        </div>
                    </div>
                </div>
              </div>
                
                `;
            document.getElementById('teams').innerHTML = teamdetailHTML;
        });
    });
}

function getFavoriteTeamById () {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    getById(idParam).then(function(data) {
        console.log(data);
        let teamDescHTML = "";
        let squadHTML = "";
            teamDescHTML += `
            <div class="col s12">
                <img src="${data.crestUrl}" alt="Team Image">
                <h1>${data.name}</h1>
            </div>    
            `;
        data.squad.forEach(function(player) {
            squadHTML +=  `
            <div class="row">
                <div class="col s4 m4 l4">
                    <span>${player.name}</span>
                </div>
                <div class="col s4 m4 l4">
                    <span>${player.position}</span>
                </div>
                <div class="col s4 m4 l4">
                    <span>${player.nationality}</span>
                </div>
            </div>
            `;
        });
        document.getElementById('squad').innerHTML = squadHTML;
        document.getElementById('teams').innerHTML = teamDescHTML;
    });
}
